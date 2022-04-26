import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
  Platform,
  Dimensions,
  RefreshControl,
} from "react-native";
import Logo from "../../assets/Logo";
import SearchIcon from "../../assets/SearchIcon";
import request from "../../request";
import Applications from "./Applications";
import Categories from "./Categories";

export default function Home({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const [isLoading, setIsLoading] = useState(true);

  const [searchValue, setSearchValue] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [randomApps, setRandomApps] = useState([]);
  const [applications, setApplications] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchRandomApps = () => {
    request("/api/apps/random", "POST", { platform: Platform.OS })
      .then((data) => {
        setRandomApps(data.data);
      })
      .catch((e) => {
        console.log(e, "random apps error");
      });
  };


  const fetchApplications = () => {
    request("/api/apps", "POST", {
      searchValue: searchValue,
      categoryId: categoryId,
      platform: Platform.OS,
    })
      .then((data) => {
        setApplications(data.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e, "apps error");
      });
  };

  useEffect(() => {
    if (searchValue != null) {
      const timer = setTimeout(() => {
        fetchApplications();
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      fetchApplications();
    }
  }, [searchValue, categoryId]);



  useEffect(() => {
    request("/admin/category", "POST", {
      page: null,
      count: null,
      searchValue: null,
    })
      .then((data) => {
        setCategories(data.data);
      })
      .catch((e) => console.log(e, "category response error"));
    fetchRandomApps();
  }, []);

  const ItemRender = ({ image, id }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ApplicationDetails", { appId: id })}
      style={styles.item}
    >
      <ImageBackground
        style={{
          width: windowWidth / 3,
          height: windowWidth / 3,
        }}
        source={{ uri: image }}
      />
    </TouchableOpacity>
  );
  const Separator = () => {
    return (
      <View
        style={{
          height: 150,
          width: 5,
          backgroundColor: "white",
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              fetchRandomApps();
              setSearchValue(null);
              setCategoryId(null)
            }}
          />
        }
      >
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <TouchableOpacity>
              <SearchIcon />
            </TouchableOpacity>

            <TextInput
              style={styles.inputStyle}
              autoCorrect={false}
              placeholder="Type for search..."
              value={searchValue}
              onChangeText={setSearchValue}
            />
          </View>

          <Categories categories={categories} setCategoryId={setCategoryId} />
        </View>

        <FlatList
          data={randomApps}
          renderItem={({ item }) => (
            <ItemRender image={item.image} id={item.id} />
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={Separator}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />

        <Applications isLoading={isLoading} applications={applications}  />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 20,
  },
  logoContainer: {
    paddingVertical: 30,
    paddingHorizontal: "5%",
  },
  header: {
    backgroundColor: "#BAD0F2",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    fontWeight: "500",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "70%",
    padding: 10,
    marginVertical: 5,
    marginLeft: "5%",
    borderRadius: 10,
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 5,
  },
  item: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  webviewContainer: {
    height: 100,
    width: "100%",
  },
});
