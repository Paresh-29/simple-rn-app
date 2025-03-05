import { account } from "./appwrite";
import { ID } from "react-native-appwrite";

const authService = {
  // register
  async register(email, password) {
    try {
      const response = await account.create(ID.unique(), email, password);
      return response;
    } catch (error) {
      return { error: error.message || "failed to register" };
    }
  },

  // login
  async login(email, password) {
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password,
      );
      return response;
    } catch (error) {
      return { error: error.message || "Faild to login, please try again" };
    }
  },

  // get user
  async getUser() {
    try {
      return await account.get();
    } catch (error) {
      return null;
    }
  },

  //logout
  async logout() {
    try {
      await account.deleteSession("current");
    } catch (error) {
      return { error: error.message || "Failed to logout" };
    }
  },
};

export default authService;
