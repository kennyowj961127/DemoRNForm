import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DIET} from '../../constant/data';
import CheckBox from '@react-native-community/checkbox';
import {Tooltip} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import commonResources from '../../constant/images';

const SecondForm = ({
    setValue,
    watch,
    onNextStep = () => {}, 
    onPrevStep = () => {}
}) => {
  const selection = DIET;
  const [data, setData] = React.useState(watch('diets'));

  useEffect(() => {
    if (data) {
      setValue('diets', data);
    }
  }, [data]);
  return (
    <SafeAreaView style={styles.container}>
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
          Select the diets you follow.
          <Text
            style={{
              color: 'red',
            }}>
            *
          </Text>
        </Text>
        <View
          style={{
            flexDirection: 'column',
            marginTop: 20,
            gap: 10,
          }}>
          {selection.map((item, index) => {
            return (
              <View key={index} style={styles.itemContainer}>
                <CheckBox
                  onCheckColor="white"
                  onFillColor="#33425B"
                  onTintColor="#33425B"
                  value={data.some(i => i.id === item.id)}
                  onValueChange={() => {
                    if (data.some(i => i.id === item.id)) {
                      setData(data.filter(i => i.id !== item.id));
                    } else {
                      if (data.length < 5) {
                        setData([...data, item]);
                      }
                    }
                  }}
                  containerStyle={styles.checkboxContainer}
                />
                <Text style={styles.itemText}>{item.name}</Text>
                <Tooltip 
                    popover={<Text>{item.tool_tip}</Text>}
                    backgroundColor="white"
                    withOverlay={false}
                    width={200}
                    height={100}
                >
                  <FastImage
                    source={commonResources.icoInformation}
                    style={styles.icon}
                    />
                </Tooltip>
              </View>
            );
          })}
        </View>
      </View>
      <View style={{flex: 1}}></View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        <TouchableOpacity
          onPress={onPrevStep}
          style={{
            padding: 10,
            borderRadius: 5,
            marginRight: 10,
            width: '25%',
          }}>
          <Text
            style={{
              color: '#EF6C57',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onNextStep}
          style={{
            padding: 10,
            borderRadius: 5,
            backgroundColor: '#EF6C57',
            alignItems: 'center',
            width: '25%',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  checkboxContainer: {
    margin: 0,
    padding: 0,
  },
  itemText: {
    marginLeft: 10,
    color: 'black',
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default SecondForm;
