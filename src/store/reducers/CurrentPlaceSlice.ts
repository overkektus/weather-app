import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { GeocodeResult } from '@googlemaps/google-maps-services-js';
import { IPlace } from 'services/BackendService';

interface CurrentPlaceState {
  place: IPlace | null
}

const initialState: CurrentPlaceState = {
  place: null
}

export const currentPlaceSlice = createSlice({
  name: 'currentPlace',
  initialState,
  reducers: {
    setCurrentPlace(state, action: PayloadAction<IPlace>) {
      state.place = action.payload
    }
  },
});

export default currentPlaceSlice.reducer;