import { createSelector } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { groceriesApi } from "services/groceriesApi";
import { RootState } from "./store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export const selectTabs = (state: RootState) =>
  groceriesApi.endpoints.getGroceryLists.select()(state).data;

const selectActiveTabId = (state: RootState) =>
  state.groceries.activeTabId

export const selectActiveTab = createSelector([selectTabs, selectActiveTabId], (tabs, activeTabId) => {
  return tabs?.find(tab => tab.id === activeTabId)
})