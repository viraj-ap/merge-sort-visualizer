// src/components/MergeSortVisualization/StepInfo.jsx
import React from 'react';

const StepInfo = ({ currentStep, totalSteps, explanation }) => {
  return (
    <div className="mb-8 bg-white p-4 rounded-xl shadow-xl">
      <div className="text-lg font-semibold mb-2">Step {currentStep + 1} of {totalSteps}</div>
      <div className="p-4 bg-gray-100 rounded">
        {explanation}
      </div>
    </div>
  );
};

export default StepInfo;