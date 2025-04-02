// src/components/MergeSortVisualization/mergeSortAlgorithm.js
// Extracted algorithm logic

export const generateSortingSteps = (array) => {
  const steps = [];
  const arrCopy = [...array];
  const tempArray = [...array];
  const subarrays = [];

  // Helper function to add step
  const addStep = (
    type,
    arrState,
    start,
    end,
    left,
    right,
    compIndices,
    replIndices,
    subArraysState,
    explanation
  ) => {
    steps.push({
      type,
      array: [...arrState],
      divideIndices: [start, end],
      mergeIndices: [left, right],
      comparing: compIndices ? [...compIndices] : [],
      replacing: replIndices ? [...replIndices] : [],
      subArrays: subArraysState ? [...subArraysState] : [],
      explanation,
    });
  };

  // Merge sort implementation
  const mergeSort = (arr, temp, start, end) => {
    // Base case
    if (start >= end) {
      if (start === end) {
        // Single element is already sorted
        addStep(
          "BASE_CASE",
          arr,
          start,
          end,
          -1,
          -1,
          [],
          [],
          subarrays,
          `Base case reached: Subarray [${arr[start]}] at index ${start} is already sorted`
        );
      }
      return;
    }

    // Find the middle index
    const mid = Math.floor((start + end) / 2);

    // Add step for division
    addStep(
      "DIVIDE",
      arr,
      start,
      end,
      start,
      mid,
      [],
      [],
      subarrays,
      `Dividing array [${arr.slice(start, end + 1)}] into [${arr.slice(
        start,
        mid + 1
      )}] and [${arr.slice(mid + 1, end + 1)}]`
    );

    // Track the current subarrays for visualization
    subarrays.push({
      start: start,
      end: end,
      level: getDepth(start, end, arr.length),
    });

    // Recursively sort left half
    mergeSort(arr, temp, start, mid);

    // Recursively sort right half
    mergeSort(arr, temp, mid + 1, end);

    // Merge the sorted halves
    merge(arr, temp, start, mid, end);

    // Remove the current subarray after merging
    const subIndex = subarrays.findIndex(
      (sub) => sub.start === start && sub.end === end
    );
    if (subIndex !== -1) {
      subarrays.splice(subIndex, 1);
    }
  };

  // Calculate the depth level of recursion for visualization
  const getDepth = (start, end, length) => {
    let size = end - start + 1;
    let depth = 0;
    let maxSize = length;

    while (maxSize > size) {
      maxSize = Math.floor(maxSize / 2);
      depth++;
    }

    return depth;
  };

  // Merge function
  const merge = (arr, temp, start, mid, end) => {
    // Add step for merging
    addStep(
      "MERGE_START",
      arr,
      start,
      end,
      start,
      mid + 1,
      [],
      [],
      subarrays,
      `Starting merge of subarrays [${arr.slice(
        start,
        mid + 1
      )}] and [${arr.slice(mid + 1, end + 1)}]`
    );

    // Copy array for merging
    for (let i = start; i <= end; i++) {
      temp[i] = arr[i];
    }

    // Merge process
    let i = start; // Left subarray index
    let j = mid + 1; // Right subarray index
    let k = start; // Combined array index

    while (i <= mid && j <= end) {
      // Compare elements
      addStep(
        "COMPARE",
        arr,
        start,
        end,
        i,
        j,
        [i, j],
        [],
        subarrays,
        `Comparing ${temp[i]} at index ${i} with ${temp[j]} at index ${j}`
      );

      if (temp[i] <= temp[j]) {
        // Element from left subarray is smaller or equal
        addStep(
          "REPLACE",
          arr,
          start,
          end,
          i,
          j,
          [],
          [k],
          subarrays,
          `${temp[i]} ≤ ${temp[j]}, placing ${temp[i]} at index ${k}`
        );
        arr[k] = temp[i];
        i++;
      } else {
        // Element from right subarray is smaller
        addStep(
          "REPLACE",
          arr,
          start,
          end,
          i,
          j,
          [],
          [k],
          subarrays,
          `${temp[i]} > ${temp[j]}, placing ${temp[j]} at index ${k}`
        );
        arr[k] = temp[j];
        j++;
      }
      k++;
    }

    // Copy remaining elements from left subarray
    while (i <= mid) {
      addStep(
        "COPY_LEFT",
        arr,
        start,
        end,
        i,
        -1,
        [],
        [k],
        subarrays,
        `Copying remaining element ${temp[i]} from left subarray to index ${k}`
      );
      arr[k] = temp[i];
      i++;
      k++;
    }

    // Copy remaining elements from right subarray
    while (j <= end) {
      addStep(
        "COPY_RIGHT",
        arr,
        start,
        end,
        -1,
        j,
        [],
        [k],
        subarrays,
        `Copying remaining element ${temp[j]} from right subarray to index ${k}`
      );
      arr[k] = temp[j];
      j++;
      k++;
    }

    // Add step for completed merge
    addStep(
      "MERGE_COMPLETE",
      arr,
      start,
      end,
      -1,
      -1,
      [],
      [],
      subarrays,
      `Merge complete: Subarray from index ${start} to ${end} is now sorted: [${arr.slice(
        start,
        end + 1
      )}]`
    );
  };

  // Start the merge sort
  addStep(
    "START",
    arrCopy,
    0,
    arrCopy.length - 1,
    -1,
    -1,
    [],
    [],
    [],
    `Starting merge sort on array [${arrCopy}]`
  );

  mergeSort(arrCopy, tempArray, 0, arrCopy.length - 1);

  // Final sorted array
  addStep(
    "SORTED",
    arrCopy,
    -1,
    -1,
    -1,
    -1,
    [],
    [],
    [],
    `Array is fully sorted: [${arrCopy}]`
  );

  return steps;
};
