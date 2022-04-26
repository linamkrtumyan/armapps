import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Applications({ isLoading, applications }) {
  const navigation = useNavigation();

  // console.log(applicarions,"app details")

  if (isLoading) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }

  return (
    <View>
      {applications.length > 0 ? (
        applications?.map((application, index) => (
          <>
            <Text key={index} style={styles.category}>
              {application.category}
            </Text>
            {application.applications.map((app, index) => (
              <>
                <View key={index} style={styles.appContainer}>
                  <View style={styles.appInfo}>
                    {/* <AppLogo1 /> */}
                    <ImageBackground
                      style={{
                        width: 64,
                        height: 64,
                      }}
                      source={{ uri: app.image }}
                    />
                    <TouchableOpacity
                      style={styles.appDescContainer}
                      onPress={() =>
                        navigation.navigate("ApplicationDetails", {
                          appId: app.id,
                        })
                      }
                    >
                      <Text style={styles.category}>{app.name}</Text>
                      <Text>{app.description}</Text>
                    </TouchableOpacity>
                  </View>

                  {app.url === null ? null : (
                    <TouchableOpacity
                      onPress={() => Linking.openURL(app.url)}
                      style={styles.appAction}
                    >
                      <Text style={styles.appActionText}>GET</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View
                  style={{
                    borderBottomColor: "#dedede",
                    borderBottomWidth: 1,
                  }}
                />
              </>
            ))}
          </>
        ))
      ) : (
        <Text style={{ fontSize: 32, textAlign: "center" }}>No data</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  category: {
    fontSize: 18,
    paddingHorizontal: "5%",
    marginTop: 10,
  },
  appContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: "5%",
  },
  appInfo: {
    flexDirection: "row",
  },
  appDescContainer: {
    paddingLeft: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 5,
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
});
