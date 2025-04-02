// src/components/MergeSortVisualization/index.jsx
// Main component that combines all subcomponents
import React, { useState, useEffect, useRef } from 'react';
import InputControls from './InputControls';
import SortingControls from './SortingControls';
import VisualizationArray from './VisualizationArray';
import ColorLegend from './ColorLegend';
import SubArrayStructure from './SubArrayStructure';
import StepInfo from './StepInfo';
import InfoPanel from './InfoPanel';
import { generateSortingSteps } from './mergeSortAlgorithm';

const MergeSortVisualization = () => {
  const [array, setArray] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [sortingSteps, setSortingSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [divideIndices, setDivideIndices] = useState([]);
  const [mergeIndices, setMergeIndices] = useState([]);
  const [comparing, setComparing] = useState([]);
  const [replacing, setReplacing] = useState([]);
  const [speed, setSpeed] = useState(500);
  const [isSorting, setIsSorting] = useState(false);
  const [explanation, setExplanation] = useState('Enter array and start visualization');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [subArrays, setSubArrays] = useState([]);
  const autoPlayRef = useRef(null);

  // Generate random array
  const generateRandomArray = () => {
    const randomArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(randomArray);
    setInputValue(randomArray.join(', '));
    resetVisualization();
  };

  // Handle input array change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Parse input array
  const parseArray = () => {
    try {
      const parsedArray = inputValue.split(',').map(item => parseInt(item.trim()));
      if (parsedArray.some(isNaN)) {
        alert('Please enter valid numbers separated by commas');
        return false;
      }
      setArray(parsedArray);
      return true;
    } catch (error) {
      alert('Error parsing input. Please enter numbers separated by commas');
      return false;
    }
  };

  // Reset visualization state
  const resetVisualization = () => {
    stopAutoPlay();
    setCurrentStep(-1);
    setDivideIndices([]);
    setMergeIndices([]);
    setComparing([]);
    setReplacing([]);
    setSubArrays([]);
    setIsSorting(false);
    setExplanation('Enter array and start visualization');
  };

  // Move to next step
  const nextStep = () => {
    if (currentStep < sortingSteps.length - 1) {
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      applyStep(sortingSteps[nextStepIndex]);
    } else {
      stopAutoPlay();
    }
  };

  // Move to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      const prevStepIndex = currentStep - 1;
      setCurrentStep(prevStepIndex);
      applyStep(sortingSteps[prevStepIndex]);
    }
  };

  // Apply a step's visualization
  const applyStep = (step) => {
    if (!step) return;
    
    setArray(step.array);
    setDivideIndices(step.divideIndices || []);
    setMergeIndices(step.mergeIndices || []);
    setComparing(step.comparing || []);
    setReplacing(step.replacing || []);
    setSubArrays(step.subArrays || []);
    setExplanation(step.explanation || '');
  };

  // Start auto-playing steps
  const startAutoPlay = () => {
    if (currentStep >= sortingSteps.length - 1) {
      setCurrentStep(-1);
    }
    setIsAutoPlaying(true);
  };

  // Stop auto-playing
  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
  };

  // Handle auto-playing effect
  useEffect(() => {
    if (isAutoPlaying && currentStep < sortingSteps.length - 1) {
      autoPlayRef.current = setTimeout(() => {
        nextStep();
      }, speed);
    } else if (currentStep >= sortingSteps.length - 1) {
      setIsAutoPlaying(false);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentStep, sortingSteps.length, speed]);

  // Start visualization
  const startVisualization = () => {
    resetVisualization();
    if (!parseArray()) return;
    
    const steps = generateSortingSteps(array);
    setSortingSteps(steps);
    setIsSorting(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto z-1">
      <h1 className="text-3xl font-bold text-center mb-6"><span className="text-green-300">Merge</span><span className="text-blue-300">Sort</span> Visualization</h1>
      
      <InputControls
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        generateRandomArray={generateRandomArray}
        startVisualization={startVisualization}
        disabled={isSorting && currentStep > -1}
      />
      
      {isSorting && (
        <>
          <StepInfo 
            currentStep={currentStep}
            totalSteps={sortingSteps.length}
            explanation={explanation}
          />
          
          <SubArrayStructure
            subArrays={subArrays}
            array={array}
          />
          
          <VisualizationArray
            array={array}
            divideIndices={divideIndices}
            mergeIndices={mergeIndices}
            comparing={comparing}
            replacing={replacing}
            subArrays={subArrays}
          />
          
          <ColorLegend />
          
          <SortingControls
            prevStep={prevStep}
            nextStep={nextStep}
            resetVisualization={resetVisualization}
            startAutoPlay={startAutoPlay}
            stopAutoPlay={stopAutoPlay}
            isAutoPlaying={isAutoPlaying}
            speed={speed}
            setSpeed={setSpeed}
            currentStep={currentStep}
            totalSteps={sortingSteps.length}
          />
        </>
      )}
      
      <InfoPanel />
    </div>
  );
};

export default MergeSortVisualization;