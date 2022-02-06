import React from 'react';
import range from 'lodash/range';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import * as colors from '../assets/styled-components/colors';

interface CircularProgressbarProps { 
  value: number;
}

const CircularProgressbar: React.FC<CircularProgressbarProps> = ({ value }) => {
  return (
    <CircularProgressbarWithChildren
      value={value}
      strokeWidth={10}
      circleRatio={0.75}
      styles={buildStyles({
        rotation: 1 / 2 + 1 / 8,
        strokeLinecap: 'butt',
        pathColor: colors.progressValue,
        trailColor: colors.progressBar,
      })}
    >
      <RadialSeparators
        count={8}
        style={{
          background: '#fff',
          width: '2px',
          // This needs to be equal to props.strokeWidth
          height: `${10}%`
        }}
      />
    </CircularProgressbarWithChildren>
  );
};

export default CircularProgressbar; 


interface SeparatorProps {
  style: object;
  turns: number;
}

const Separator: React.FC<SeparatorProps> = ({ turns, style }) => {
  return (
    <div
      style={{
        position: 'absolute',
        height: '100%',
        transform: `rotate(${turns}turn)`
      }}
    >
      <div style={style} />
    </div>
  );
}

interface RadialSeparatorsProps { 
  count: number;
  style: object;
}

const RadialSeparators: React.FC<RadialSeparatorsProps> = ({ count, style }) => {
  const turns = 1 / count;
  return <>
    {range(count).map(index => (
      <Separator key={index} turns={index * turns} style={style} />
    ))}
  </>
}