import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GeocodeResult } from '@googlemaps/google-maps-services-js';

interface CurrentPlaceState {
  place: GeocodeResult | null
}

const initialState: CurrentPlaceState = {
  place: null
}

export const currentPlaceSlice = createSlice({
  name: 'currentPlace',
  initialState,
  reducers: {
    setCurrentPlace(state, action: PayloadAction<GeocodeResult>) {
      state.place = action.payload
    }
  },
});

export default currentPlaceSlice.reducer;