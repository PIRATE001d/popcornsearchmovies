import { useState } from "react";

export default function Box({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (
        <>
          <h2>{title}</h2>
          {children}
        </>
      )}
    </div>
  );
}
