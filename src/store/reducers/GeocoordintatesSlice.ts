import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GeocoordinatesState {
  isLoading: boolean;
  coordinates: {
    lat: string,
    lon: string
  },
  error: {
    code: number ,
    message: string
  } | null
}

const initialState: GeocoordinatesState = {
  isLoading: true,
  coordinates: { lat: '', lon: '' },
  error: null
}

interface SetCoordinatesPayload {
  lat: string,
  lon: string
}

interface SetErrorPayload {
  code: number;
  message: string;
}

export const geocoordinatesSlice = createSlice({
  name: 'geocoordinates',
  initialState,
  reducers: {
    setCoordinates(state, action: PayloadAction<SetCoordinatesPayload>) {
      state.isLoading = false;
      state.coordinates = action.payload;
    },
    setError(state, action: PayloadAction<SetErrorPayload>) {
      state.error = action.payload;
    }
  },
});

export default geocoordinatesSlice.reducer;