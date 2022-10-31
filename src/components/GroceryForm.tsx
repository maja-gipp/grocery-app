import { ChangeEventHandler, FormEventHandler, useState } from "react";

interface Props {
  addNewItem: (data: { item: string; price: string; notes: string; }) => void;
}

export const GroceryForm = ({ addNewItem }: Props) => {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [notes, setNotes] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setItem(event.target.value);
  };

  const handlePriceChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPrice(event.target.value);
  };

  const handleNotesChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNotes(event.target.value);
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    const itemIsBlank = item.length === 0;
    const itemIsTooLong = item.length >= 25;

    if (itemIsBlank) {
      setError("Item cannot be blank.");
      return;
    }

    if (itemIsTooLong) {
      setError("Character limit is 25.");
      return;
    }

    setItem("");
    setPrice("");
    setError("");
    setNotes("");

    addNewItem({ item, price, notes });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        value={item}
        placeholder="Enter the items"
        onChange={handleChange}
      />

      <input
        className="input"
        type="text"
        value={price}
        placeholder="Enter the price"
        onChange={handlePriceChange}
      />

      <input
        className="input"
        type="text"
        value={notes}
        placeholder="Enter the notes"
        onChange={handleNotesChange}
      />

      <button type="submit">Add Item</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};
