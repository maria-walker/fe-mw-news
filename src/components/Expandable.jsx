import { useState } from "react";

const Expandable = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen((currOpen) => !currOpen);
  };
  return (
    <div>
      <button className="Comments__button" onClick={toggleIsOpen}>
        {isOpen ? "-" : "+"}
      </button>
      <br />
      <br />

      <div>{isOpen ? children : null}</div>
    </div>
  );
};

export default Expandable;
