import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ALLERGY} from '../../constant/data';

const ThirdForm = ({
  setValue,
  watch,
  onNextStep = () => {}, 
  onPrevStep = () => {}
}) => {
  const selection = ALLERGY;
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState(watch('allergies'));

  const handleAddTag = (item) => {
    if (!tags.some(tag => tag.id === item.id)) {
      setTags([...tags, item]);
      setInputValue('');
    }
  };

  const handleRemoveTag = (item) => {
    setTags(tags.filter(tag => tag !== item));
  };

  const filteredSelection = selection.filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()));
  
  useEffect(() => {
    if (tags) {
      setValue('allergies', tags);
    }
  }, [tags]);
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
         Write any specific allergies or sensitivity towards specific things. (optional)
        </Text>
        <View style={styles.inputContainer}>
        <FlatList
          data={tags}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{item?.name}</Text>
              {/* <TouchableOpacity onPress={() => handleRemoveTag(item)}>
                <Text style={styles.removeTag}>x</Text>
              </TouchableOpacity> */}
            </View>
          )}
          keyExtractor={(item, index) => `tag-${index}`}
          style={styles.tagList}
        />
        <TextInput
          style={styles.textInput}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Type to add allergies"
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace' && inputValue === '') {
              setTags(tags.slice(0, -1));
            }
          }}
        />
      </View>
      {inputValue.length > 0 && (
        <FlatList
          data={filteredSelection}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleAddTag(item)}>
              <Text style={styles.suggestion}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => `suggestion-${index}`}
          style={styles.suggestionList}
        />
      )}
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

  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#33425B',
    borderRadius: 5,
    padding: 10,
    marginTop: 30,
  },
  textInput: {
    flex: 1,
    minWidth: 100,
  },
  tagList: {
    flexDirection: 'row',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#33425B',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
  },
  tagText: {
    color: 'white',
  },
  removeTag: {
    color: 'white',
    marginLeft: 5,
  },
  suggestionList: {
    marginTop: 10,
  },
  suggestion: {
    padding: 10,
    backgroundColor: '#ECF9F3',
    borderBottomWidth: 1,
    borderBottomColor: '#33425B',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#33425B',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ThirdForm;
