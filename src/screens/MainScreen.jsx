import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FilterDropdown from '../components/FilterDropdown';
import TodoItem from '../components/TodoItem';
import {
  deleteTodo,
  fetchTodosAsync,
  selectTodos,
  toggleTodo,
} from '../redux/todosSlice';
import {STACK_NAVIGATION_KEYS} from '../navigation/NavigationKeys';
import {useNavigation} from '@react-navigation/native';

const MainScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const loading = useSelector(state => state.todos.loading);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, [dispatch]);

  const handleToggleTodo = id => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = id => {
    dispatch(deleteTodo(id));
    Alert.alert('Success', 'Delete Successfully!');
  };
  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (filter === 'All') {
      return matchesSearch;
    } else if (filter === 'Active') {
      return !todo.completed && matchesSearch;
    } else if (filter === 'Done') {
      return todo.completed && matchesSearch;
    }

    return true;
  });

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={styles.headerStyle}>
            <Text style={styles.headerTitle}>TodoList</Text>
          </View>
          <View style={styles.todoItemContainer}>
            <View style={styles.todoItem}>
              <Text style={styles.todoItemText}>
                Total Todo items: {filteredTodos.length}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.todoItem, {width: '40%'}]}
              onPress={() =>
                navigation.navigate(STACK_NAVIGATION_KEYS.ADD_TODO_SCREEN)
              }>
              <Text style={styles.todoItemText}>AddTodoItem</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '95%',
              alignSelf: 'center',
             marginVertical:15
            }}>
            <TextInput
              style={styles.textInput}
              placeholder="Search by name"
              placeholderTextColor={'#000'}
              onChangeText={text => setSearchQuery(text)}
              value={searchQuery}
            />
            <FilterDropdown
              value={filter}
              onChange={setFilter}
              placeholder="Filter Items"
              items={[{value: 'All'}, {value: 'Active'}, {value: 'Done'}]}
              onFilter={setFilter}
            />
          </View>

          <FlatList
            data={filteredTodos}
            contentContainerStyle={{paddingBottom: 20}}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <TodoItem
                todo={item}
                onToggle={() => handleToggleTodo(item.id)}
                onDelete={() => handleDeleteTodo(item.id)}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      )}
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  headerStyle: {
    alignItems: 'center',
    height: 40,
    elevation: 3,
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  textInput: {
    height: 40,
    width:'50%',
    borderColor: '#000',
    borderWidth: 1.5,
    borderRadius: 10,
 
    paddingHorizontal: 15,
    color: '#000',
    fontWeight: '500',
    fontSize: 15,
  },
  todoItem: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1.5,
    borderRadius: 10,
    width: '50%',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoItemText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 15,
  },
  todoItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
    marginTop: 15,
  },
});
