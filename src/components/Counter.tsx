import { useAppDispatch } from "state/hooks";
import { useAppSelector } from "state/selectors";
import { countingSlice } from "state/slices/counting/slice";

export const Counter = () => {
  const dispatch = useAppDispatch();

  const counterValue = useAppSelector((state) => state.counting.counter);

  return (
    <div>
      <h1>Counter: {counterValue}</h1>
      <button onClick={() => dispatch(countingSlice.actions.increment())}>
        increment
      </button>
      <button onClick={() => dispatch(countingSlice.actions.decrement())}>
        decrement
      </button>
      <button onClick={() => dispatch(countingSlice.actions.incrementBy(13))}>
        incrementBy
      </button>
      <button onClick={() => dispatch(countingSlice.actions.decrementBy(7))}>
        decrementBy
      </button>
      <hr />
    </div>
  );
};
