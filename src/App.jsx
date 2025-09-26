import { useReducer } from "react";
export default function App() {
  function reducer(state, action) {
    const { past, present, future } = state;
    switch (action.type) {
      case "increment":
        return { past: [...past, present], present: present + 1, future: [] };
      case "decrement":
        return { past: [...past, present], present: present - 1, future: [] };
      case "reset":
        return { past: [...past, present], present: 0, future: [] };
      case "undo":
        if (past.length === 0) return state;
        return {
          past: past.slice(0, -1),
          present: past[past.length - 1],
          future: [present, ...future],
        };
      case "redo":
        if (future.length === 0) return state;
        return {
          past: [...past, present],
          present: future[0],
          future: future.slice(1),
        };
      default:
        throw new Error("Unknown action");
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    past: [],
    present: 0,
    future: [],
  });
  return (
    <div className="p-6 text-center">
      {" "}
      <h1 className="text-2xl font-bold">Count: {state.present}</h1>
      <button
        onClick={() => dispatch({ type: "increment" })}
        className="px-4 py-2 bg-blue-500 text-white rounded m-2"
      >
        {" "}
        +1{" "}
      </button>{" "}
      <button
        onClick={() => dispatch({ type: "decrement" })}
        className="px-4 py-2 bg-red-500 text-white rounded m-2"
      >
        {" "}
        -1{" "}
      </button>{" "}
      <button
        onClick={() => dispatch({ type: "reset" })}
        className="px-4 py-2 bg-gray-500 text-white rounded m-2"
      >
        {" "}
        Reset{" "}
      </button>
      <div className="mt-4">
        {" "}
        <button
          onClick={() => dispatch({ type: "undo" })}
          disabled={state.past.length === 0}
          className="px-4 py-2 bg-yellow-500 text-white rounded m-2 disabled:opacity-50"
        >
          {" "}
          Undo{" "}
        </button>{" "}
        <button
          onClick={() => dispatch({ type: "redo" })}
          disabled={state.future.length === 0}
          className="px-4 py-2 bg-green-500 text-white rounded m-2 disabled:opacity-50"
        >
          {" "}
          Redo{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
}