import axios from 'axios'
import { getToken } from './AuthService'

const REST_API_BASE_URL = "http://localhost:8080/api/todos"

axios.interceptors.request.use(function (config) {

    config.headers['Authorization'] = getToken();

    return config
}), function (error) {
    return Promise.reject(error);
}

export const getAllTodos = () => axios.get(REST_API_BASE_URL);

export const addTodo = (todo) => axios.post(REST_API_BASE_URL, todo);

export const getTodo = (todoId) => axios.get(REST_API_BASE_URL + "/" + todoId);

export const updateTodo = (todoId, todo) => axios.put(REST_API_BASE_URL + "/" + todoId, todo);

export const deleteTodo = (todoId) => axios.delete(REST_API_BASE_URL + "/" + todoId);

export const completeTodo = (todoId) => axios.patch(REST_API_BASE_URL + "/" + todoId + "/complete");

export const inCompleteTodo = (todoId) => axios.patch(REST_API_BASE_URL + "/" + todoId + "/in-complete");