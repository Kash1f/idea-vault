import React from "react";
import "../styles/VaultItem.css";

//This is going to represent one single item and we'll just use this to render all of our items
const VaultItem = ({ item, onDelete }) => {
  //this removes unnecessary parts like the time zone and shows a clean, formatted date of when the item was created
  const formattedDate = new Date(item.created_at).toLocaleDateString("en-US");

  return (
    <>
      <div className="item-container">
        <p className="item-title">{item.title}</p>
        <p className="item-content">{item.content}</p>
        <p className="item-date">{formattedDate}</p>
        <button className="delete-item" onClick={() => onDelete(item.id)}>
          Delete
        </button>
        <button className="delete-item" onClick={() => onDelete(item.id)}>
          Update
        </button>
      </div>
    </>
  );
};

export default VaultItem;
