import React from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { COLORS } from '../../constants';

const StatisticsWrapper = styled.div`
  padding: 2rem;
  border-radius: 12px;
  background: ${COLORS.authCard};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
`;

const StatBox = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  background: ${props => props.$highlight ? COLORS.primary + '15' : COLORS.background};
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${COLORS.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${COLORS.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ChartContainer = styled.div`
  height: 300px;
  margin-top: 2rem;
  padding: 1rem;
  background: ${COLORS.background};
  border-radius: 8px;
`;

const CustomTooltip = styled.div`
  background: ${COLORS.authCard};
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TestStatistics = ({ wpmHistory, totalTime, totalChars }) => {
  const finalWpm = wpmHistory[wpmHistory.length - 1] || 0;
  const charsPerMinute = Math.round(totalChars / (totalTime / 60));

  // Only include data points within the time limit
  const data = wpmHistory
    .slice(0, totalTime)
    .map((wpm, index) => ({
      time: index + 1,
      wpm: wpm,
    }));

  const CustomTooltipContent = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <CustomTooltip>
          <p>Time: {payload[0].payload.time}s</p>
          <p>WPM: {payload[0].value}</p>
        </CustomTooltip>
      );
    }
    return null;
  };

  return (
    <StatisticsWrapper>
      <StatsGrid>
        <StatBox $highlight>
          <StatValue>{finalWpm}</StatValue>
          <StatLabel>Words per minute</StatLabel>
        </StatBox>
        <StatBox>
          <StatValue>{totalTime}</StatValue>
          <StatLabel>Test Duration (s)</StatLabel>
        </StatBox>
        <StatBox>
          <StatValue>{charsPerMinute}</StatValue>
          <StatLabel>Characters per minute</StatLabel>
        </StatBox>
      </StatsGrid>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.textSecondary + '30'} />
            <XAxis 
              dataKey="time" 
              stroke={COLORS.textSecondary}
              label={{ value: 'Time (seconds)', position: 'bottom', style: { fill: COLORS.textSecondary } }}
            />
            <YAxis
              stroke={COLORS.textSecondary}
              label={{ value: 'WPM', angle: -90, position: 'left', style: { fill: COLORS.textSecondary } }}
            />
            <Tooltip content={<CustomTooltipContent />} />
            <Line
              type="monotone"
              dataKey="wpm"
              stroke={COLORS.primary}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8, fill: COLORS.primary }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </StatisticsWrapper>
  );
};

export default TestStatistics;
