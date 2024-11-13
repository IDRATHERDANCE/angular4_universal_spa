// import * as Redux from 'redux';
// const { combineReducers } = Redux;
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '../store/state.interface';
import InitialSate from '../store/initial.state';
// import data from './data.reducer';


// const rootReducer = combineReducers<AppState>({
//   applicationData: data
// });

// export default rootReducer;

import { createSlice } from "@reduxjs/toolkit";

export const appDataSlice = createSlice({
  name: "appData",
  initialState: InitialSate,
  reducers: {
    dataChange: (state: AppState, action: PayloadAction<any>) => {
      const { data, position } = action.payload
      state.applicationData.routeData[position] = [data];
    },
    menuChange: (state: AppState, action: PayloadAction<any>) => {
      const { data } = action.payload
      state.applicationData.subMenu = data;
    },
    menuPresent: (state, action: PayloadAction<any>) => {
      const { data } = action.payload
      state.applicationData.menuPresent = data;
    },
    popUp(state, action: PayloadAction<any>) {
      const { data } = action.payload
      state.applicationData.popUp = data;
    }
  },
});

// Action creators are generated for each case reducer function
export const { dataChange, menuChange, menuPresent, popUp } = appDataSlice.actions;

export default appDataSlice.reducer;
