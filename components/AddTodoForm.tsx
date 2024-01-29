import React, { useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner"; // Import the LoadingSpinner component for visual feedback during loading states.

// Props type definition for AddTodoForm
interface AddTodoFormProps {
  onNewTodo: () => void; // Callback function to refresh the todo list in the parent component.
}

// The AddTodoForm component handles the addition of new todo items.
const AddTodoForm: React.FC<AddTodoFormProps> = ({ onNewTodo }) => {
  // State hooks for managing form input values and loading state.
  const [title, setTitle] = useState(""); // Title of the new todo.
  const [description, setDescription] = useState(""); // Description of the new todo.
  const [priority, setPriority] = useState("Medium"); // Priority of the new todo, default is 'Medium'.
  const [dueDate, setDueDate] = useState(""); // Due date of the new todo.
  const [isLoading, setIsLoading] = useState(false); // Loading state to manage UI during async operations.

  // handleSubmit is triggered on form submission.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the default form submission action.

    // Validation section: ensures the input fields meet certain criteria.
    // Checks if title is empty and shows an error message if so.
    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    // Checks if description is only whitespace (if provided) and shows an error message.
    if (description && !description.trim()) {
      toast.error("Description cannot be just whitespace");
      return;
    }

    // Checks if priority is a valid value.
    const validPriorities = ["Low", "Medium", "High"];
    if (!validPriorities.includes(priority)) {
      toast.error("Invalid priority");
      return;
    }

    // Validates the due date format.
    if (dueDate && isNaN(Date.parse(dueDate))) {
      toast.error("Invalid date format");
      return;
    }

    // API request section: sends the new todo data to the server.
    setIsLoading(true); // Enables the loading state.
    try {
      // API request to add a new todo
      const response = await fetch("https://todo-list-app-backend-03d4541305dd.herokuapp.com/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, priority, dueDate }),
      });

      // Handles the response from the server.
      if (response.ok) {
        // Resets form fields and refreshes the todo list on successful addition.
        setTitle("");
        setDescription("");
        setPriority("Medium");
        setDueDate("");
        onNewTodo(); // Refresh the todo list
        toast.success("Todo added successfully!");
      } else {
        // Throws an error if the server response is not okay.
        throw new Error("Failed to add todo");
      }
    } catch (error) {
      // Catches and shows any error during the fetch operation.
      toast.error("Error adding todo");
    } finally {
      setIsLoading(false); // Disables the loading state once the operation is complete.
    }
  };

  // Form UI rendering
  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 items-center">
      {/* Input fields and submit button with appropriate accessibility labels */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
        className="border border-gray-300 rounded px-2 py-1 flex-grow"
        disabled={isLoading} // Disable input when loading
        aria-label="Todo title"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border border-gray-300 rounded px-2 py-1"
        disabled={isLoading}
        aria-label="Todo description"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1"
        disabled={isLoading}
        aria-label="Todo priority"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1"
        disabled={isLoading}
        aria-label="Todo due date"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded px-4 py-1"
        disabled={isLoading}
        aria-label="Add todo"
      >
        {isLoading ? <LoadingSpinner /> : "Add"}
      </button>
    </form>
  );
};

export default AddTodoForm;
