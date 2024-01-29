import React from "react";
import TodoList from "../components/TodoList";
import { ToastContainer } from "react-toastify"; // Import for toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications
import "../app/globals.css";

// Home component definition
const Home: React.FC = () => {
  return (
    // Container div with Tailwind CSS classes for styling
    <div className="container mx-auto p-4">
      {/* Page title */}
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      {/* TodoList component - responsible for displaying the list of todos */}
      <TodoList />
      {/* ToastContainer for displaying toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default Home;
