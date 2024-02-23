import React, {useCallback, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addTodo} from '../redux/todosSlice';

const AddTodoScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleAddTodo = useCallback(() => {
    if (text.trim()) {
      dispatch(
        addTodo({
          id: Math.random().toString(),
          title: text,
          completed: false,
          created_at: new Date(),
        }),
      );
      setText('');
      Alert.alert('Success', 'Todo added successfully!');
    }
  });

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TouchableOpacity
      activeOpacity={0.8}
        style={styles.headerContainer}
        onPress={() => navigation.goBack()}>
        <Image source={require('../assets/icons/back.png')} />
        <Text style={styles.headerStyle}>AddTodo</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.textInputStyle}
        placeholderTextColor={'#000'}
        cursorColor={'#000'}
        value={text}
        onChangeText={setText}
        placeholder="Enter todo"
      />

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.buttonStyle}
        onPress={() => handleAddTodo()}>
        <Text style={styles.buttonTextStyle}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTodoScreen;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 10,
    paddingLeft: 15,
  },
  headerStyle: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    includeFontPadding: false,
  },
  textInputStyle: {
    borderColor: '#000',
    borderWidth: 1.5,
    width: '90%',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
    alignSelf: 'center',
    marginVertical: 50,
    fontWeight: '500',
    color: '#000',
    fontSize: 15,
  },
  buttonStyle: {
    height: 40,
    backgroundColor: '#000',
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonTextStyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    includeFontPadding: false,
  },
});
