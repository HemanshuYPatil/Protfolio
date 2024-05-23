import { Client, Databases } from "appwrite";

// Initialize the client
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") 
  .setProject("65c0d05506e3ce1df2dc"); 


const databases = new Databases(client);

// async function fetchAllDocuments(databaseId: String, collectionId: String) {
//   try {
//     const response = await databases.listDocuments(databaseId, collectionId);
//     return response.documents;
//   } catch (error) {
//     console.error("Error fetching documents:", error);
//     return [];
//   }
// }

// const databaseId = process.env.NEXT_DATABASE as String;
// const collectionId = process.env.NEXT_COLLECTION as String;


// fetchAllDocuments(databaseId, collectionId).then((documents) => {
//   console.log("Documents:", documents);
// });

export { databases ,client};
