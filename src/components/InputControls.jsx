// src/components/MergeSortVisualization/InputControls.jsx
import React from "react";

const InputControls = ({
  inputValue,
  handleInputChange,
  generateRandomArray,
  startVisualization,
  disabled,
}) => {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter numbers separated by commas"
          className="flex-grow p-2 border border-black rounded-md"
          disabled={disabled}
        />
        <div className="flex gap-2">
          <button
            onClick={generateRandomArray}
            disabled={disabled}
            className="cursor-pointer group relative bg-blue-300 hover:bg-green-300 text-black font-semibold text-sm px-6 py-3 rounded-md transition-all duration-300 ease-in-out shadow-xl hover:shadow-lg w-56 h-12"
          >
            <div className="relative flex items-center justify-center gap-2 w-auto">
              <span class="relative inline-block overflow-hidden">
                <span class="block transition-transform duration-300 group-hover:-translate-y-full">
                  Random Array
                </span>
                <span className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                  woosh!!
                </span>
              </span>

              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45"
                viewBox="0 0 24 24"
              >
                <circle fill="currentColor" r="11" cy="12" cx="12"></circle>
                <path
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke="white"
                  d="M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5"
                ></path>
              </svg>
            </div>
          </button>
          <button
            onClick={startVisualization}
            disabled={disabled}
            className="cursor-pointer group relative bg-green-300 hover:bg-blue-300 text-black font-semibold text-sm px-6 py-3 rounded-md transition-all duration-300 ease-in-out shadow-xl hover:shadow-lg w-44 h-12"
          >
            <div className="relative flex items-center justify-center gap-2">
              <span class="relative inline-block overflow-hidden">
                <span class="block transition-transform duration-300 group-hover:-translate-y-full">
                  Initialize
                </span>
                <span className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                  Merge
                </span>
              </span>

              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45"
                viewBox="0 0 24 24"
              >
                <circle fill="currentColor" r="11" cy="12" cx="12"></circle>
                <path
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke="white"
                  d="M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputControls;
