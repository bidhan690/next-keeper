import React from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

function Note(props) {
  async function handleClick() {
    const id = props.id;
    const response = await fetch("/api/data", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
