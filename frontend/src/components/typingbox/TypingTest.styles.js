import styled from 'styled-components';
import { COLORS } from '../../constants';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 1rem;
  background-color: ${COLORS.authBackground}; // modified to use auth outer background
`;

export const TestWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background-color: ${COLORS.authCard}; // modified to use auth card background
  padding: 2rem; // added padding similar to auth card styling
  border-radius: 0.75rem; // added border radius
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); // added subtle shadow
`;

export const WordsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  letter-spacing: -0.5px; // Reduce overall letter spacing
`;

export const Word = styled.div`
  display: flex;
  align-items: center;
  gap: 0px; // Remove gap between characters
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  background-color: transparent;  // Removed highlight
  transition: background-color 0.2s ease;
`;

export const Character = styled.span`
  color: ${({ $correct, $incorrect }) => {
    if ($correct) return COLORS.correct;
    if ($incorrect) return COLORS.incorrect;
    return COLORS.text;
  }};
  font-size: 2rem;
  line-height: 1.5;
  position: relative;
  
  ${({ $cursor }) => $cursor && `
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 2px;
      height: 1.2em;
      background-color: ${COLORS.cursor};
      animation: blink 1s step-end infinite;
    }
  `}

  @keyframes blink {
    from, to { opacity: 1; }
    50% { opacity: 0; }
  }
`;

export const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;
