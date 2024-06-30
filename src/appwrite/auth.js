import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ name, email, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      } else {
        console.log("Appwrite error :: createAccount :: userAccount", userAccount);
      }
    } catch (error) {
      console.log("Appwrite error :: createAccount :: error ", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite error :: login :: error", error);
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();

      if (user) {
        return user;
      } else {
        console.log("No user found in getCurrentuser");
        return null;
      }
    } catch (error) {
      console.log("Appwrite error :: getCurrentUser :: error ", error);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite error :: logout :: error ", error);
    }
  }
}

const authService = new AuthService();

export default authService;

/*=========================================================*/

