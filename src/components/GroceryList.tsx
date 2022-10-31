import { skipToken } from "@reduxjs/toolkit/query/react";
import { ChangeEventHandler, useEffect, useState } from "react";
import { groceriesApi } from "services/groceriesApi";
import { shopsApi } from "services/shopsApi";
import { useAppSelector } from "state/selectors";
import { GroceryForm } from "./GroceryForm";
import { GroceryTable } from "./GroceryTable";

export const GroceryList = () => {
  const listId = useAppSelector((state) => state.groceries.activeTabId);
  const editId = useAppSelector((state) => state.groceries.editId);

  const { data: groceryList } = groceriesApi.useGetGroceriesFromListQuery(
    listId ?? skipToken
  );
  const groceries = groceryList?.groceries;

  const { data: shops } = shopsApi.useGetShopsQuery();

  const [createItem] = groceriesApi.useCreateGroceryMutation();
  const [patchGroceryList] = groceriesApi.usePatchGroceryListMutation();

  const editableGrocery = groceries?.find((grocery) => grocery.id === editId);
  const completedItems = groceries?.filter(
    (grocery) => grocery.complete
  ).length;

  const addNewItem = (data: { item: string; price: string; notes: string }) => {
    if (listId === null) {
      return;
    }
    createItem({
      item: data.item,
      price: data.price,
      notes: data.notes,
      groceryListId: listId,
    });
  };

  const [selectedShopId, selectShopId] = useState<string | number>("")

  useEffect(() => {
    if (groceryList === undefined || groceryList.shopId === undefined) {
      return;
    }
    selectShopId(groceryList.shopId)
  }, [groceryList])

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const shopId = parseInt(e.target.value);
    if (listId === null) {
      return;
    }
    selectShopId(shopId);
    patchGroceryList({ id: listId, shopId })
  }

  return (
    <div className="App">
      <h1>Grocery List</h1>
      <select value={selectedShopId} onChange={handleSelectChange}>
        <option disabled value="">
          {" "}
          -- select an option --{" "}
        </option>
        {shops?.map((shop) => {
          return (
            <option key={shop.id} value={shop.id}>
              {shop.name}
            </option>
          );
        })}
      </select>

      <div className="total">
        Total: {groceries?.length}, {completedItems}
      </div>

      <GroceryForm key={editableGrocery?.id} addNewItem={addNewItem} />
      {groceries && <GroceryTable groceries={groceries} />}
    </div>
  );
};
