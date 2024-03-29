import { Units } from 'interfaces/Units.type'

export const formateTemperature = (
  temp: number,
  units?: Units,
  precision: number = 0
): string => {
  let unitSign

  const roundedTemp = Number(temp.toFixed(precision))

  switch (units) {
    case 'metric':
      unitSign = '°C'
      break
    case 'imperial':
      unitSign = '°F'
      break
    default:
      unitSign = ''
  }

  const formattedTemperature =
    roundedTemp > 0 ? `+${roundedTemp}${unitSign}` : `${roundedTemp}${unitSign}`

  return formattedTemperature
}
