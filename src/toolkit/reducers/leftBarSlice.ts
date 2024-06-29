import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TLeftBarRenderIcons } from "../../interfaces";
import { VscSourceControl } from "react-icons/vsc";
import { IconType } from "react-icons/lib";

interface TState extends TLeftBarRenderIcons {}

const initialState: TState = {
  name: "source",
  icon: VscSourceControl,
  isActive: true,
};

const leftBarSlice = createSlice({
  name: "leftBar",
  initialState,
  reducers: {
    setIsActiveLeftBar: (
      state,
      actions: PayloadAction<{ icon: IconType; name: "source" | "search" }>
    ) => {
      state.icon = actions.payload.icon;
      state.name = actions.payload.name;
    },
  },
});

export const { setIsActiveLeftBar } = leftBarSlice.actions;
export default leftBarSlice.reducer;
