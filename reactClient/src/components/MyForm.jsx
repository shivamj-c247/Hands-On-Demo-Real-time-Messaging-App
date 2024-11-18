import React, { useState } from "react";
import { socket } from "../utils/socket.js";

export function MyForm() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(5000).emit("create-something", value, () => {
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        required
        className="border border-gray-300 rounded-md px-4 py-2"
        placeholder="Enter something"
        onChange={(e) => setValue(e.target.value)}
      />

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
}
