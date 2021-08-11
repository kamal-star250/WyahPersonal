import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import {COLORS} from '../constant/Theme';
import Video from 'react-native-video';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
const slides = [
  {
    id: 1,
    link:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    type: 'video',
  },
  {
    id: 2,
    link: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
    type: 'image',
  },
  {
    id: 3,
    link: 'http://techslides.com/demos/sample-videos/small.mp4',
    type: 'video',
  },
];

const RenderSlider = ({item, currentIndex, index}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);

  console.log(currentIndex, index);

  useEffect(() => {
    handlePlay();
    return () => {
      handleStop();
    };
  }, []);

  const handlePlay = () => {
    setPaused(false);
  };
  const handleStop = () => {
    setPaused(true);
  };
  return (
    <View style={styles.sliderContainer} key={item.id}>
      {item.type == 'video' ? (
        <View style={{width: '100%', height: '100%'}}>
          <Video
            source={{
              uri: item.link,
            }}
            muted={false}
            paused={currentIndex == index ? false : true}
            playInBackground={false}
            playWhenInactive={false}
            resizeMode={'cover'}
            rate={1.0}
            ignoreSilentSwitch={'obey'}
            style={{width: '100%', height: '100%'}}
          />
        </View>
      ) : (
        <Image
          // source={{ uri: `${BASEURL}/uploads/${endPoints}/${item.image}` }}
          source={{uri: item.link}}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
        />
      )}
    </View>
  );
};
export default function ImageSlider(props) {
  const [state, setstate] = useState({
    selectedIndex: 0,
  });

  let onScrollEnd = e => {
    let pageNumber = Math.min(
      Math.max(
        Math.floor(e.nativeEvent.contentOffset.x / deviceWidth + 0.5) + 1,
        0,
      ),
      slides.length,
    );

    if (pageNumber == 1) {
      setstate({
        selectedIndex: 0,
      });
    } else {
      setstate({
        selectedIndex: pageNumber - 1,
      });
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{height: deviceHeight * 0.28, marginBottom: 0}}>
        {slides.length > 0 && (
          <FlatList
            data={slides}
            renderItem={({item, index}) => (
              <RenderSlider
                item={item}
                index={index}
                currentIndex={state.selectedIndex}
              />
            )}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onMomentumScrollEnd={onScrollEnd}
            scrollEventThrottle={16}
            horizontal
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    width: deviceWidth * 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight * 0.3,
    // paddingHorizontal: 20,
  },
  backgroundVideo: {
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
});
