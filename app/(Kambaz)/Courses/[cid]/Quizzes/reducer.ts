/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as any,
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, { payload: quizzes }) => {
      state.quizzes = quizzes;
    },
  },
});
export const { setQuizzes } = quizzesSlice.actions;
export default quizzesSlice.reducer;
