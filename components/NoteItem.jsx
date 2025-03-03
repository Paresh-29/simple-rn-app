import { View, Text, StyleSheet } from 'react-native';


const NoteItem = ({ note }) => {
	return (
		<View style={styles.noteItem}>
			<Text style={styles.noteText}>{note.title}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	noteItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#fff',
		padding: 15,
		borderRadius: 5,
		marginVertical: 5,
	},
	noteText: {
		fontSize: 18,
	},
})

export default NoteItem;
