import { Units } from 'services/BackendService';

export const formateWindSpeed = (speed: number, units?: Units): string => {
  let unitSign;

  switch (units) {
  case 'metric':
    unitSign = 'm/s';
    break;
  case 'imperial':
    unitSign = 'm/h';
    break;
  default:
    unitSign = '';
  }

  const formattedWindSpeed = `${speed}${unitSign}`;

  return formattedWindSpeed;
};

const maxDisplayedWindSpeedmps = 20;
const maxDisplayedWindSpeedMpH = 45;

export const getWindSpeedPercent = (
  windSpeed: number,
  units?: Units
): number => {
  switch (units) {
  case 'metric':
    return (windSpeed * 100) / maxDisplayedWindSpeedmps;
  case 'imperial':
    return (windSpeed * 100) / maxDisplayedWindSpeedMpH;
  default:
    return (windSpeed * 100) / maxDisplayedWindSpeedmps;
  }
};
