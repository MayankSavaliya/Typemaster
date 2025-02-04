import React from 'react';
import { WordsContainer as StyledWordsContainer, Word, Character } from './TypingTest.styles';

const WordsContainer = ({ words, currentWordIndex, input, typedChars, errors }) => {
  return (
    <StyledWordsContainer>
      {words.map((word, wordIndex) => (
        <Word
          key={wordIndex}
          $error={Object.keys(errors).some(key => key.startsWith(`${wordIndex}-`) && errors[key])}
        >
          {word.split('').map((char, charIndex) => (
            <Character
              key={charIndex}
              $active={wordIndex === currentWordIndex && charIndex === input.length}
              $correct={typedChars[`${wordIndex}-${charIndex}`]}
              $incorrect={errors[`${wordIndex}-${charIndex}`]}
              $cursor={wordIndex === currentWordIndex && charIndex === input.length}
            >
              {char}
            </Character>
          ))}
          {wordIndex === currentWordIndex && input.length > word.length && (
            <>
              {input.slice(word.length).split('').map((char, i) => (
                <Character key={`extra-${i}`} $incorrect={true} $cursor={false}>
                  {char}
                </Character>
              ))}
              <Character key="extra-cursor" $cursor={true} style={{ width: '2px' }}>
                &nbsp;
              </Character>
            </>
          )}
        </Word>
      ))}
    </StyledWordsContainer>
  );
};

export default WordsContainer;
