import React, { useEffect } from "react";
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
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import ScreenHeader from "./ScreenHeader";
import Geolocation from "@react-native-community/geolocation";

import { check, PERMISSIONS, RESULTS } from "react-native-permissions";

export default function FirstPage(props) {
  useEffect(async () => {
    const agreeStatus = await AsyncStorage.getItem("agree_status");
    console.log("agree_statusagree_statusagree_status", agreeStatus);
    if (agreeStatus == 1) {
      props.navigation.navigate("Splash");
    } else {
      props.navigation.navigate("TermAndCondition");
    }
  }, []);
  return (
    <SafeAreaView
    //  style={{flex: 1}}
    >
      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#000000",
        }}
      ></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
