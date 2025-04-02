// src/components/MergeSortVisualization/InfoPanel.jsx
import React from 'react';

const InfoPanel = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-xl font-semibold ">
      <h2 className="text-xl font-bold mb-2">How MergeSort Works?</h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li>Divide the unsorted array into n subarrays, each containing one element (divide)</li>
        <li>Repeatedly merge subarrays to produce new sorted subarrays until there is only one subarray remaining (conquer)</li>
        <li>The merging process:
          <ul className="list-disc pl-6 mt-1">
            <li>Compare the elements of two adjacent subarrays</li>
            <li>Copy the smaller element into the temporary array</li>
            <li>Repeat until all elements are processed</li>
            <li>Copy any remaining elements</li>
          </ul>
        </li>
        <li>Time Complexity: O(n log n) for all cases - best, average, and worst</li>
        <li>Space Complexity: O(n) - requires additional space for temporary arrays</li>
      </ol>
    </div>
  );
};

export default InfoPanel;