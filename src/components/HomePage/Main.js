import Header from "@/components/Header";
import CreateArea from "@/components/CreateArea";
import Note from "@/components/Note";
import Footer from "@/components/Footer";

import { useState, useEffect } from "react";

export default function Main(props) {
  const data = props.data;
  const [notes, setNotes] = useState(data);
  useEffect(() => {
    setNotes(data);
  }, [data]);

  async function addNote() {
    const response = await fetch("/api/data");
    const data = await response.json();
    setNotes(data);
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem) => {
        return noteItem._id !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes ? (
        notes.map((noteItem) => {
          return (
            <Note
              key={noteItem._id}
              id={noteItem._id}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })
      ) : (
        <h1>Loading.....</h1>
      )}
      <Footer />
    </div>
  );
}
