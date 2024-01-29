import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../types/todo";
import AddTodoForm from "./AddTodoForm";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";

// Component to display the list of todos
const TodoList: React.FC = () => {
  // State for storing the list of todos
  const [todos, setTodos] = useState<Todo[]>([]);
  // State to track if the list is currently being loaded
  const [isLoading, setIsLoading] = useState(false);

  // Function to refresh the list of todos from the server
  const refreshTodos = async () => {
    setIsLoading(true); // Begin loading
    try {
      // Fetch the list of todos from the server
      const response = await fetch("https://todo-list-app-backend-03d4541305dd.herokuapp.com/api/todos");
      if (response.ok) {
        // Parse and set the todos if the response is successful
        const data = (await response.json()) as Todo[];
        setTodos(data);
      } else {
        // Throw an error if the response is unsuccessful
        throw new Error("Failed to fetch todos");
      }
    } catch (error) {
      // Display an error message if fetching todos fails
      toast.error("Error fetching todos");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  // useEffect hook to load the todos when the component mounts
  useEffect(() => {
    refreshTodos();
  }, []); // Empty dependency array to run only once on mount

  // Render the component
  return (
    <div>
      {/* AddTodoForm component to add new todos */}
      <AddTodoForm onNewTodo={refreshTodos} /> {/* Add the form here */}
      {/* Display loading spinner or list of TodoItem components */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} refreshTodos={refreshTodos} />
        ))
      )}
    </div>
  );
};

export default TodoList;
