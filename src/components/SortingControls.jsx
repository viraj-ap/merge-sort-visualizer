// src/components/MergeSortVisualization/SortingControls.jsx
import React from 'react';

const SortingControls = ({ 
  prevStep, 
  nextStep, 
  resetVisualization, 
  startAutoPlay, 
  stopAutoPlay, 
  isAutoPlaying,
  speed,
  setSpeed,
  currentStep,
  totalSteps
}) => {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button 
          onClick={prevStep}
          disabled={currentStep <= 0}
          className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white p-2 rounded"
        >
          Previous Step
        </button>
        
        {isAutoPlaying ? (
          <button 
            onClick={stopAutoPlay}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
          >
            Pause
          </button>
        ) : (
          <button 
            onClick={startAutoPlay}
            disabled={currentStep >= totalSteps - 1}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white p-2 rounded-md"
          >
            Auto Play
          </button>
        )}
        
        <button 
          onClick={nextStep}
          disabled={currentStep >= totalSteps - 1}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-2 rounded-md"
        >
          Next Step
        </button>
        
        <button 
          onClick={resetVisualization}
          className="bg-gray-700 hover:bg-gray-800 text-white p-2 rounded-md"
        >
          Reset
        </button>
      </div>
      
      <div className="flex items-center justify-center gap-4 mb-6">
        <span>Speed:</span>
        <input
          type="range"
          min="100"
          max="2000"
          step="100"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          className="w-64"
        />
        <span>{speed}ms</span>
      </div>
    </>
  );
};

export default SortingControls;