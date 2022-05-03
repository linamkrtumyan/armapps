import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ScrollView,
  Platform,
  Linking,
} from "react-native";
import ArrowBackIcon from "../../assets/ArrowBackIcon";
import Logo from "../../assets/Logo";
import request from "../../request";

export default function ApplicationDetails({ route, navigation }) {
  console.log(route, "route");

  const [details, setDetails] = useState([]);
console.log(details,"details")
console.log(Platform.OS,Platform.OS)
  const fetchDetails = () => {
    request("/api/apps/details", "POST", {
      appId: route.params.appId,
      platform: Platform.OS,
    })
      .then((data) => {
        console.log(data, "details response");
        setDetails(data.data);
      })
      .catch((e) => console.log(e, "details error"));
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const ItemRender = ({ images }) => (
    <View style={styles.item}>
      <ImageBackground
        style={{
          width: 196,
          height: 396,
        }}
        source={{ uri: images }}
      />
    </View>
  );

  const Separator = () => {
    return (
      <View
        style={{
          height: 396,
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

      <ScrollView style={styles.wrapper}>
        <TouchableOpacity
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          style={{ marginBottom: 10 }}
          onPress={() => navigation.goBack()}
        >
          <ArrowBackIcon />
        </TouchableOpacity>
        <View style={styles.appNameContainer}>
          <ImageBackground
            style={{
              width: 90,
              height: 90,
            }}
            imageStyle={{ borderRadius: 10 }}
            source={{ uri: details?.icon }}
          />
          <View style={styles.appNameDescWrapper}>
            <Text style={styles.appName}>{details?.name}</Text>
            <Text>App description</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text>Supported on: {details.platforms}</Text>
          {details.url === null ? null : (
            <TouchableOpacity
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              onPress={() => Linking.openURL(details.url)}
              style={styles.appAction}
            >
              <Text style={styles.appActionText}>GET</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.shortInfoContainer}>
          <View>
            {/* <Text style={styles.shortInfoText}>700 points</Text> */}
            <Text style={styles.shortInfoText}>
              {Math.round(details.score * 100) / 100}
            </Text>
            <Text style={styles.shortInfoText}>*****</Text>
          </View>
          <View style={styles.verticleLine}></View>
          <View>
            <Text style={styles.shortInfoText}>Age</Text>
            <Text style={styles.shortInfoText}>{details.contentRating}</Text>
            {/* <Text style={styles.shortInfoText}>
                years old
                </Text> */}
          </View>
          <View style={styles.verticleLine}></View>
          <View>
            <Text style={styles.shortInfoText}>Size</Text>
            <Text style={styles.shortInfoText}>{details.size}</Text>
            {/* <Text style={styles.shortInfoText}>MB</Text> */}
          </View>
          <View style={styles.verticleLine}></View>
          <View>
            <Text style={styles.shortInfoText}>Languages</Text>
            <Text style={styles.shortInfoText}>Armenian</Text>
            <Text style={styles.shortInfoText}>2+</Text>
          </View>
        </View>

        <FlatList
          data={details.screenshots}
          renderItem={({ item }) => <ItemRender images={item} />}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={Separator}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.aboutAppContainer}>
          <Text style={styles.aboutAppTitle}>About app</Text>
          <Text style={styles.aboutAppDescription}>{details.description}</Text>
        </View>

        <View>
          <Text style={styles.aboutAppTitle}>Information</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoItemTitle}>Size</Text>
            <Text style={styles.infoItemValue}>{details.size}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoItemTitle}>Languages</Text>
            <Text style={styles.infoItemValue}>Armenian, Russian</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoItemTitle}>Categories</Text>
            <Text style={styles.infoItemValue}>
              {details?.categories?.join(", ")}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoItemTitle}>Age</Text>
            <Text style={styles.infoItemValue}>{details.contentRating}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoItemTitle}>Developer</Text>
            <Text style={styles.infoItemValue}>{details.developer}</Text>
          </View>
        </View>
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
  appNameContainer: {
    flexDirection: "row",
  },
  wrapper: {
    paddingHorizontal: "5%",
  },
  appNameDescWrapper: {
    marginLeft: 10,
  },
  appName: {
    fontSize: 20,
    marginBottom: 5,
  },
  shortInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  verticleLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#e5e5e5",
  },
  shortInfoText: {
    textAlign: "center",
    color: "#707070",
    paddingVertical: 2,
  },
  aboutAppContainer: {
    marginTop: 10,
  },
  aboutAppTitle: {
    fontSize: 20,
    marginBottom: 5,
    marginTop: 5,
  },
  aboutAppDescription: {
    color: "#707070",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 12,
  },

  item: {
    padding: 8,
    width: 196,
    height: 396,
    justifyContent: "center",
    alignItems: "center",
  },

  itemText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  appAction: {
    backgroundColor: "#6A95D7",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  appActionText: {
    color: "#fff",
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  infoItemValue: {
    color: "#707070",
    fontSize: 14,
  },
  infoItemTitle: {
    fontSize: 14,
  },
});
