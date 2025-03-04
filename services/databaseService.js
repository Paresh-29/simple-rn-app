import { database } from "./appwrite";

const databaseService = {
	async listDocuments(dbId, collectionId) {
		try {
			const response = await database.listDocuments(dbId, collectionId);
			return response.documents || [];
		} catch (error) {
			console.error("Error fetching documents", error);
			return { error: error.message };
		}
	},
};

export default databaseService;
