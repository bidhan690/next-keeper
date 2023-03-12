import Header from "@/components/Header";
import CreateArea from "@/components/CreateArea";
import Note from "@/components/Note";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

import { useState, useEffect } from "react";

const noteVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { y: "500vh", transition: { duration: 0.5 } },
};

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
      <AnimatePresence>
        {notes ? (
          notes.map((noteItem) => {
            return (
              <motion.div
                key={noteItem._id}
                variants={noteVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Note
                  key={noteItem._id}
                  id={noteItem._id}
                  title={noteItem.title}
                  content={noteItem.content}
                  onDelete={deleteNote}
                />
              </motion.div>
            );
          })
        ) : (
          <h1>Loading.....</h1>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}
