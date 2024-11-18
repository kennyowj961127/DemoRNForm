import React, {memo, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HEALTHCONCERNS} from '../../constant/data';
import DraggableFlatList from 'react-native-draggable-flatlist';
import FastImage from 'react-native-fast-image';
import commonResources from '../../constant/images';
import usePrevious from '../../utils/usePrevious';

const FirstForm = ({
  setValue,
  watch,
  onNextStep = () => {},
  onPrevStep = () => {},
}) => {
  const selection = HEALTHCONCERNS;
  const [data, setData] = React.useState(watch('health_concerns'));
  const prevData = usePrevious(data);
  useEffect(() => {
    if (data) {
      if (prevData?.length > data?.length) {
        setData(data.map((item, index) => ({...item, priority: index + 1})));
      }
    //   console.log('FirstForm', data);
      setValue('health_concerns', data);
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
          Select the top health concerns.
          <Text
            style={{
              color: 'red',
            }}>
            *
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 24,
            color: '#333',
            fontWeight: 'bold',
          }}>
          (upto 5)
        </Text>
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            marginTop: 20,
            gap: 10,
          }}>
          {selection.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (data.some(i => i.id === item.id)) {
                    setData(data.filter(i => i.id !== item.id));
                  } else {
                    if (data.length < 5) {
                      setData([...data, {...item, priority: data.length + 1}]);
                    } else {
                      Alert.alert('You can select upto 5 health concerns');
                    }
                  }
                }}
                style={{
                  backgroundColor: data.some(i => i.id === item.id)
                    ? '#33425B'
                    : 'transparent',
                  padding: 10,
                  borderRadius: 100,
                  marginBottom: 10,
                  alignItems: 'center',
                  borderColor: '#33425B',
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    color: data.some(i => i.id === item.id) ? 'white' : 'black',
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#333',
          }}>
          Prioritize
        </Text>
        <DraggableFlatList
          data={data}
          renderItem={({item, index, drag}) => {
            // set data {...data, [item.priority]: index}
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: '#ECF9F3',
                  justifyContent: 'center',
                  marginVertical: 10,
                  borderColor: '#33425B',
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 10,
                }}
                onLongPress={drag}>
                <View
                  style={{
                    backgroundColor: '#33425B',
                    padding: 10,
                    borderRadius: 100,
                    alignSelf: 'flex-start',
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    {item.name}
                  </Text>
                </View>
                <FastImage
                  source={commonResources.icoMenu}
                  style={{
                    width: 20,
                    height: 20,
                    position: 'absolute',
                    right: 10,
                    top: 15,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => `draggable-item-${item.id}`}
          onDragEnd={({data}) => {
            // update priority
            setData(
              data.map((item, index) => ({...item, priority: index + 1})),
            );
          }}
        />
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default memo(FirstForm);
