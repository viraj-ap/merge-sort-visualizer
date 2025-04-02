// src/components/MergeSortVisualization/VisualizationArray.jsx
import React from 'react';

const VisualizationArray = ({ array, divideIndices, mergeIndices, comparing, replacing, subArrays }) => {
  // Calculate maximum value for scaling
  const getMaxValue = () => {
    return Math.max(...array, 1);
  };

  // Get element style based on its state
  const getElementStyle = (index) => {
    // Base style
    let bgColor = "bg-blue-500";
    
    // Check if this index is part of any active subarray
    const isInActiveSubarray = subArrays.some(
      subArr => index >= subArr.start && index <= subArr.end
    );
    
    // Special states with priority order
    if (replacing.includes(index)) {
      bgColor = "bg-green-500";
    } else if (comparing.includes(index)) {
      bgColor = "bg-yellow-500";
    } else if (mergeIndices[0] === index || mergeIndices[1] === index) {
      bgColor = "bg-purple-600";
    } else if (divideIndices[0] === index || divideIndices[1] === index) {
      bgColor = "bg-red-500";
    } else if (isInActiveSubarray) {
      // Lighter blue for elements in active subarrays
      bgColor = "bg-blue-400";
    }
    
    return bgColor;
  };

  return (
    <div className="flex justify-center items-end gap-2 h-64 mb-8 bg-white p-4 rounded-xl shadow-xl relative">
      {array.map((value, index) => {
        const maxValue = getMaxValue();
        // Calculate height as percentage of container height
        const heightPercentage = (value / maxValue) * 80;
        
        return (
          <div
            key={index}
            className={`flex items-center justify-center text-white font-bold rounded transition-all duration-300 ${getElementStyle(index)}`}
            style={{ 
              height: `${heightPercentage}%`,
              width: `${100 / Math.max(array.length, 1)}%`,
              maxWidth: '60px',
              minWidth: '30px',
              minHeight: '35px'
            }}
          >
            {value}
          </div>
        );
      })}
    </div>
  );
};

export default VisualizationArray;