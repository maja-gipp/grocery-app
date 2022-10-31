import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";
import { useCallback } from "react";
import { groceriesSlice } from "./slices/groceries/slice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useActivateTab = () => {
  const dispatch = useDispatch();

  return useCallback(
    (tabId: number) => dispatch(groceriesSlice.actions.setActiveTabId(tabId)),
    [dispatch]
  );
};
