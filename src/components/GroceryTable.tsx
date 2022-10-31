import { groceriesApi } from "services/groceriesApi";
import { GroceryItem } from "services/types";
import { useAppDispatch } from "state/hooks";
import { useAppSelector } from "state/selectors";
import { groceriesSlice } from "state/slices/groceries/slice";
import { Item } from "./Item";
import { ItemEdit } from "./ItemEdit";

interface Props {
  groceries: GroceryItem[];
}

export const GroceryTable = ({ groceries }: Props) => {
  const dispatch = useAppDispatch();

  const editId = useAppSelector((state) => state.groceries.editId);

  const [update] = groceriesApi.usePatchGroceryMutation();
  const [remove] = groceriesApi.useRemoveGroceryMutation();
  const [complete] = groceriesApi.useCompleteGroceryMutation();

  const updateGrocery = (value: string, editId: number) => {
    update({ id: editId, item: value });
  };

  const updateGroceryPrice = (value: string, editId: number) => {
    update({ id: editId, price: value });
  };

  const updateGroceryNotes = (value: string, editId: number) => {
    update({ id: editId, notes: value });
  };

  const handleComplete = (id: number, shouldBeComplete: boolean) => {
    complete({ id, shouldBeComplete });
  };

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th style={{ width: "70%" }}>Name</th>
          <th>Price</th>
          <th>Notes</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {groceries.map((grocery, index) => {
          if (editId === grocery.id) {
            return (
              <tr key={index}>
                <td>
                  <input type="checkbox" disabled checked={grocery.complete} />
                </td>
                <td>
                  <ItemEdit
                    value={grocery.item}
                    setValue={(value) => updateGrocery(value, editId)}
                  />
                </td>
                <td>
                  <ItemEdit
                    value={grocery.price}
                    setValue={(value) => updateGroceryPrice(value, editId)}
                  />
                </td>
                <td>
                  <ItemEdit
                    value={grocery.notes}
                    setValue={(value) => updateGroceryNotes(value, editId)}
                  />
                </td>
                <td>
                  <button disabled>Remove</button>
                  <button disabled>Edit</button>
                </td>
              </tr>
            );
          }
          return (
            <Item
              key={index}
              grocery={grocery}
              remove={remove}
              handleComplete={handleComplete}
              onEditClick={() => {
                dispatch(groceriesSlice.actions.setEditId(grocery.id));
              }}
            />
          );
        })}
        <tr>
          <td></td>
          <td></td>
          <td>
            {groceries
              .map((grocery) => {
                const value = parseInt(grocery.price);
                if (isNaN(value)) {
                  return 0;
                }
                return value;
              })
              .reduce((total, next) => total + next, 0)}
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};
