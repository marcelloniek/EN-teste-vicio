"use client";

import { useState } from 'react';

const questions = [
  "I have difficulty controlling or stopping habits or behaviors that I recognize as harmful to my life.",
  "When I try to stop or reduce certain behaviors, I experience anxiety, irritation, or significant emotional discomfort.",
  "I've had family, social, or professional problems directly related to repetitive behaviors or dependencies.",
  "I spend a significant part of my day thinking about or planning certain behaviors, even knowing they aren't healthy.",
  "I've tried to stop a particular behavior multiple times but always compulsively return to the same habit.",
  "Recently, my compulsive behaviors or addictions have made me seriously consider taking my own life or harming myself.", // FLAG
  "I feel significant shame or guilt about my compulsive or addictive behaviors.",
  "I've noticed physical or financial losses due to repetitive behaviors or dependency.",
  "I often lie to or hide my habits or addictions from those close to me for fear of judgment or reprimand.",
  "Even though I know I need help, I find it extremely difficult to ask for assistance or admit my problem to someone."
];

export default function AddictionTest() {
  const [responses, setResponses] = useState(Array(10).fill(0));
  const [result, setResult] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const recordResponse = (value) => {
    const newResponses = [...responses];
    newResponses[currentIndex] = value;
    setResponses(newResponses);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      calculateResult(newResponses);
    }
  };

  const calculateResult = (responses) => {
    if (responses[5] >= 3) { // FLAG
      setResult("RED");
    } else {
      const total = responses.reduce((a, b) => a + b, 0);
      if (total <= 20) setResult("GREEN");
      else if (total <= 35) setResult("YELLOW");
      else setResult("RED");
    }
  };

  const resetTest = () => {
    setResponses(Array(10).fill(0));
    setResult(null);
    setCurrentIndex(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md text-gray-900 dark:text-gray-100">
      {!result ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Addiction Test</h2>
          <p className="mb-4">{questions[currentIndex]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => recordResponse(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">Question {currentIndex + 1} of {questions.length}</p>
        </>
      ) : (
        <>
          
          <h2 className="text-xl font-semibold mb-4 text-center">Result: {result}</h2>
          <img
            src={
              result === "GREEN"
                ? "/images/semaforo-verde.png"
                : result === "YELLOW"
                ? "/images/semaforo-amarelo.png"
                : "/images/semaforo-vermelho.png"
            }
            alt={`Traffic light: ${result}`}
            className="w-40 h-auto mx-auto mb-4"
          />
          {result === "GREEN" && (
            <p className="text-center">You handle this topic very well and are emotionally well-adjusted. You could greatly help others in need.</p>
          )}
          {result === "YELLOW" && (
            <p className="text-center">There are clear signs of emotional difficulties that need attention but can be overcome with determination and help.</p>
          )}
          {result === "RED" && (
            <p className="text-center">Your emotional issues with this topic require professional assistance. Please promptly seek help from a doctor or psychologist.</p>
          )}
          <button
            className="mt-6 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700 block mx-auto"
            onClick={resetTest}
          >
            Retake Test
          </button>
    
        </>
      )}
    </div>
  );
}
