import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  Dimensions,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  FlatList,
  ImageBackground,
  Alert,
  ActivityIndicator,
  StatusBar,
  PermissionsAndroid,
  BackHandler,
  AsyncStorage,
  IntersectionObserver,
  viewabilityConfig,
} from "react-native";
import BackgroundTimer from "react-native-background-timer";
import PushNotification from "react-native-push-notification";
import Icon from "react-native-vector-icons/AntDesign";
import Carousel from "react-native-snap-carousel";
import Video from "react-native-video";
import Geolocation from "@react-native-community/geolocation";
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";
const image_source_path = "http://9094/fileupload/";
import axios from "axios";

const SLIDER_WIDTH = Dimensions.get("window").width * 0.94;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

// const width = Dimensions.get("window").width;
// const height = Dimensions.get("window").height;
const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;
import Orientation from "react-native-orientation-locker";
import NetInfo from "@react-native-community/netinfo";
import Modal from "react-native-modal";
import MediaControls, { PLAYER_STATES } from "react-native-media-controls";
// import { call, log, Value } from "react-native-reanimated";

console.log({
  width: Dimensions.get("window").width,
  height: Dimensions.get("screen").height,
});
const Data = [
  {
    name: "Today's special @ Café Albero",
    pic: require("../images/video1.png"),
    pic1: require("../images/user1.png"),
    pic2: require("../images/date1.png"),
  },

  {
    name: "Today's special @ Café Albero",
    pic: require("../images/mask1.png"),
    pic1: require("../images/user1.png"),
    pic2: require("../images/date1.png"),
  },

  {
    name: "Today's special @ Café Albero",
    pic: require("../images/video1.png"),
    pic1: require("../images/user1.png"),
    pic2: require("../images/date1.png"),
  },
];

function Item({ item }) {
  // console.log("check coming item", item);
  let carousel = "";
  const [getindex, setIndex] = React.useState(0);
  const [getAudio, setAudio] = useState(false);
  const [author_id, setAuthor_id] = useState(item.c_id);
  const unique_count = (user_id, value) => {
    console.log("check increse index value", user_id, value);
    axios({
      method: "post",
      url: "https://digimonk.xyz/viewPost",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        user_id: user_id,
        post_id: value,
      },
    })
      .then(async (response) => {
        console.log("response", response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const increaseIndex = async (value) => {
    const user_id = await AsyncStorage.getItem("user_id");

    unique_count(user_id, value);
    carousel._snapToItem(getindex + 1);
    setAudio(true);
  };
  const decreaseIndex = () => {
    carousel._snapToItem(getindex - 1);
    setAudio(true);
  };
  let a = {
    type: "report",
    report: "Report this post to wyah",
  };
  const new_slide_array = [...item.slide];
  new_slide_array.sort((a, b) => a.priority - b.priority);
  item.slide = new_slide_array;
  return (
    <View
      style={{
        height: 300,
        width: "100%",
        marginTop: 20,
        borderRadius: 10,
      }}
    >
      <View style={styles.container}>
        <Carousel
          ref={(ref) => (carousel = ref)}
          data={item.slide.concat(a)}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          itemHeight={ITEM_HEIGHT}
          renderItem={_renderItem}
          renderItem={({ item, index }) => (
            <_renderItem
              item={item}
              getindex={getindex}
              index={index}
              carousel={carousel}
              author_id={author_id}
            />
          )}
          // {...console.log(item.data.slide.concat(a))}
          // scrollEnabled={false}
          // onViewableItemsChanged={onViewableItems}
          onSnapToItem={(index) => setIndex(index)}
          slideStyle={{ flex: 1 }}
          style={{ height: "100%", width: "100%" }}
        />

        <TouchableOpacity
          style={{ position: "absolute", left: 10, top: 100 }}
          onPress={() => decreaseIndex()}
        >
          <View>
            <Image
              resizeMode="contain"
              source={require("../images/arrow_left.png")}
              style={{ height: 35, right: 17 }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: "absolute", right: 10, top: 100 }}
          onPress={() => increaseIndex()}
        >
          <View>
            <Image
              resizeMode="contain"
              source={require("../images/arrow_right.png")}
              style={{ height: 35, left: 17 }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: "26%",
            width: "100%",
            bottom: 0,
            position: "absolute",
            backgroundColor: "#0070c0",
            borderRadius: 10,
            opacity: 0.8,
          }}
        >
          <View style={{ marginTop: 5, marginLeft: 11 }}>
            <Text
              style={{
                fontSize: 18,
                color: "#FFF",
                fontFamily: "Roboto-Regular",
              }}
            >
              {item.posttitle}
            </Text>
          </View>
          <View style={{ marginTop: 5, marginLeft: 10, flexDirection: "row" }}>
            {item.usertype == "pro" ? (
              <Image
                source={require("../images/authoricons.png")}
                style={{ height: 20, width: 18, resizeMode: "contain" }}
              />
            ) : (
              <Image
                source={require("../images/user.png")}
                style={{ height: 20, width: 15, resizeMode: "contain" }}
              />
            )}
            <Text style={{ color: "#FFF", marginLeft: 6 }}>
              {item.firstname}
            </Text>
          </View>
          <View
            style={{
              marginTop: 3,
              marginLeft: 10,
              flexDirection: "row",
              bottom: 4,
            }}
          >
            <Image
              source={require("../images/calender.png")}
              style={{ height: 20, width: 15, resizeMode: "contain" }}
            />
            <Text style={{ color: "#FFF", marginLeft: 6, fontSize: 14 }}>
              {item.date}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const _renderItem = ({ item, index, getindex, author_id }) => {
  // console.log("indexindex", index);
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState("content");

  const AudioPlayer = useRef(null);
  const [currentTimeAudio, setCurrentTimeAudio] = useState(0);
  const [durationAudio, setDurationAudio] = useState(0);

  const [isLoadingAudio, setIsLoadingAudio] = useState(true);
  const [pausedAudio, setPausedAudio] = useState(false);
  const [playerStateAudio, setPlayerStateAudio] = useState(
    PLAYER_STATES.PLAYING
  );
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [screenTypeAudio, setScreenTypeAudio] = useState("content");
  const [getAudio, setAudio] = useState(false);
  const [isDiscriptionModal, setDiscriptionModal] = useState(false);
  const [isImageModal, setImageModal] = useState(false);
  const [video_Modal, setVedioModal] = useState(false);
  const [audio_Modal, setAudioModal] = useState(false);
  const [status_bar, setStatusBar] = useState(false);
  const [alertModal, setAlertModal] = useState(false);

  // console.log("pppp", author_id);
  // console.log('kkkkkkk', item);

  ////////////////////////////// Video Function start /////////////////////////

  const onSeek = (seek) => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onPaused = (playerState) => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = (data) => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = (data) => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = (currentTime) => setCurrentTime(currentTime);
  const onFullScreen = () => {
    if (!isFullScreen) {
      Orientation.lockToLandscape();
    } else {
      if (Platform.OS === "ios") {
        Orientation.lockToPortrait();
      }
      Orientation.lockToPortrait();
    }
    setIsFullScreen(!isFullScreen);
  };

  //////////////////////////  Video Function End ////////////////////////////////

  //////////////////// Audio Function Start //////////////////////////////////////////

  const onSeekAudio = (seek) => {
    //Handler for change in seekbar
    AudioPlayer.current.seek(seek);
  };

  const onPausedAudio = (playerState, getindex) => {
    //Handler for Video Pause

    setPausedAudio(!pausedAudio);
    setPlayerStateAudio(playerState);
  };

  const onReplayAudio = () => {
    //Handler for Replay
    setPlayerStateAudio(PLAYER_STATES.PLAYING);
    AudioPlayer.current.seek(0);

    // setPaused(paused);
  };

  const onProgressAudio = (data) => {
    // Video Player will progress continue even if it ends
    if (!isLoadingAudio && playerStateAudio !== PLAYER_STATES.ENDED) {
      setCurrentTimeAudio(data.currentTime);
    }
  };

  const onLoadAudio = (data) => {
    setDurationAudio(data.duration);
    setIsLoadingAudio(false);
  };

  const onLoadStartAudio = (data) => setIsLoadingAudio(true);

  const onEndAudio = () => {
    setPlayerStateAudio(PLAYER_STATES.ENDED);
  };

  const onSeekingAudio = (currentTime) => setCurrentTimeAudio(currentTime);

  ////////////////////////////// Audio Function End ////////////////////////////

  const playAudio = () => {
    setAudio(true);
  };

  const checkNotify = () => {
    setAlertModal(false);
    axios({
      method: "post",
      url: "https://digimonk.xyz/reported",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        c_id: author_id,
      },
    })
      .then(async (response) => {
        console.log("response", response.data);
        if (response.data.status == "200") {
          Alert.alert("lll");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const callFunction = () => {
    Alert.alert("", "Do you want to report", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => checkNotify() },
    ]);
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <StatusBar />
      <Modal
        isVisible={isDiscriptionModal}
        // margin={0}
        onBackdropPress={() => setDiscriptionModal(false)}
        onBackButtonPress={() => setDiscriptionModal(false)}
        backdropOpacity={0.8}
        animationInTiming={600}
        animationOutTiming={600}
      >
        <View
          style={{
            width: "98%",
            // height: "60%",
            backgroundColor: "#000000",
            alignSelf: "center",
            bottom: 0,
            paddingVertical: "2%",
            paddingHorizontal: "2%",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setDiscriptionModal(false)}
            style={{
              // alignSelf: "flex-end",
              paddingVertical: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 18,

                fontFamily: "Roboto-Black",
              }}
            >
              Discription
            </Text>
            <Image
              source={require("../images/white-cross.jpg")}
              style={{ height: 20, width: 20, resizeMode: "contain" }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              top: 10,
              fontFamily: "Roboto-Regular",
              color: "#fff",
              bottom: 10,
              textAlign: "justify",
            }}
          >
            {item.description}
          </Text>
        </View>
      </Modal>
      <Modal
        isVisible={isImageModal}
        // margin={0}
        onBackdropPress={() => setImageModal(false)}
        onBackButtonPress={() => setImageModal(false)}
        backdropOpacity={0.8}
        animationInTiming={600}
        animationOutTiming={600}
        style={{ margin: 0 }}
      >
        <View
          style={{
            width: "100%",
            height: "75%",
            backgroundColor: "#000000",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => setImageModal(false)}
            style={{
              alignSelf: "flex-end",
              // backgroundColor: "red",
              bottom: 15,
              top: 10,
              height: 40,
              width: 40,
              borderWidth: 1,
              borderColor: "#fff",
              borderRadius: 20,
            }}
          >
            <Image
              source={require("../images/white-cross.jpg")}
              style={{
                height: 20,
                width: 20,
                resizeMode: "contain",
                left: 10,
                top: 8,
              }}
            />
          </TouchableOpacity>
          <Image
            source={{ uri: item.url }}
            style={{
              height: "100%",
              width: "100%",
              // resizeMode: "cover",
              top: 15,
            }}
          />
        </View>
      </Modal>

      <Modal
        isVisible={video_Modal}
        // margin={0}
        style={{ margin: 0 }}
        onBackdropPress={() => setVedioModal(false)}
        onBackButtonPress={() => setVedioModal(false)}
        backdropOpacity={0.8}
        animationInTiming={600}
        animationOutTiming={600}
      >
        <StatusBar hidden={true} />
        <View
          style={{
            width: "100%",
            height: "70%",
            backgroundColor: "#000000",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => setVedioModal(false)}
            style={{
              alignSelf: "flex-end",
              // backgroundColor: "red",
              bottom: 15,
              top: 10,
              height: 40,
              width: 40,
              borderWidth: 1,
              borderColor: "#fff",
              borderRadius: 20,
            }}
          >
            <Image
              source={require("../images/white-cross.jpg")}
              style={{
                height: 20,
                width: 20,
                resizeMode: "contain",
                left: 10,
                top: 8,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              height: "70%",
              backgroundColor: "#000000",
              alignSelf: "center",
              top: 20,
            }}
          >
            <Video
              fullscreen={true}
              fullscreenAutorotate={"portrait"}
              bufferConfig={{
                minBufferMs: 5000,
                maxBufferMs: 50000,
                bufferForPlaybackMs: 2500,
                bufferForPlaybackAfterRebufferMs: 5000,
              }}
              disableFocus={true}
              source={{
                uri: item.url,
              }}
              ref={videoPlayer}
              style={{ width: "100%" }}
              controls={true}
              playIcon={true}
              onEnd={onEnd}
              onLoad={onLoad}
              onLoadStart={onLoadStart}
              // autoplay={true}
              onProgress={onProgress}
              resizeMode={"contain"}
              posterResizeMode={"contain"}
              volume={10}
              paused={
                getindex == index ? paused : true
                // paused
              }
              // onBuffer={this.onBuffer}
              // onError={this.videoError}
              repeat={true}
              style={
                Platform.OS === "android"
                  ? styles.videoContainerAndroid
                  : styles.videoContainerIOS
              }
            />
            <MediaControls
              isFullScreen={isFullScreen}
              // onFullScreen={onFullScreen}
              fadeOutDelay={3000}
              duration={duration}
              isLoading={isLoading}
              mainColor="#333"
              onPaused={onPaused}
              onReplay={onReplay}
              onSeek={onSeek}
              onSeeking={onSeeking}
              playerState={playerState}
              progress={currentTime}
              toolbar={renderToolbar()}
              style={{ backgroundColor: "red" }}
            />
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={audio_Modal}
        // margin={0}
        onBackdropPress={() => setAudioModal(false)}
        onBackButtonPress={() => setAudioModal(false)}
        backdropOpacity={0.8}
        animationInTiming={600}
        animationOutTiming={600}
      >
        <StatusBar hidden={true} />
        <View
          style={{
            width: "100%",
            height: "70%",
            backgroundColor: "#000000",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => setAudioModal(false)}
            style={{
              alignSelf: "flex-end",
              // backgroundColor: "red",
              bottom: 15,
              top: 10,
              height: 40,
              width: 40,
              borderWidth: 1,
              borderColor: "#fff",
              borderRadius: 20,
            }}
          >
            <Image
              source={require("../images/white-cross.jpg")}
              style={{
                height: 20,
                width: 20,
                resizeMode: "contain",
                left: 10,
                top: 8,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 10,
              alignSelf: "center",
              top: 20,
              // backgroundColor: "green",
            }}
          >
            <Image
              source={require("../images/mask1.png")}
              style={{ height: "100%", width: "100%", borderRadius: 10 }}
            />

            <Video
              // resizeMode="contain"
              bufferConfig={{
                minBufferMs: 5000,
                maxBufferMs: 50000,
                bufferForPlaybackMs: 2500,
                bufferForPlaybackAfterRebufferMs: 5000,
              }}
              disableFocus={true}
              repeat={true}
              source={{
                uri: item.url,
              }}
              onEnd={onEndAudio}
              onLoad={onLoadAudio}
              onLoadStart={onLoadStartAudio}
              onProgress={onProgressAudio}
              ref={AudioPlayer}
              paused={getindex == index ? pausedAudio : true}
              resizeMode={"cover"}
              volume={10}
              style={
                Platform.OS === "android"
                  ? styles.videoContainerAndroid
                  : styles.videoContainerIOS
              }
            />

            <MediaControls
              fadeOutDelay={500}
              duration={durationAudio}
              isLoading={isLoadingAudio}
              mainColor="#333"
              onPaused={onPausedAudio}
              onReplay={onReplayAudio}
              onSeek={onSeekAudio}
              onSeeking={onSeekingAudio}
              playerState={playerStateAudio}
              progress={currentTimeAudio}
              // showOnStart={true}
              toolbar={renderToolbar()}
            />
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={alertModal}
        // margin={0}
        onBackdropPress={() => setAlertModal(false)}
        onBackButtonPress={() => setAlertModal(false)}
        backdropOpacity={0.8}
        animationInTiming={600}
        animationOutTiming={600}
      >
        <View
          style={{
            width: "100%",
            height: "33%",
            backgroundColor: "#000000",
            alignSelf: "center",
            borderColor: "white",
            borderWidth: 0.5,
          }}
        >
          <View style={{ top: 20 }}>
            <Image
              source={require("../images/reportPost.png")}
              style={{
                height: "65%",
                width: "65%",
                borderRadius: 10,
                resizeMode: "contain",
                alignSelf: "center",
              }}
            />
          </View>
          <View style={{ top: -10 }}>
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                textAlign: "center",
                fontFamily: "Roboto-Bold",
              }}
            >
              Do you want to report this post?
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "40%",
              height: 50,
              justifyContent: "space-between",
              alignSelf: "center",
              top: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                checkNotify();
              }}
              style={{
                height: 30,
                width: 50,
                borderRadius: 5,

                backgroundColor: "#0070c0",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  textAlign: "center",
                  fontFamily: "Roboto-Bold",
                }}
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 30,
                width: 50,
                borderRadius: 5,

                backgroundColor: "#0070c0",
              }}
              onPress={() => setAlertModal(false)}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  textAlign: "center",
                  fontFamily: "Roboto-Bold",
                }}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 10,

          // backgroundColor: 'red',
          // overflow: 'hidden',
          // flexDirection: 'row',
        }}
      >
        {item.type == "image/jpeg" && "image/png" && "image/jpg" ? (
          <TouchableOpacity onPress={() => setImageModal(true)}>
            <Image
              source={{ uri: item.url }}
              style={{
                height: "100%",
                width: "100%",
                resizeMode: "cover",
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        ) : item.type == "image/gif" ? (
          <TouchableOpacity onPress={() => setImageModal(true)}>
            <Image
              source={{ uri: item.url }}
              style={{
                height: "100%",
                width: "100%",
                resizeMode: "cover",
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        ) : item.type == "text" ? (
          <TouchableOpacity
            onPress={() => setDiscriptionModal(true)}
            style={{
              height: "65%",
              width: "75%",
              // borderWidth: 1,
              // borderColor: "#fff",
              // paddingHorizontal: 20,
              alignSelf: "center",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "#FFF",
                lineHeight: 15,
                fontFamily: "Roboto-Thin",
                textAlign: "justify",

                paddingTop: 30,
                // alignSelf: 'center',
                // paddingHorizontal: 10,
              }}
            >
              {item.description.slice(0, 300).trim()}
            </Text>
          </TouchableOpacity>
        ) : item.type == "audio/mpeg" ? (
          getAudio ? (
            <TouchableOpacity
              onPress={() => setAudioModal(true)}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 10,
                // backgroundColor: 'green',
              }}
            >
              <Image
                source={require("../images/mask1.png")}
                style={{ height: "100%", width: "100%", borderRadius: 10 }}
              />

              <Video
                // resizeMode="contain"
                repeat={true}
                source={{
                  uri: item.url,
                }}
                onEnd={onEndAudio}
                onLoad={onLoadAudio}
                onLoadStart={onLoadStartAudio}
                onProgress={onProgressAudio}
                ref={AudioPlayer}
                paused={getindex == index ? pausedAudio : true}
                resizeMode={"cover"}
                volume={10}
                style={
                  Platform.OS === "android"
                    ? styles.videoContainerAndroid
                    : styles.videoContainerIOS
                }
              />

              <MediaControls
                duration={durationAudio}
                isLoading={isLoadingAudio}
                mainColor="#333"
                onPaused={onPausedAudio}
                onReplay={onReplayAudio}
                onSeek={onSeekAudio}
                onSeeking={onSeekingAudio}
                playerState={playerStateAudio}
                progress={currentTimeAudio}
                // showOnStart={true}
                toolbar={renderToolbar()}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setAudioModal(true)}
              style={{ height: "100%", width: "100%" }}
            >
              <Image
                source={require("../images/imp1.png")}
                style={{ height: "100%", width: "100%" }}
              />
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  // backgroundColor: 'red',
                  paddingVertical: 135,
                  position: "absolute",
                }}
                onPress={() => setAudioModal(true)}
              >
                <Image
                  source={require("../images/pause.png")}
                  style={{ height: 40, width: 40, resizeMode: "contain" }}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          )
        ) : item.type == "video/mp4" ? (
          <TouchableOpacity
            onPress={() => setVedioModal(true)}
            style={{ height: "100%", width: "100%" }}
          >
            <Image
              source={require("../images/imp1.png")}
              style={{ height: "100%", width: "100%" }}
            />
            <TouchableOpacity
              style={{
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                // backgroundColor: 'red',
                paddingVertical: 135,
                position: "absolute",
              }}
              onPress={() => setVedioModal(true)}
            >
              <Image
                source={require("../images/pause.png")}
                style={{ height: 40, width: 40, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ) : item.type == "report" ? (
          <View
            style={{
              height: "100%",
              width: "100%",

              paddingHorizontal: 25,
            }}
          >
            <TouchableOpacity onPress={() => setAlertModal(true)}>
              <Image
                source={require("../images/reportPost.png")}
                style={{
                  marginTop: 10,
                  resizeMode: "contain",
                  height: 100,
                  width: 100,
                  alignSelf: "center",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => {
              //   callFunction();
              // }}
              onPress={() => setAlertModal(true)}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#FFF",
                  lineHeight: 25,
                  fontFamily: "Roboto-Thin",
                  // textAlign: 'left',
                  alignSelf: "center",
                  paddingTop: 30,
                }}
              >
                {item.report}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};
// const useElementOnScreen = (options) => {
//   const containerRef = useRef(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const callbackFunction = (entries) => {
//     console.log("check enteries", entries);
//   };

//   useEffect(() => {
//     console.warn("fifwwgfgbkfn", containerRef, options);
//     const observer = new IntersectionObserver(callbackFunction, options);
//     if (containerRef.current) observer.observe(containerRef.current);
//     return () => {
//       if (containerRef.current) observer.unobserve(containerRef);
//     };
//   }, [containerRef, options]);
//   return [containerRef, isVisible];
// };

export default function Home(props) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [indicatorVisible, setIndicatorVisisble] = useState(false);
  let carousel = "";
  const [getLatitude, setLatitude] = useState("");
  const [getLongitude, setLongitude] = useState("");
  const [impressionCount, setImpressionCount] = useState("");
  const [getitem, setItem] = React.useState([]);
  const [sleepMode, setSleepMode] = useState("");
  const [status_bar, setStatusBar] = useState(false);
  const [pageCurrent, setPagecurrent] = useState(1);
  const [hasScrolled, setHasScroll] = useState(false);
  const [getDistance, setDistance] = useState("");
  const [LowerPage, setLowerPage] = useState(false);
  const [noRecord, setNoRecord] = useState(false);
  const [sleepAlert, setSleepAlert] = useState(false);
  const [getToken, setToken] = React.useState("");
  const [getUserId, setUserId] = React.useState("");
  const [getindex, setIndex] = React.useState(0);
  // const [currentScrollerPosition, setcurrentScrollerPosition] = useState(0);
  const get_update_notification = async () => {
    const user_id = await AsyncStorage.getItem("user_id");
    axios({
      method: "get",
      url: "https://digimonk.xyz/recieved_update_notification/" + user_id,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        // console.log(" notofication data", response.data.sleep_status);
        await AsyncStorage.setItem(
          "sleep",
          response.data.sleep_status.toString()
        );
        setSleepMode(response.data.sleep_status);
        // console.log("-----------------", sleepMode);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const update_notification = async () => {
    setSleepAlert(false);
    const user_id = await AsyncStorage.getItem("user_id");
    const status_notification = sleepMode ? 1 : 0;
    // console.log("check coming notification status", status_notification);
    axios({
      method: "post",
      url: "https://digimonk.xyz/update-notifiaction-status",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        sleepStatus: status_notification,
        userId: user_id,
      },
    })
      .then(async (response) => {
        // console.log("pppppppppppppppppppppp", response.data.sleep_status);
        setSleepMode(response.data.sleep_status);
        get_update_notification();
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const onViewRef = React.useRef((viewableItems) => {
    console.log(viewableItems, "pppppppppppppp");
    const postId = viewableItems.changed[0].item.c_id;
    const post_index = viewableItems.changed[0].index;
    setIndex(post_index);
    // console.log("post_index", post_index);
    // Use viewable items in state or as intended
    callImpressionAPi(postId);
  });
  const callImpressionAPi = async (postId) => {
    const user_id = await AsyncStorage.getItem("user_id");
    axios({
      method: "post",
      url: "https://digimonk.xyz/view-post-impression",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        post_id: postId,
        user_id: user_id,
        views: 1,
      },
    })
      .then(async (response) => {
        // console.log("check impression count", response);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  // const viewabilityConfigCallbackPairs = useRef([
  //   { viewabilityConfig, onViewableItemsChanged },
  // ]);
  const [visiablePost, setvisiablePost] = useState([]);
  // const [containerRef, isVisible] = useElementOnScreen({
  //   root: null,
  //   rootMargin: 0,
  //   threshold: 1.0,
  // });
  // console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const callbackFunction = (entries) => {
    // console.log("check enteries", entries);
  };
  const options = {
    root: null,
    rootMargin: "1%",
    threshold: 1.0,
  };
  // useEffect(async () => {
  //   console.warn("fifwwgfgbkfn", containerRef, options);
  //   const observer = IntersectionObserver(callbackFunction, options);
  //   if (containerRef.current) observer.observe(containerRef.current);
  //   return () => {
  //     if (containerRef.current) observer.unobserve(containerRef);
  //   };
  // }, [containerRef, options]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setPagecurrent(1);
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);
  // const sendMessage = () => {
  //   setSleepMode(!sleepMode);
  //   PushNotification.localNotification({
  //     title: "Wyah Notification", // (optional)
  //     message: "Your app in sleeping mode", // (required)

  //     playSound: true, // (optional) default: true
  //     soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
  //   });
  // };
  const handleLoadMore = () => {
    // console.log("add moe data function fired!");
    setLowerPage(true);
    // alert(pageCurrent);
    loadMoreData();
  };
  const loadMoreData = async () => {
    const user_id = await AsyncStorage.getItem("user_id");
    // console.log("getLatitude", getLatitude, "getLongitude", getLongitude);

    var currentPage = parseInt(pageCurrent) + 1;
    // console.log(currentPage);

    axios({
      method: "post",
      url: "https://digimonk.xyz/searchlocation2?limit=10&page=" + currentPage,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        latitude: getLatitude,
        longitude: getLongitude,
        id: user_id,
      },
    })
      .then(async (response) => {
        setLowerPage(false);
        setPagecurrent(pageCurrent + 1);
        data = response.data.data;
        // console.log(data, "lllllllllllll");
        if (data.length == 0) {
          setNoRecord(true);
        }
        // distance = response.data.distance;

        var oldData = getitem;
        data.map((value) => {
          oldData.push(value);
        });
        setItem(oldData);
        // console.log("loaddata", data, getitem);
        // var NewData = oldData.push(data);
        // setItem([...getitem, data]);
        // console.log("NewData", NewData);
        // setDistance(distance);

        // if (response.data.status == '200') {
        // }
      })
      .catch((e) => {
        setLowerPage(false);
        console.error(e);
      });
  };

  NetInfo.fetch().then((networkState) => {
    // console.log('Connection type - ', networkState.type);
    // console.log('Is connected? - ', networkState.isConnected);
    networkState.isConnected == true
      ? props.navigation.navigate("")
      : props.navigation.navigate("NoConnection");
  });

  useEffect(async () => {
    const token = await AsyncStorage.getItem("token");
    const user_id = await AsyncStorage.getItem("user_id");
    // const sleepMode = await AsyncStorage.getItem("sleepMode");

    // setSleepMode(sleepMode);
    setUserId(user_id);
    // console.log("coming user_id on home page", getUserId);
    setToken(token);
    get_update_notification();
    // console.log("coming sleepMode on home page=================>", sleepMode);
    requestLocationPermission();

    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [refreshing]);

  const requestLocationPermission = async () => {
    if (Platform.OS == "ios") {
      request(PERMISSIONS.IOS.LocationWhenInUse).then((result) => {
        console.log("result====>", result);
        Geolocation.getCurrentPosition(
          (info) => {
            setLatitude(info.coords.latitude);
            setLongitude(info.coords.longitude);
            callApiFunction(info.coords.latitude, info.coords.longitude);
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
          Geolocation.getCurrentPosition(
            (info) => {
              setLatitude(info.coords.latitude);
              setLongitude(info.coords.longitude);
              callApiFunction(info.coords.latitude, info.coords.longitude);
            }

            // setGetLocation(info),
          );
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const newfunction = () => {
    const oldposition = currentScrollerPosition;
    const newposition = oldposition + 330;
    setcurrentScrollerPosition(newposition);
    // console.log(currentScrollerPosition, "check new position");
    // if (positionY > 330 && currentScrollerPosition) {
    //   alert("second post");
    //   setcurrentScrollerPosition(positionY);
    //   // newfunction();
    // }
  };
  const handleScroll = (event) => {
    // console.log("event.nativeEvent", event.nativeEvent);
    const positionX = event.nativeEvent.contentOffset.x;
    const positionY = event.nativeEvent.contentOffset.y;
    // console.log(positionY, "x index value");
    if (positionY > 330) {
      alert("first post");
      setcurrentScrollerPosition(positionY);
      // newfunction(positionY);
    } else if (positionY > currentScrollerPosition + 330) {
      alert("second post");
      newfunction();
    }
  };
  // const onViewableItemsChanged = ({ viewableItems, changed }) => {
  //   console.log("Visible items are", viewableItems);
  //   console.log("Changed in this iteration", changed);
  // };
  const Backgroundtimer = () => {
    BackgroundTimer.runBackgroundTimer(async () => {
      //code that will be called every 3 seconds
      // alert("ok");
      //
      var lat = await AsyncStorage.getItem("lat");
      var lng = await AsyncStorage.getItem("lng");
      var sleep = await AsyncStorage.getItem("sleep");
      // console.log("sleep status============================>", sleep);
      Geolocation.getCurrentPosition(
        async (info) => {
          // console.log(
          //   "kkooooooookkkkkkkkkkkooooooooooooooooo",
          //   lat,
          //   lng,
          //   info.coords.latitude,
          //   info.coords.longitude,
          //   info.coords.latitude.toString() !== lat ||
          //     info.coords.longitude.toString() !== lng
          // );
          // console.log("comingsleepMode: ", sleepMode);

          if (sleep == 1) {
            // console.log("  sleepMode");
            if (
              info.coords.latitude.toString() !== lat ||
              info.coords.longitude.toString() !== lng
            ) {
              setLatitude(info.coords.latitude);
              setLongitude(info.coords.longitude);
              await AsyncStorage.setItem(
                "lat",
                info.coords.latitude.toString()
              );
              await AsyncStorage.setItem(
                "lng",
                info.coords.longitude.toString()
              );
              callApiFunction(info.coords.latitude, info.coords.longitude);
            }
          } else {
            console.log("no call apppoi");
          }
        }

        // setGetLocation(info),
      );

      // console.log(lat, lng);
    }, 10000);
  };

  const changeSleepMode = async () => {
    setSleepMode(!sleepMode);
    // console.log("change sleep status=========================", sleepMode);

    setSleepAlert(true);
  };

  const handleScrollBar = (event) => {
    // console.log("event positoin ", event.nativeEvent);
  };

  const callApiFunction = async (lati, longi) => {
    const user_id = await AsyncStorage.getItem("user_id");
    setIndicatorVisisble(true);
    console.log("check page number coming=====>", pageCurrent);
    axios(
      {
        method: "post",
        url:
          "https://digimonk.xyz/searchlocation2?limit=10&page=" + pageCurrent,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          latitude: lati,
          longitude: longi,
          id: user_id,
        },
      },
      () => {
        // console.log("coming user dataaaaaaaa", data);
      }
    )
      .then(async (response) => {
        data = response.data.data;
        // distance = response.data.distance;
        console.log(" first time data", response);
        if (response.status == 200) {
          setIndicatorVisisble(false);
          setItem(data);
          // setDistance(distance);
        } else {
          console.log("data not found");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <StatusBar hidden={true} />

      <View style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
        {indicatorVisible ? (
          <View
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,.85)",
              position: "absolute",
              zIndex: 100,
              opacity: 0.6,
            }}
          >
            <View style={{ width: 80, height: 80 }}>
              <ActivityIndicator size={80} color="#FFF" />
            </View>
          </View>
        ) : null}
        <View
          style={{
            flexDirection: "row",
            paddingTop: 20,

            alignItems: "center",
            height: "12%",
            // backgroundColor: "pink",
          }}
        >
          <View style={{ width: "18%" }}>
            <TouchableOpacity onPress={() => changeSleepMode()}>
              {sleepMode ? (
                <Image
                  source={require("../images/sleep_mode.png")}
                  // style={{height: 20}}
                  style={{
                    width: 65,
                    height: 50,
                    resizeMode: "contain",
                    marginLeft: 10,
                  }}
                />
              ) : (
                <Image
                  source={require("../images/app_top_left_logo.png")}
                  style={{
                    width: 65,
                    height: 40,
                    resizeMode: "contain",
                    marginLeft: 10,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 13 }}>
            <Text
              style={{
                fontSize: 22,
                fontFamily: "Roboto-Bold",
                fontWeight: "bold",
                color: "#FFF",
              }}
            >
              while you are here..
            </Text>
          </View>
        </View>

        <View style={styles.mapView}>
          <Text
            style={{ color: "#FFF", fontSize: 15, marginLeft: 15, top: 15 }}
          >
            @{getLatitude},-{getLongitude}
            {/* SDFG */}
          </Text>
          {/* <View style={{ right: 15, top: 2 }}>
            <Text style={{ color: "#FFF", fontSize: 15 }}>Range Within</Text>
            <Text style={{ color: "#FFF", fontSize: 13, textAlign: "center" }}>
              {getDistance}K.m
            </Text>
          </View> */}
        </View>

        <View
          style={{
            // borderRadius: 30,
            height: "80%",
            // bottom: 10,
          }}
        >
          {getitem.length == 0 ? (
            indicatorVisible ? null : (
              <View>
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                >
                  <View style={styles.no_connection_image}>
                    <Image
                      source={require("../images/no_connection2.png")}
                      style={{ height: 120, width: 120, resizeMode: "contain" }}
                    />
                  </View>

                  <View style={{ width: "85%", alignSelf: "center" }}>
                    <Text
                      style={{
                        paddingVertical: 20,
                        fontSize: 25,
                        color: "#FFF",
                        textAlign: "center",
                      }}
                    >
                      There are no posts to show in this area yet
                    </Text>
                  </View>
                </ScrollView>
              </View>
            )
          ) : (
            <FlatList
              // onScroll={handleScroll}
              onViewableItemsChanged={onViewRef.current}
              viewabilityConfig={viewConfigRef.current}
              refreshing={refreshing}
              onRefresh={onRefresh}
              contentContainerStyle={{
                flexGrow: 1,
                paddingHorizontal: "3%",
                paddingVertical: "2%",
              }}
              numColumns={1}
              data={getitem}
              // horizontal'
              scrollEventThrottle={400}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              // ListFooterComponent={<ActivityIndicator size={"large"} />}
              // viewabilityConfigCallbackPairs={
              //   viewabilityConfigCallbackPairs.current
              // }
              renderItem={({ item, index }) => <Item item={item} />}
              // renderItem={() => {
              //   return (
              //     <View
              //       style={{
              //         width: "100%",
              //         height: 300,
              //         backgroundColor: "yellow",
              //         marginTop: 10,
              //       }}
              //     >
              //       <Text style={{ position: "absolute", bottom: 0 }}>
              //         Hwlo
              //       </Text>
              //     </View>
              //   );
              // }}
              onEndReachedThreshold={0.5}
              // onMomentumScrollBegin={() => {
              //   this.onEndReachedCalledDuringMomentum = false;
              // }}
              onEndReached={() => {
                handleLoadMore();
              }}
            />
          )}
          {LowerPage && getindex > 3 ? (
            <View style={{ width: 80, height: 80, alignSelf: "center" }}>
              <ActivityIndicator size="large" color="#FFF" />
            </View>
          ) : null}
          {/* {noRecord ? (
            <View>
              <Text style={{ color: "#fff", fontSize: 18 }}>
                NO DATA FOUND!!!
              </Text>
            </View>
          ) : null} */}
        </View>

        {/* </ScrollView> */}
      </View>
      <Modal
        isVisible={sleepAlert}
        // margin={0}
        onBackdropPress={() => setSleepAlert(false)}
        onBackButtonPress={() => setSleepAlert(false)}
        backdropOpacity={0.8}
        animationInTiming={600}
        animationOutTiming={600}
      >
        <View
          style={{
            width: "100%",
            height: "33%",
            backgroundColor: "#000000",
            alignSelf: "center",
            borderColor: "white",
            borderWidth: 0.5,
          }}
        >
          <View style={{ top: 20 }}>
            <Image
              source={require("../images/CMS_LOGO_GIF.png")}
              style={{
                height: "65%",
                width: "65%",
                borderRadius: 10,
                resizeMode: "contain",
                alignSelf: "center",
              }}
            />
          </View>
          <View style={{ top: -10 }}>
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                textAlign: "center",
                fontFamily: "Roboto-Bold",
              }}
            >
              {sleepMode ? "You are in sleep mode now" : "You exit sleep mode"}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              update_notification();
            }}
            style={{
              height: 30,
              width: 50,
              borderRadius: 5,
              alignSelf: "center",
              backgroundColor: "#0070c0",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                textAlign: "center",
                fontFamily: "Roboto-Bold",
              }}
            >
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignSelf: "center",
    width: "100%",
    borderRadius: 10,
  },
  child: { width, justifyContent: "center" },
  text: { fontSize: width * 0.5, textAlign: "center" },
  swipeParent: {
    marginTop: 20,
    width: "100%",
    // backgroundColor: 'red',
    height: 300,
    borderRadius: 10,
  },
  mapView: {
    height: "8%",
    // backgroundColor: "green",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  arrowView: {
    width: "100%",
    flexDirection: "row",
    // backgroundColor: 'red',
    // position: 'absolute',
    justifyContent: "space-between",
    resizeMode: "contain",
    marginVertical: 93,
  },
  backgroundVideo: {
    position: "absolute",
    // backgroundColor: "red",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 350,
    width: "100%",
    alignSelf: "center",
  },
  no_connection_image: {
    height: "35%",
    // backgroundColor: 'red',
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
  },
  videoContainerAndroid: {
    height: "100%",
    width: "100%",
  },
  videoContainerIOS: {
    width: Dimensions.get("window").height,
    height: Dimensions.get("window").width,
    minWidth: Dimensions.get("window").height,
    minHeight: Dimensions.get("window").width,
    width: Dimensions.get("screen").height,
    height: Dimensions.get("screen").width,

    transform: [{ rotate: "90deg" }],
  },
  mediaPlayer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "black",
    justifyContent: "center",
  },
  backgroundVideo1: {
    height: 250,
    width: "100%",
  },
  mediaControls: {
    width: "100%",
    height: "100%",
  },
  backgroundVideoFullScreen: {
    height: screenHeight,
    width: "100%",
  },
});
// {

//    var alat=""
//     var lang = "";
//     var newlat="",
//     var newlng=""
//     if(lat!==newlat){
//       lat=newlet
//     }
//     if(lng!==newlang){
//       lang=newlang
//     }

//     lat, lang

// }
