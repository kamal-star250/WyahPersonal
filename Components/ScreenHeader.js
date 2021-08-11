import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const ScreenHeader = ({
  centertext,
  leftsideicon,
  leftpress,
  logoimage,
  backicon,
  backpress,
}) => {
  return (
    <View style={styles.header_view}>
      {leftsideicon ? (
        <Image
          source={leftsideicon}
          // style={{height: 20}}
          style={{
            width: 60,
            height: 50,
            resizeMode: "contain",
            marginLeft: 20,
          }}
        />
      ) : null}

      <View style={{ paddingLeft: 20 }}>
        <Text style={styles.headerText}>{centertext}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header_view: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#101010",
    padding: 10,
  },

  headerText: {
    right: "7%",
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    fontWeight: "bold",
    color: "#FFF",
  },
});
export default ScreenHeader;
