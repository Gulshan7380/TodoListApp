import React, {memo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const todoItem = ({todo, onToggle, onDelete}) => {
  return (
    <View activeOpacity={0.8} style={styles.container}>
      <Text style={[styles.title]}>{todo.title}</Text>
      <View style={styles.boxContainer}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.checkboxContainer} onPress={onToggle}>
            <View
              style={[
                styles.checkbox,
                {backgroundColor: todo.completed ? '#000' : '#fff'},
              ]}
            />
          </TouchableOpacity>
          <Text style={styles.status}>
            {todo.completed ? 'Done' : 'Active'}
          </Text>
        </View>
        <TouchableOpacity style={styles.delete} onPress={onDelete}>
          <Text adjustsFontSizeToFit style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#000',
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 10,
  },
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  checkbox: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },
  deleteText: {
    color: '#000',
    alignSelf: 'center',
    fontWeight: '500',
    includeFontPadding: false,
  },
  delete: {
    width: 60,
    height: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CD6155',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D98880',
  },
  status: {
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default memo(todoItem);
