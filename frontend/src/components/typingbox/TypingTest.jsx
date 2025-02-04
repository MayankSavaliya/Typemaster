import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Container, TestWrapper, HiddenInput } from './TypingTest.styles';
import { WORD_LIST, COLORS } from '../../constants';
import { generateRandomWords } from '../../utils/wordUtils';
import Timer from './Timer';
import WordsContainer from './WordsContainer';
import TestStatistics from './TestStatistics';

const TypingTest = ({ initialWords, timeLimit, onComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [hasStarted, setHasStarted] = useState(false);
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typedChars, setTypedChars] = useState({});
  const [input, setInput] = useState('');
  const [errors, setErrors] = useState({});
  const [testComplete, setTestComplete] = useState(false);
  // New states for statistics
  const [totalCharsTyped, setTotalCharsTyped] = useState(0);
  const totalCharsRef = useRef(0); // New ref to hold the latest total chars count
  const [wpmHistory, setWpmHistory] = useState([]);
  
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    setWords(initialWords || generateRandomWords(WORD_LIST));
    window.addEventListener('click', focusInput);
    return () => window.removeEventListener('click', focusInput);
  }, [initialWords]);

  const focusInput = () => inputRef.current?.focus();

  // Move WPM calculation to useEffect
  useEffect(() => {
    if (hasStarted && !testComplete) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTestComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [hasStarted, testComplete]);

  // Calculate WPM separately
  useEffect(() => {
    if (hasStarted && !testComplete) {
      const elapsedTimeInMinutes = (timeLimit - timeRemaining) / 60 || 1/60;
      const wpm = Math.round((totalCharsRef.current / 5) / elapsedTimeInMinutes);
      setWpmHistory(prev => [...prev, wpm]);
    }
  }, [timeRemaining, hasStarted, testComplete, timeLimit]);

  const handleInput = (e) => {
    if (testComplete) return;
    
    const value = e.target.value;
    const currentWord = words[currentWordIndex];
    
    // Update total characters typed and the ref
    const diff = Math.max(0, value.length - input.length);
    setTotalCharsTyped(prev => {
      const newTotal = prev + diff;
      totalCharsRef.current = newTotal; // update the ref with the latest value
      return newTotal;
    });
    
    if (!hasStarted && value.length > 0) {
      setHasStarted(true);
    }
    
    if (value.length < input.length) {
      setInput(value);
      setCurrentCharIndex(value.length);
      return;
    }
    
    const newChar = value[value.length - 1];
    
    if (input.length >= currentWord.length) {
      if (newChar === ' ') {
        handleWordComplete(input);
      } else {
        setInput(value);
        const extraIndex = input.length - currentWord.length;
        setTypedChars(prev => ({
          ...prev,
          [`${currentWordIndex}-extra-${extraIndex}`]: false
        }));
      }
      return;
    }
    
    if (newChar === ' ') {
      const trimmedValue = value.trim();
      if (trimmedValue.length === currentWord.length) {
        handleWordComplete(trimmedValue);
      }
      return;
    }
    
    const expectedChar = currentWord[currentCharIndex];
    if (newChar === expectedChar) {
      setInput(value);
      setTypedChars(prev => ({
        ...prev,
        [`${currentWordIndex}-${currentCharIndex}`]: true
      }));
      setCurrentCharIndex(value.length);
    } else {
      setTypedChars(prev => ({
        ...prev,
        [`${currentWordIndex}-${currentCharIndex}`]: false
      }));
      setErrors(prev => ({
        ...prev,
        [`${currentWordIndex}-${currentCharIndex}`]: true
      }));
    }
  };

  const handleWordComplete = (typedWord) => {
    const currentWord = words[currentWordIndex];
    const wordLength = Math.max(currentWord.length, typedWord.length);
    
    for (let i = 0; i < wordLength; i++) {
      setErrors(prev => ({
        ...prev,
        [`${currentWordIndex}-${i}`]: typedWord[i] !== currentWord[i]
      }));
    }

    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setCurrentCharIndex(0);
      setInput('');
    } else {
      handleTestComplete();
    }
  };

  const handleTestComplete = () => {
    clearInterval(timerRef.current);
    setTestComplete(true);
    onComplete?.();
  };

  if (!words.length) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <TestWrapper>
        {testComplete ? (
          <TestStatistics 
            wpmHistory={wpmHistory}
            totalTime={timeLimit - timeRemaining}
            totalChars={totalCharsTyped}
            errors={errors}
          />
        ) : (
          <>
            <Timer timeRemaining={timeRemaining} />
            <WordsContainer
              words={words}
              currentWordIndex={currentWordIndex}
              input={input}
              typedChars={typedChars}
              errors={errors}
            />
            <HiddenInput
              ref={inputRef}
              value={input}
              onChange={handleInput}
              autoFocus
              disabled={testComplete}
            />
          </>
        )}
      </TestWrapper>
    </Container>
  );
};

TypingTest.propTypes = {
  initialWords: PropTypes.arrayOf(PropTypes.string),
  timeLimit: PropTypes.number,
  onComplete: PropTypes.func
};

export default TypingTest;
