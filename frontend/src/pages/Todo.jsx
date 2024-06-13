import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./todo.css";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Function to check if user is authenticated
    const isAuthenticated = () => {
      // Replace with your authentication logic
      const user = localStorage.getItem("user");
      return !!user;
    };

    // If not authenticated, redirect to /auth
    if (!isAuthenticated()) {
      navigate("/auth");
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.name); // Set user's name to state
    }
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    setTasks([...tasks, { title, description }]);
    e.target.reset();
  };

  const handleEditTask = (e) => {
    e.preventDefault();
    const title = e.target["edit-title"].value;
    const description = e.target["edit-description"].value;
    setTasks(
      tasks.map((task) =>
        task === currentTask ? { title, description } : task
      )
    );
    setShowModal(false);
  };

  const handleDeleteTask = (taskToDelete) => {
    setTasks(tasks.filter((task) => task !== taskToDelete));
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('user');

    navigate('/auth');
  };

  return (
    <div>
      <div className="headline">
        <h1 id="head-date">Welcome {userName}</h1>
      </div>

      {/* Logout Button */}
      <div className="fixed-bottom-end p-3">
        <button
          className="btn btn-danger"
          onClick={handleLogout}
          style={{ position: "fixed", bottom: "20px", right: "20px" }}
        >
          Logout
        </button>
      </div>

      <div className="InputBox">
        <form onSubmit={handleAddTask}>
          <h3 className="mb-3 fw-normal">Add Task</h3>

          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="title" required />
            <label htmlFor="title">Title</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              id="description"
              required
            ></textarea>
            <label htmlFor="description">Description</label>
          </div>
          <div className="text-center">
            <button
              style={{ backgroundColor: "#5b21c0" }}
              className="btn btn-primary py-2 fw-bold"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>

      <div className="todo-list">
        <ul id="todo-items" className="list-group">
          {tasks.map((task, index) => (
            <li key={index} className="list-group-item">
              <h5>{task.title}</h5>
              <p>{task.description}</p>
              <button
                className="btn btn-sm btn-secondary me-2 mt-2"
                onClick={() => {
                  setCurrentTask(task);
                  setShowModal(true);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger mt-2"
                onClick={() => handleDeleteTask(task)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {tasks.length === 0 && (
          <p id="no-tasks-message" className="text-center text-muted">
            No task for today, add tasks please!
          </p>
        )}
      </div>

      {showModal && (
        <div
          className="modal fade show custom-modal-backdrop"
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">
                  Edit Task
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEditTask}>
                  <div className="mb-3">
                    <label htmlFor="edit-title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edit-title"
                      defaultValue={currentTask?.title}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edit-description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edit-description"
                      defaultValue={currentTask?.description}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
