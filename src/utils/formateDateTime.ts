import moment from 'moment'

export const formateTime = (timestampSeconds: number): string => {
  const momentInstance = moment(timestampSeconds * 1000)
  return momentInstance.format('hh:mm')
}

export const formateDateForWeatherCard = (timestampSeconds: number): string => {
  const momentInstance = moment(timestampSeconds * 1000)
  return momentInstance.format('ddd, DD MMMM')
}

export const formateDateForForecastCard = (
  timestampSeconds: number
): string => {
  const momentInstance = moment(timestampSeconds * 1000)
  return momentInstance.format('D ddd')
}
