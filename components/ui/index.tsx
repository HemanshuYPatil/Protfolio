import { useEffect, useState } from "react";
import { databases } from "../../lib/database/db";

interface Document {
  $id: string;
  [key: string]: any;
}

interface DocumentListProps {
  databaseId: string;
  collectionId: string;
}

const DocumentList: React.FC<DocumentListProps> = ({
  databaseId,
  collectionId,
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await databases.listDocuments(
          databaseId,
          collectionId
        );
        setDocuments(response.documents);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [databaseId, collectionId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Documents</h1>
      <ul>
        {documents.map((doc) => (
          <li key={doc.$id}>{JSON.stringify(doc)}</li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
