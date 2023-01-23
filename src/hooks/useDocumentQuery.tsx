import React, { useState, useEffect } from "react";
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  onSnapshot,
} from "firebase/firestore";

const cache: { [key: string]: any } = {};

const useDocumentQuery: (
  key: string,
  docQuery: DocumentReference<DocumentData>
) => {
  data: DocumentSnapshot<DocumentData> | null;
  loading: boolean;
  error: string;
} = (key, docQuery) => {
  const [data, setData] = useState<DocumentSnapshot<DocumentData> | null>(
    cache[key] || null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const unsub = onSnapshot(
      docQuery,
      (docSnap) => {
        cache[key] = docSnap;
        setData(docSnap);
        setLoading(false);
        setError("");
      },
      (err) => {
        setData(null);
        setLoading(false);
        setError(err.message);
      }
    );
    // Clean up
    return unsub;
  }, []);
  return {
    data,
    loading,
    error,
  };
};

export default useDocumentQuery;
