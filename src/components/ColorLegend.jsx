// src/components/MergeSortVisualization/ColorLegend.jsx
import React from 'react';

const ColorLegend = () => {
  const legendItems = [
    { color: "bg-blue-500", label: "Unsorted Elements" },
    { color: "bg-blue-400", label: "Current Subarray" },
    { color: "bg-red-500", label: "Division Boundary" },
    { color: "bg-purple-600", label: "Merge Pointers" },
    { color: "bg-yellow-500", label: "Comparing" },
    { color: "bg-green-500", label: "Placing Element" }
  ];

  return (
    <div className="mb-6 bg-white p-4 rounded-xl shadow-xl">
      <h3 className="text-lg font-semibold mb-2">Color Legend</h3>
      <div className="flex flex-wrap gap-4">
        {legendItems.map((item, index) => (
          <div className="flex items-center" key={index}>
            <div className={`w-4 h-4 ${item.color} mr-2 rounded`}></div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorLegend;