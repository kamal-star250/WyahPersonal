import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  PermissionsAndroid,
  AsyncStorage,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import ScreenHeader from "./ScreenHeader";
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";

export default function TermAndCondition(props) {
  const [loader, setLoader] = React.useState(false);
  const [agreeStatus, setAgreeStatus] = React.useState(0);
  const [getToken, setToken] = React.useState("");
  const [getLatitude, setLatitude] = useState("");
  const [getLongitude, setLongitude] = useState("");
  NetInfo.fetch().then((networkState) => {
    // console.log('Connection type - ', networkState.type);
    // console.log('Is connected? - ', networkState.isConnected);
    networkState.isConnected == true
      ? props.navigation.navigate("")
      : props.navigation.navigate("NoConnection");
  });
  const agree_function = () => {
    console.log("bbabefeb");
    AsyncStorage.setItem("agree_status", "1");
    props.navigation.navigate("Splash");
  };
  const [getitem, setItem] = React.useState("");
  useEffect(async () => {
    const token = await AsyncStorage.getItem("token");
    console.log("token coming====================>", token);
    setToken(token);
    terms_condition();
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS == "ios") {
      request(PERMISSIONS.IOS.LocationWhenInUse).then((result) => {
        console.log("result====>", result);
        Geolocation.getCurrentPosition(
          (info) => {
            setLatitude(info.coords.latitude);
            setLongitude(info.coords.longitude);
          }

          // setGetLocation(info),
        );
      });
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message:
              "This App needs access to your location " +
              "so we can know where you are.",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use locations ");
          Geolocation.getCurrentPosition(async (info) => {
            console.log("check coordinate", info);
            setLatitude(info.coords.latitude);
            setLongitude(info.coords.longitude);
          });
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const terms_condition = () => {
    axios({
      method: "get",
      url: "https://digimonk.xyz/app-termsandcondition",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        console.log(response.data, " first time data");
        var data = response.data.terms;
        setItem(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const send_token = () => {
    console.log(getToken, getLatitude, getLongitude);
    axios({
      method: "post",
      url: "https://digimonk.xyz/get-token",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        device_token: getToken,
        latitude: getLatitude,
        longitude: getLongitude,
      },
    })
      .then(async (response) => {
        console.log("saved token=======================>", response.data);
        if (response.status == 200) {
          console.log("aaa");
          AsyncStorage.setItem("user_id", response.data.id.toString());
          AsyncStorage.setItem("agree_status", "1");
          props.navigation.navigate("Splash");
        } else {
          console.log("data not found");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <SafeAreaView
    //  style={{flex: 1}}
    >
      {loader ? (
        <View
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000000",
            position: "absolute",
            zIndex: 100,
          }}
        >
          <View style={{ width: 80, height: 80 }}>
            <ActivityIndicator size={80} color="#FFF" />
          </View>
        </View>
      ) : null}

      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#000000",
        }}
      >
        <View style={{ paddingTop: "12%" }}>
          <ScreenHeader
            leftsideicon={require("../images/app_top_left_logo.png")}
            centertext="while you are here.."
          />
        </View>
        <View style={styles.linkView}>
          <Text style={styles.linkText}>
            Hello there and thank you for using wyah. Before the fun begins
            please read through our T&C (also available on
            <Text
              style={{ color: "#0070c0" }}
              onPress={() => Linking.openURL("https://www.wyah.online/TandC")}
            >
              {` www.wyah.online/TandC) `}
            </Text>
            and click the Agree button below to continue.
          </Text>
        </View>

        <Text style={[styles.text1, { top: 8, left: 28 }]}>
          By clicking "I agree", you accept our T&C
        </Text>

        <ScrollView
          style={{
            alignSelf: "center",
            height: 315,
            width: "85%",
            top: 15,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "Roboto-Light",
              textAlign: "justify",
            }}
          >
            {getitem}
          </Text>
        </ScrollView>

        <TouchableOpacity
          onPress={() => send_token()}
          style={styles.agreeView}
          //  onPress={() => props.navigation.navigate("Splash")}
        >
          <Image
            source={require("../images/agree4.png")}
            style={{ height: 100, width: 100, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  linkText: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "Roboto-Light",
    lineHeight: 20,
    textAlign: "left",
    textAlignVertical: "center",
    // includeFontPadding: false,
  },

  agreeView: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 30,
  },
  linkView: {
    height: "20%",
    // backgroundColor: "red",
    paddingVertical: "5%",
    marginHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  TC_Text: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "Roboto-Light",
    textAlign: "left",
  },
  text1: {
    fontSize: 14,
    color: "#FFF",
    fontFamily: "Roboto-Light",
    lineHeight: 20,
  },
  text2: {
    fontSize: 14,
    color: "#FFF",
    fontFamily: "Roboto-Light",
  },
});
