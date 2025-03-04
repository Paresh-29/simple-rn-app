import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

import NoteList from "../../components/NoteList";
import AddNoteModal from "../../components/AddNoteModal";
import notesService from "../../services/noteService";

const NotesScreen = () => {
  const [notes, setNotes] = useState([]);

  const [modalVisiable, setModalVisiable] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    const response = await notesService.getNotes();
    console.log(response.data);

    if (response.error) {
      setError(response.error);
      Alert.alert("Error", response.error);
    } else {
      newNote(response.data);
      setError(null);
    }

    setLoading(false);
  };

  const addNote = () => {
    if (newNote.trim() === "") return;

    setNotes((prevNotes) => [
      ...prevNotes,
      {
        id: Date.now.toString(),
        text: newNote,
      },
    ]);
    setNewNote("");
    setModalVisiable(false);
  };

  return (
    <View style={styles.container}>
      {/* Notes List */}
      <NoteList notes={notes} />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisiable(true)}
      >
        <Text style={styles.addButtonText}>+ Add Notes</Text>
      </TouchableOpacity>
      {/* Modal */}
      <AddNoteModal
        modalVisiable={modalVisiable}
        setModalVisiable={setModalVisiable}
        newNote={newNote}
        setNewNote={setNewNote}
        addNote={addNote}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#ff8c00",
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default NotesScreen;
