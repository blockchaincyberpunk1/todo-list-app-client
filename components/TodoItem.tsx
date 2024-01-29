import React, { useState } from "react";
import { Todo } from "../types/todo";
import { toast } from "react-toastify";

// Define props for TodoItem component
interface TodoItemProps {
  todo: Todo; // Todo item data
  refreshTodos: () => void; // Callback to refresh the todo list
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, refreshTodos }) => {
  // Add a console log here to inspect the todo item
  //console.log("Todo item data:", todo);
  // State hooks for edit mode and edited values
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [editedPriority, setEditedPriority] = useState(todo.priority);

  // Convert dueDate from string to Date object and format it
  const formattedDueDate = todo.dueDate
    ? new Date(todo.dueDate).toLocaleDateString("en-CA")
    : "";
  const [editedDueDate, setEditedDueDate] = useState(formattedDueDate);

  // Handle delete operation
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://todo-list-app-backend-03d4541305dd.herokuapp.com/${todo._id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        refreshTodos();
        toast.success("Todo deleted successfully!");
      } else {
        throw new Error("Failed to delete todo");
      }
    } catch (error) {
      toast.error("Error deleting todo");
    }
  };

  // Handle update operation
  const handleUpdate = async () => {
    console.log("Updating Todo with ID:", todo._id); // Log the ID being used
    // Prepare the data for updating
    const updatedTodo = {
      title: editedTitle,
      completed: todo.completed, // Assuming 'completed' status is not edited here
      description: editedDescription,
      priority: editedPriority,
      // Convert the edited due date back to a format suitable for your backend
      dueDate: editedDueDate ? new Date(editedDueDate).toISOString() : null,
    };

    try {
      const response = await fetch(
        `https://todo-list-app-backend-03d4541305dd.herokuapp.com/api/todos/${todo._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTodo),
        }
      );

      if (response.ok) {
        setIsEditing(false);
        refreshTodos(); // Refresh the todo list to show updated data
        toast.success("Todo updated successfully!");
      } else {
        throw new Error("Failed to update todo");
      }
    } catch (error) {
      toast.error("Error updating todo");
    }
  };

  // Cancel edit operation and reset to original values
  const cancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description || "");
    setEditedPriority(todo.priority || "Medium");
    // Convert dueDate from string to Date object and format it
    // This ensures that the date is always treated correctly
    const resetDueDate = todo.dueDate
      ? new Date(todo.dueDate).toLocaleDateString("en-CA")
      : "";
    setEditedDueDate(resetDueDate);
  };

  // Function to toggle the completion status of the todo
  const handleComplete = async () => {
    try {
      const updatedTodo = {
        ...todo,
        completed: !todo.completed,
      };

      const response = await fetch(
        `https://todo-list-app-backend-03d4541305dd.herokuapp.com/api/todos/${todo._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTodo),
        }
      );

      if (response.ok) {
        refreshTodos(); // Refresh the todo list to show updated data
        toast.success("Todo completion status updated!");
      } else {
        throw new Error("Failed to update todo completion status");
      }
    } catch (error) {
      toast.error("Error updating todo completion status");
    }
  };
  // Render the TodoItem component
  return (
    <div className="flex justify-between items-center p-4 border border-gray-200 rounded">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Title"
            className="border border-gray-300 rounded px-2 py-1 flex-grow"
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Description"
            className="border border-gray-300 rounded px-2 py-1 flex-grow"
          />
          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 flex-grow"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 flex-grow"
          />
        </>
      ) : (
        <>
          <div className={`${todo.completed ? "line-through" : ""}`}>
            <span>{todo.title}</span>
            {todo.description && <p>Description: {todo.description}</p>}
            {todo.priority && <p>Priority: {todo.priority}</p>}
            {todo.dueDate && <p>Due Date: {formattedDueDate}</p>}
          </div>
        </>
      )}

      <div className="flex space-x-2">
        {isEditing ? (
          <>
            {/* Save and Cancel buttons */}
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white rounded px-4 py-1"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="bg-gray-500 text-white rounded px-4 py-1"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {/* Complete button */}
            <button
              onClick={handleComplete}
              className={`px-4 py-1 rounded text-white ${
                todo.completed ? "bg-green-500" : "bg-gray-500"
              }`}
            >
              {todo.completed ? "Completed" : "Mark as Complete"}
            </button>
            {/* Edit and Delete buttons */}
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white rounded px-4 py-1"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white rounded px-4 py-1"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
