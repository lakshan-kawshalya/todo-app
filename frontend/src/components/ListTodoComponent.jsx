import React, { useEffect, useState } from "react";
import {
  completeTodo,
  deleteTodo,
  getAllTodos,
  inCompleteTodo,
} from "../service/TodoService";
import { useNavigate } from "react-router-dom";

const ListTodoComponent = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchAllTodos();
  }, []);

  const navigator = useNavigate();

  function fetchAllTodos() {
    getAllTodos()
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewTodo() {
    navigator("/add-todo");
  }

  function updateTodo(id) {
    navigator(`/update-todo/${id}`);
  }

  function removeTodo(id) {
    deleteTodo(id)
      .then((response) => {
        console.log(response.data);
        fetchAllTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function toggleStatus(id, todoStatus) {
    if (todoStatus) {
      inCompleteTodo(id)
        .then((response) => {
          console.log(response.data);
          fetchAllTodos();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      completeTodo(id)
        .then((response) => {
          console.log(response.data);
          fetchAllTodos();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Todo List</h1>
        <a className="btn btn-primary" onClick={addNewTodo}>
          <i className="bi bi-plus-circle me-2"></i>
          Add New Todo
        </a>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>
                <span
                  className={`badge ${
                    todo.completed ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {todo.completed ? "Complete" : "In-Complete"}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => updateTodo(todo.id)}
                >
                  <i className="bi bi-pencil-square me-1"></i>Update
                </button>
                <button
                  className="btn btn-sm btn-danger me-2"
                  onClick={() => removeTodo(todo.id)}
                >
                  <i className="bi bi-trash me-1"></i>Delete
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => toggleStatus(todo.id, todo.completed)}
                >
                  <i className="bi bi-arrow-repeat me-1"></i>Toggle Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodoComponent;
