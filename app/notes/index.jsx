import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import NoteList from '../../components/NoteList';
import AddNoteModal from '../../components/AddNoteModal';

const NotesScreen = () => {
	const [notes, setNotes] = useState([
		{ id: 1, title: 'Note one' },
		{ id: 2, title: 'Note two' },
		{ id: 3, title: 'Note three' },
		{ id: 4, title: 'Note four' },
	]);

	const [modalVisiable, setModalVisiable] = useState(false);
	const [newNote, setNewNote] = useState('');


	const addNote = () => {
		if (newNote.trim() === '') return;

		setNotes((prevNotes) => [
			...prevNotes,
			{
				id: Date.now.toString(),
				title: newNote,
			}
		]);
		setNewNote('');
		setModalVisiable(false);
	}

	return (
		<View style={styles.conatiner}>
			{/* Notes List */}
			<NoteList notes={notes} />

			<TouchableOpacity style={styles.addButton}
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
}

const styles = StyleSheet.create({
	conatiner: {
		flex: 1,
		backgroundColor: '#f8f9fa',
		padding: 20,
	},
	addButton: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		right: 20,
		backgroundColor: '#ff8c00',
		padding: 15,
		borderRadius: 6,
		alignItems: 'center',
	},
	addButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
})

export default NotesScreen;
