import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import commonResources from '../../constant/images';

const Home = () => {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D9F2E7',
      }}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
          }}>
          Welcome to DailyVita
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#333',
            marginTop: 10,
          }}>
          Hello, we are here to make your life healthier and happier
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        <FastImage
          source={commonResources.landingLogo}
          style={{
            width: width,
            height: height / 3,
          }}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#333',
            marginTop: 10,
            width: '100%',
          }}>
          We will ask couple of questions to better understand your vitamin
          need.
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#EF6C57',
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
            width: '100%',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Form')}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
