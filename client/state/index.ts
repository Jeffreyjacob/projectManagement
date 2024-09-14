import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface initialStateType{
    isSidebarCollapsed:boolean,
    isDarkMode:boolean
}

const initialState:initialStateType = {
    isSidebarCollapsed:false,
    isDarkMode:false
};


export const globalSice = createSlice({
    name:"global",
    initialState,
    reducers:{
      setIsSidebarCollapsed:(state,actions:PayloadAction<boolean>)=>{
           state.isSidebarCollapsed = actions.payload;
      },
      setIsDarkMode:(state,actions:PayloadAction<boolean>)=>{
          state.isDarkMode = actions.payload
      }
    }
})

export const {setIsSidebarCollapsed,setIsDarkMode} = globalSice.actions;
export default globalSice.reducer;