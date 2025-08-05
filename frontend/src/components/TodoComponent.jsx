import React, { useEffect, useState } from "react";
import { addTodo, getTodo, updateTodo } from "../service/TodoService";
import { useNavigate, useParams } from "react-router-dom";

const TodoComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getTodo(id).then((response) => {
        console.log(response);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCompleted(response.data.completed);
      });
    }
  }, [id]);

  function pageTitle() {
    if (id) {
      return "Update";
    } else {
      return "Add New";
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const todo = {
      title,
      description,
      completed,
    };

    if (id) {
      updateTodo(id, todo)
        .then((response) => {
          console.log(response.data);
          navigator("/todos");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      addTodo(todo)
        .then((response) => {
          console.log(response.data);
          navigator("/todos");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div
        className="card shadow-lg"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <div className="card-body">
          <h3 className="card-title mb-4 text-center">{pageTitle()} Todo</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="completedCheckbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="completedCheckbox">
                Completed
              </label>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-plus-lg me-2"></i> {pageTitle()} Todo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TodoComponent;
