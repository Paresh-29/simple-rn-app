import { database } from "./appwrite";

const databaseService = {
  async listDocuments(dbId, collectionId, queries = []) {
    try {
      const response = await database.listDocuments(
        dbId,
        collectionId,
        queries,
      );
      return { data: response.documents || [], error: null };
    } catch (error) {
      console.error("Error fetching documents", error);
      return { error: error.message };
    }
  },
  async createDocument(dbId, collectionId, data, id = null) {
    try {
      return await database.createDocument(
        dbId,
        collectionId,
        id || undefined,
        data,
      );
    } catch (error) {
      console.error("Error creating document", error);
      return { error: error.message };
    }
  },
  async updateDocument(dbId, collectionId, documentId, data) {
    try {
      return await database.updateDocument(
        dbId,
        collectionId,
        documentId,
        data,
      );
    } catch (error) {
      console.error("Error updating document", error);
      return { error: error.message };
    }
  },

  async deleteDocument(dbId, collectionId, documentId) {
    try {
      await database.deleteDocument(dbId, collectionId, documentId);
      return { success: true };
    } catch (error) {
      console.error("Error deleting document", error);
      return { error: error.message };
    }
  },
};

export default databaseService;
