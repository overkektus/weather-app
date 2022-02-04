import { Units } from '../services/WeatherService';

export const formateWindSpeed = (speed: number, units?: Units): string => {
  let unitSign;

  switch(units) {
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
}