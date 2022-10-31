import { GroceryItem } from "services/types";

interface Props {
  grocery: GroceryItem;
  onEditClick: () => void;
  remove: (groceryId: number) => void;
  handleComplete: (groceryId: number, isChecked: boolean) => void;
}

export const Item = ({
  grocery,
  remove,
  handleComplete,
  onEditClick,
}: Props) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={grocery.complete}
          onChange={(event) => handleComplete(grocery.id, event.target.checked)}
        />
      </td>
      <td>{grocery.item}</td>
      <td>{grocery.price}</td>
      <td>{grocery.notes}</td>
      <td style={{ textAlign: "right" }}>
        <button onClick={() => remove(grocery.id)}>Remove</button>
        <button onClick={onEditClick}>Edit</button>
      </td>
    </tr>
  );
};
