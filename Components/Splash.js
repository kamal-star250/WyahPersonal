import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ImageBackground,
  AsyncStorage,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
export default function Splash(props) {
  const [loader, setLoader] = React.useState(true);
  const [getToken, setToken] = React.useState("");
  const callPage = () => {
    setTimeout(() => {
      props.navigation.navigate("Home");
    }, 4000);
  };
  useEffect(async () => {
    const token = await AsyncStorage.getItem("token");
    console.log("tokentokentokentokentoken", token);
    setToken(token);
    callPage();
  }, []);

  NetInfo.fetch().then((networkState) => {
    networkState.isConnected == true
      ? props.navigation.navigate("")
      : props.navigation.navigate("NoConnection");
  });
  return (
    <SafeAreaView>
      <View style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
        <View style={styles.header}>
          <ImageBackground
            borderRadius={100}
            source={require("../images/CMS_background.jpg")}
            style={{
              width: 200,
              height: 200,

              alignSelf: "center",
            }}
          >
            <Image
              source={require("../images/wyahlogo_tiny.gif")}
              style={{
                width: 170,
                height: 170,
                resizeMode: "contain",
                alignSelf: "center",
                top: 20,
              }}
            />
          </ImageBackground>
        </View>

        <View
          style={{
            height: "20%",
            marginHorizontal: 40,
            marginTop: 10,
          }}
        >
          <Text style={styles.text1}>
            Write Your own content for free on {"\n"}
            www.wyah.online
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.text2}>
            App installation key: {getToken ? getToken.slice(5, 22) : ""} {"\n"}{" "}
            App Version. 1.01
          </Text>
        </View>
        {/* {loader == true ? <ActivityIndicator color="#FFF" size={30} /> : null} */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "60%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  text1: {
    textAlign: "center",
    fontSize: 15,
    color: "#FFF",
    fontFamily: "Roboto-Light",
  },
  text2: {
    color: "#7f7f7f",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 22,
    fontFamily: "Roboto-Light",
  },
});
