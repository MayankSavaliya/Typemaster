import React from 'react';
import { COLORS } from '../../constants';

const Timer = ({ timeRemaining }) => (
  <div style={{ textAlign: 'center', marginBottom: '1rem', color: COLORS.text }}>
    Time remaining: {timeRemaining}s
  </div>
);

export default Timer;
