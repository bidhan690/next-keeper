import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [expanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  async function submitNote(event) {
    if (!note.title || !note.content) {
      setError(true);
      return;
    } else {
      const response = await fetch("/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      props.onAdd();
      setNote({
        title: "",
        content: "",
      });
    }
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {expanded === true && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            autoComplete="true"
            required
          />
        )}
        <textarea
          onClick={expand}
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          required
          rows={expanded === true ? 3 : 1}
        />
        {error && (
          <p style={{ color: "red" }}>Title or note must not be empty!</p>
        )}
        <Zoom in={expanded === true ? true : false}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
