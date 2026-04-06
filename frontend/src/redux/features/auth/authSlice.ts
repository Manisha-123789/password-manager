import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticate: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setAuthenticate } = authSlice.actions;
export default authSlice.reducer;