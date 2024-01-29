// Defines the structure for a Todo item within the application.
export interface Todo {
    // Unique identifier for the Todo item.
    _id: string;

    // Title of the Todo item, briefly describing the task.
    title: string;

    // Indicates whether the Todo item has been completed.
    completed: boolean;

    // Optional detailed description of the Todo item. Provides more information about the task.
    description?: string;

    // Optional field to denote the priority of the Todo item. Can be 'Low', 'Medium', or 'High'.
    priority?: string;

    // Optional due date for the Todo item, indicating when the task should be completed.
    dueDate?: Date;
}
