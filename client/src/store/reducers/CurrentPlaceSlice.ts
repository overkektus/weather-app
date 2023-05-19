import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPlace } from 'interfaces/Place.interface'

interface CurrentPlaceState {
  place: IPlace | null
}

const initialState: CurrentPlaceState = {
  place: null,
}

export const currentPlaceSlice = createSlice({
  name: 'currentPlace',
  initialState,
  reducers: {
    setCurrentPlace(state, action: PayloadAction<IPlace>) {
      state.place = action.payload
    },
  },
})

export default currentPlaceSlice.reducer
