import { ChangeEventHandler, KeyboardEventHandler, useState } from "react";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

export const ItemEdit = ({ value, setValue }: Props) => {
  const [editingValue, setEditingValue] = useState(value);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => setEditingValue(event.target.value);

  const onKeyDown: KeyboardEventHandler = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      // We use onKeyDown on input element so we can assert that blur will be available
      (event.target as HTMLInputElement).blur();
    }
  };

  const onBlur: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.value.trim() === "") {
      setEditingValue(value);
    } else {
      setValue(event.target.value);
    }
  };

  return (
    <input
      type="text"
      aria-label="Field name"
      value={editingValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
};
