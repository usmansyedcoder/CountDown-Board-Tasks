import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import "./Dashboard.css";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      const tasksCollection = collection(db, "tasks");
      const taskSnapshot = await getDocs(tasksCollection);
      const taskList = taskSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskList);
    }
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    const docRef = await addDoc(collection(db, "tasks"), {
      task,
      status: "To Do",
      createdAt: new Date(),
      userId: currentUser.uid,
    });
    setTasks([...tasks, { id: docRef.id, task, status: "To Do" }]);
    setTask("");
  };

  const handleUpdateTask = async (id, newStatus) => {
    const taskDoc = doc(db, "tasks", id);
    await updateDoc(taskDoc, { status: newStatus });
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="container">
      <header>
        <h1>Project Management Board</h1>
      </header>
      <div>
        <input
          className="input"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="New Task"
        />
        <button className="button" onClick={handleAddTask}>
          Add Task
        </button>
        <button className="button" onClick={logout}>
          Log Out
        </button>
      </div>
      <div className="task-container">
        <div>
          <h3>To Do</h3>
          {tasks
            .filter((task) => task.status === "To Do")
            .map((task) => (
              <div key={task.id} className="task-card">
                <h3>{task.task}</h3>
                <button
                  className="button"
                  onClick={() => handleUpdateTask(task.id, "In Progress")}
                >
                  In Progress
                </button>
              </div>
            ))}
        </div>
        <div>
          <h3>In Progress</h3>
          {tasks
            .filter((task) => task.status === "In Progress")
            .map((task) => (
              <div key={task.id} className="task-card">
                <h3>{task.task}</h3>
                <button
                  className="button"
                  onClick={() => handleUpdateTask(task.id, "Completed")}
                >
                  Completed
                </button>
              </div>
            ))}
        </div>
        <div>
          <h3>Completed</h3>
          {tasks
            .filter((task) => task.status === "Completed")
            .map((task) => (
              <div key={task.id} className="task-card">
                <h3>{task.task}</h3>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
