// Importing React to enable JSX syntax
import React from "react";

/**
 * LoadingSpinner component
 *
 * A simple visual component to indicate loading or processing state.
 * It renders a spinning circle animation, typically used while waiting
 * for data to load or an action to complete.
 *
 * Usage:
 * <LoadingSpinner />
 */
const LoadingSpinner: React.FC = () => (
  // Container div for centering the spinner horizontally and vertically
  <div className="flex justify-center items-center">
    {/* Spinner Element */}
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900">
      {/* 
        This div represents the spinning element. 
        It uses Tailwind CSS classes for:
        - Animation: animate-spin for continuous rotation
        - Shape: rounded-full for a circular shape
        - Size: h-12 (height) and w-12 (width) for dimensions
        - Border: border-b-2 for border thickness and border-gray-900 for color
      */}
    </div>
  </div>
);

export default LoadingSpinner;
