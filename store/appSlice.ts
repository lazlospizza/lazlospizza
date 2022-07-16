import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';

type AppState = {
  rewardsInfo: {
    blocksRemaining?: number;
    nextRarityReward?: string;
    scoreToBeat?: number;
  } | null;
  showTutorial: boolean;
};

const initialState: AppState = {
  rewardsInfo: null,
  showTutorial: false,
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
    toggleTutorial(state, { payload: showTutorial }: PayloadAction<boolean>) {
      state.showTutorial = showTutorial;
    },
  },
});

export const selectRewardsInfo = ({ app: { rewardsInfo } }: RootState) =>
  rewardsInfo;

export const selectShowTutorial = ({ app: { showTutorial } }: RootState) =>
  showTutorial;

export const { updateRewardsInfo, toggleTutorial } = appSlice.actions;

export default appSlice.reducer;
