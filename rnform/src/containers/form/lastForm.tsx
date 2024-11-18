import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DIET} from '../../constant/data';
import RadioGroup from 'react-native-radio-buttons-group';

const LastForm = ({
  setValue,
  watch,
  onNextStep = () => {}, 
  onPrevStep = () => {},
  handleSubmit = () => {},
}) => {
  const selection = DIET;
  const [data, setData] = useState([]);
  const [selectedId_1, setSelectedId_1] = useState();
  const [selectedId_2, setSelectedId_2] = useState();
  const [selectedId_3, setSelectedId_3] = useState();
  const radioButtons_1 = useMemo(
    () => [
      {
        id: '1',
        label: 'Yes',
        value: 'true',
      },
      {
        id: '2',
        label: 'No ',
        value: 'false',
      },
    ],
    [],
  );
  const radioButtons_2 = useMemo(
    () => [
      {
        id: '1',
        label: 'Yes',
        value: 'true',
      },
      {
        id: '2',
        label: 'No ',
        value: 'false',
      },
    ],
    [],
  );

  const radioButtons_3 = useMemo(
    () => [
      {
        id: '1', 
        label: '0 - 1',
        value: '0-1',
      },
      {
        id: '2',
        label: '2 - 5',
        value: '2-5',
      },
      {
        id: '3',
        label: '5 +  ',
        value: '5+',
      },
    ],
    [],
  );
  useEffect(() => {
    if(selectedId_1){
      setValue('is_daily_exposure', radioButtons_1.find(i => i.id === selectedId_1)?.value);
    }
    if(selectedId_2){
      setValue('is_smoke', radioButtons_2.find(i => i.id === selectedId_2)?.value);
    }
    if(selectedId_3){
      setValue('alcohol', radioButtons_3.find(i => i.id === selectedId_3)?.value);
    }

  }, [selectedId_1, selectedId_2, selectedId_3]);
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
          Is your daily exposure to sun is limited?
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
            alignItems: 'flex-start',
          }}>
          <RadioGroup
            radioButtons={radioButtons_1}
            onPress={setSelectedId_1}
            selectedId={selectedId_1}
          />
        </View>

        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Do you current smoke ( tobacco or marijuana)?
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
            alignItems: 'flex-start',
          }}>
          <RadioGroup
            radioButtons={radioButtons_2}
            onPress={setSelectedId_2}
            selectedId={selectedId_2}
          />
        </View>

        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          On average, how many alcoholic beverages do you have in a week ?
          <Text
            style={{
              color: 'red',
            }}>
            *
          </Text>
        </Text>
        <View
          style={{
            marginTop: 20,
            alignItems: 'flex-start',
          }}>
          <RadioGroup
            radioButtons={radioButtons_3}
            onPress={setSelectedId_3}
            selectedId={selectedId_3}
          />
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
          onPress={() => {
            if(watch('is_daily_exposure') == ""  ||
             watch('is_smoke') == "" || 
             watch('alcohol') == ""){
              Alert.alert('Please fill all the fields');
              return; 
            } else {
              handleSubmit();
            }
          }}
          style={{
            padding: 10,
            borderRadius: 5,
            marginRight: 10,
            width: '75%',
            backgroundColor: '#EF6C57',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Get my personalized vitamin
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

export default LastForm;
