import databaseService from "./databaseService";
import { ID, Query } from "react-native-appwrite";

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const collectionId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const notesService = {
  async getNotes(userId) {
    if (!userId) {
      console.error("Error: User ID is required in getNotes");
      return { data: [], error: "User ID is required" };
    }

    try {
      const response = await databaseService.listDocuments(dbId, collectionId, [
        Query.equal("user_id", userId),
      ]);
      return response;
    } catch (error) {
      console.log("Error while fetching notes", error.message);
      return { data: [], error: error.message };
    }
  },

  async createNote(user_id, text) {
    if (!text) {
      return { error: "Note text is required" };
    }

    const data = {
      text: text,
      createdAt: new Date().toISOString(),
      user_id: user_id,
    };

    const response = await databaseService.createDocument(
      dbId,
      collectionId,
      data,
      ID.unique(),
    );
    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  },
  async updateNote(noteId, text) {
    const response = await databaseService.updateDocument(
      dbId,
      collectionId,
      noteId,
      {
        text,
      },
    );

    if (response.error) {
      return { error: response.error };
    }
    return { data: response };
  },
  async deleteNote(noteId) {
    const response = await databaseService.deleteDocument(
      dbId,
      collectionId,
      noteId,
    );
    if (response.error) {
      return { error: response.error };
    }

    return { success: true };
  },
};

export default notesService;
