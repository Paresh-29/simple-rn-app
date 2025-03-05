import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

import { useAuth } from "../../contexts/AuthContext";
import NoteList from "../../components/NoteList";
import AddNoteModal from "../../components/AddNoteModal";
import notesService from "../../services/noteService";

const NotesScreen = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [notes, setNotes] = useState([]);

  const [modalVisiable, setModalVisiable] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/auth");
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    setLoading(true);
    const response = await notesService.getNotes();
    console.log(response.data);

    if (response.error) {
      setError(response.error);
      Alert.alert("Error", response.error);
    } else {
      setNotes(response.data);
      setError(null);
    }

    setLoading(false);
  };

  const addNote = async () => {
    if (newNote.trim() === "") return;

    const response = await notesService.createNote(newNote);

    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      console.log("New Note Added", response.data);
      fetchNotes();
    }

    setNewNote("");
    setModalVisiable(false);
  };

  const deleteNote = async (noteId) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const response = await notesService.deleteNote(noteId);
          if (response.error) {
            Alert.alert("Error", response.error);
          } else {
            setNotes(notes.filter((note) => note.$id !== noteId));
          }
        },
      },
    ]);
  };

  const updateNote = async (noteId, newText) => {
    if (!newText.trim()) {
      Alert.alert("Error", "Note text is required");
      return;
    }

    const response = await notesService.updateNote(noteId, newText);
    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.$id === noteId ? { ...note, text: response.data.text } : note,
        ),
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Notes List */}
      {loading ? (
        <ActivityIndicator size={"large"} color={"#ff8c00"} />
      ) : (
        <>
          {error && (
            <Text
              style={{
                color: "red",
                textAlign: "center",
                marginBottom: 10,
                fontSize: 15,
              }}
            >
              {error}
            </Text>
          )}
          <NoteList notes={notes} onDelete={deleteNote} onEdit={updateNote} />
        </>
      )}
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
