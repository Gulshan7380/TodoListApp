
// todosSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchTodos } from '../utils/api';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    setTodos: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    addTodo: (state, action) => {
      state.list.unshift(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setTodos, addTodo, toggleTodo, deleteTodo, setLoading, setError } = todosSlice.actions;

export const fetchTodosAsync = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const todos = await fetchTodos();
    dispatch(setTodos(todos));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const selectTodos = (state) => state.todos.list;

export default todosSlice.reducer;

