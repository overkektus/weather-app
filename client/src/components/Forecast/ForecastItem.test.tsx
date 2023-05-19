import * as React from 'react'
import { render, screen } from '@testing-library/react'
import ForecastItem from './ForecastItem'

describe('when rendered', () => {
  it('should present max&min temp in the forecast item', () => {
    render(
      <ForecastItem
        timestamp={1644300043}
        minTemp={18}
        maxTemp={20}
        weatherIconCode={'02d'}
      />
    )
    expect(screen.getByText(/18°C/)).toBeInTheDocument()
    expect(screen.getByText(/20°C/)).toBeInTheDocument()
  })
})
