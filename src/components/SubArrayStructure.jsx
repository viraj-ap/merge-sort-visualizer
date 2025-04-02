// src/components/MergeSortVisualization/SubArrayStructure.jsx
import React from 'react';

const SubArrayStructure = ({ subArrays, array }) => {
  if (subArrays.length === 0) return null;
  
  // Group subarrays by level
  const levelMap = {};
  subArrays.forEach(subArr => {
    if (!levelMap[subArr.level]) {
      levelMap[subArr.level] = [];
    }
    levelMap[subArr.level].push(subArr);
  });
  
  // Sort levels and sort subarrays within each level
  const sortedLevels = Object.keys(levelMap).sort((a, b) => a - b);
  sortedLevels.forEach(level => {
    levelMap[level].sort((a, b) => a.start - b.start);
  });
  
  return (
    <div className="mb-6 bg-white p-4 rounded shadow-xl">
      <h3 className="text-lg font-semibold mb-2">Recursive Structure</h3>
      <div className="flex flex-col gap-2">
        {sortedLevels.map(level => (
          <div key={level} className="flex gap-2 justify-center">
            {levelMap[level].map((subArr, idx) => {
              const width = (subArr.end - subArr.start + 1) / array.length * 100;
              const left = subArr.start / array.length * 100;
              
              return (
                <div 
                  key={`${level}-${idx}`} 
                  className="bg-blue-200 border border-blue-500 rounded p-1 text-xs text-center"
                  style={{
                    width: `${width}%`,
                    marginLeft: idx === 0 ? `${left}%` : '0'
                  }}
                >
                  [{array.slice(subArr.start, subArr.end + 1).join(',')}]
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubArrayStructure;