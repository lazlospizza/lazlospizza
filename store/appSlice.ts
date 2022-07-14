import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';

type AppState = {
  rewardsInfo: {
    blocksRemaining?: number;
    nextRarityReward?: string;
    scoreToBeat?: number;
  } | null;
};

const initialState: AppState = {
  rewardsInfo: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateRewardsInfo(
      state,
      { payload: rewardsInfo }: PayloadAction<AppState['rewardsInfo']>,
    ) {
      state.rewardsInfo = rewardsInfo;
    },
  },
});

export const selectRewardsInfo = ({ app: { rewardsInfo } }: RootState) =>
  rewardsInfo;

export const { updateRewardsInfo } = appSlice.actions;

export default appSlice.reducer;
