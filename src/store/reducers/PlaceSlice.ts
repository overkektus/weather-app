import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GeocodeResult } from '@googlemaps/google-maps-services-js';

interface PlaceState {
  currentPlace: GeocodeResult | null;
}

const initialState: PlaceState = {
  currentPlace: null,
}

export const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setCurrentPlace(state, action: PayloadAction<GeocodeResult>) {
      state.currentPlace = action.payload;
    },
  },
});

export default placeSlice.reducer;