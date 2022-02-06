import React from 'react';
import range from 'lodash/range';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

interface CircularProgressbarProps { 
  value: number;
}

const CircularProgressbar: React.FC<CircularProgressbarProps> = ({ value }) => {
  return (
    <CircularProgressbarWithChildren
      value={value}
      // text={`${80}%`}
      strokeWidth={10}
      circleRatio={0.75}
      styles={buildStyles({
        rotation: 1 / 2 + 1 / 8,
        strokeLinecap: 'butt'
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
      <Separator turns={index * turns} style={style} />
    ))}
  </>
}