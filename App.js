import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Slider,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Video from 'react-native-video';
import TrackPlayer, {Capability} from 'react-native-track-player';
const {height, width} = Dimensions.get('window');
const App = () => {
  const [isPyaing, setIsPlaying] = useState(false);
  useEffect(() => {
    setupTrackPlayer();
    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  const setupTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        capabilities: [Capability.Play, Capability.Pause],
      });
      await TrackPlayer.add([{url: require('./src/audio.mp3')}]);
      getTime();
    } catch (e) {
      console.log(e);
    }
  };

  const getTime = async () => {
    const time = await TrackPlayer.getDuration();
    console.log(time);
  };
  return (
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Video
          style={{width: '100%', height: height}}
          source={require('./src/video.mp4')}
          resizeMode={'cover'}
          repeat
          muted
        />
        <View
          style={{
            width: '100%',
            height: height,
            position: 'absolute',
            top: 0,
            backgroundColor: '#000',
            opacity: 0.7,
          }}></View>
        <View
          style={{
            width: '100%',
            height: height,

            position: 'absolute',

            top: 0,
          }}>
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              padding: 15,
              width: '100%',
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View>
                <Text style={{color: '#fff', fontSize: 22}}>Demo Music</Text>
                <Text style={{color: '#fff', fontSize: 14}}>Xyz Singer</Text>
              </View>
              <Image
                source={require('./src/heart.png')}
                style={{width: 24, height: 24, tintColor: '#fff'}}
              />
            </View>
            <View style={{marginTop: 20}}>
              <Slider minimumTrackTintColor={'#fff'} thumbTintColor={'#fff'} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <Text style={{color: '#fff'}}>1:00</Text>
              <Text style={{color: '#fff'}}>2:30</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: '100%',
                marginTop: 30,
              }}>
              <Image
                source={require('./src/suffle.png')}
                style={{width: 30, height: 30, tintColor: '#fff'}}
              />
              <Image
                source={require('./src/previous.png')}
                style={{width: 24, height: 24, tintColor: '#fff'}}
              />
              <TouchableOpacity
                onPress={() => {
                  if (isPyaing == true) {
                    TrackPlayer.pause();
                    setIsPlaying(false);
                  } else {
                    TrackPlayer.play();
                    setIsPlaying(true);
                  }
                }}>
                <Image
                  source={
                    isPyaing == true
                      ? require('./src/pause.png')
                      : require('./src/play-button.png')
                  }
                  style={{width: 50, height: 50, tintColor: '#fff'}}
                />
              </TouchableOpacity>
              <Image
                source={require('./src/next.png')}
                style={{width: 24, height: 24, tintColor: '#fff'}}
              />
              <Image
                source={require('./src/repeat.png')}
                style={{width: 24, height: 24, tintColor: '#fff'}}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: 300,
            backgroundColor: 'black',
          }}>
          <View
            style={{
              width: '90%',
              height: '70%',
              alignSelf: 'center',
              marginTop: 20,
              backgroundColor: 'orange',
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: '700',
                textAlign: 'justify',
                margin: 10,
              }}>
              {
                'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur'
              }
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default App;
