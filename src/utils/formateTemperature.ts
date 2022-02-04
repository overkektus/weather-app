import { Units } from '../services/WeatherService';

export const formateTemperature = (temp: number, units?: Units): string => {
  let unitSign;

  const roundedTemp = Number(temp.toFixed(1));
  
  switch(units) {
  case 'metric':
    unitSign = '°C';
    break;
  case 'imperial':
    unitSign = '°F';
    break;
  default:
    unitSign = '';
  }

  const formattedTemperature = roundedTemp > 0 ? `+${roundedTemp}${unitSign}` : `${roundedTemp}${unitSign}`;

  return formattedTemperature;
}