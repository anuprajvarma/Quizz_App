import React from "react";

export const Actions = ({ handlePrevOptions, handleNextOptions, clicked }) => {
  return (
    <div className="actions">
      <button onClick={handlePrevOptions}>PREV</button>
      <button disabled={!clicked} onClick={handleNextOptions}>
        NEXT
      </button>
    </div>
  );
};
