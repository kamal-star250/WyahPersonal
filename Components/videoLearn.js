import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View, Linking} from 'react-native';
// import Video from 'react-native-video';
// import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
export default function videoLearn() {
  // let player = '';
  //   const videoPlayer = useRef(null);
  //   const [currentTime, setCurrentTime] = useState(0);
  //   const [duration, setDuration] = useState(0);
  //   const [isFullScreen, setIsFullScreen] = useState(false);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [paused, setPaused] = useState(false);
  //   const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  //   const [screenType, setScreenType] = useState('content');

  //   const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);
  //   const onLoad = data => {
  //     setDuration(data.duration);
  //     setIsLoading(false);
  //   };
  //   const onLoadStart = data => setIsLoading(true);

  //   const onProgress = data => {
  //     // Video Player will progress continue even if it ends
  //     if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
  //       setCurrentTime(data.currentTime);
  //     }
  //   };

  //   const onFullScreen = () => {
  //     setIsFullScreen(isFullScreen);
  //     if (screenType == 'content') setScreenType('cover');
  //     else setScreenType('content');
  //   };

  //   const onPaused = playerState => {
  //     //Handler for Video Pause
  //     setPaused(!paused);
  //     setPlayerState(playerState);
  //   };

  //   const onReplay = () => {
  //     //Handler for Replay
  //     setPlayerState(PLAYER_STATES.PLAYING);
  //     videoPlayer.current.seek(0);
  //   };

  //   const onSeek = seek => {
  //     //Handler for change in seekbar
  //     videoPlayer.current.seek(seek);
  //   };

  //   const onSeeking = currentTime => setCurrentTime(currentTime);

  //   const renderToolbar = () => (
  //     <View>
  //       <Text style={styles.toolbar}> toolbar </Text>
  //     </View>
  //   );
  return (
    // <View>
    //   <Video
    //     onEnd={onEnd}
    //     onLoad={onLoad}
    //     onLoadStart={onLoadStart}
    //     onProgress={onProgress}
    //     paused={paused}
    //     ref={videoPlayer}
    //     resizeMode={screenType}
    //     onFullScreen={isFullScreen}
    //     source={{
    //       uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    //     }}
    //     style={styles.mediaPlayer}
    //     volume={10}
    //   />

    //   <MediaControls
    //     duration={duration}
    //     isLoading={isLoading}
    //     mainColor="#333"
    //     onFullScreen={onFullScreen}
    //     onPaused={onPaused}
    //     onReplay={onReplay}
    //     onSeek={onSeek}
    //     onSeeking={onSeeking}
    //     playerState={playerState}
    //     progress={currentTime}
    //     toolbar={renderToolbar()}
    //   />
    <View>
      {/* <Video
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        ref={ref => {
          player = ref;
        }} // Store reference
        //    onBuffer={this.onBuffer}                // Callback when remote video is buffering
        //    onError={this.videoError}               // Callback when video cannot be loaded
        style={styles.backgroundVideo}
      /> */}
      <View>
        <Text>
          Hiiii{' '}
          <Text
            style={{color: 'red'}}
            onPress={() => Linking.openURL('https://www.wyah.online/TandC')}>
            This is my page
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: '100%',
    width: '100%',
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    // marginTop: 10,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
