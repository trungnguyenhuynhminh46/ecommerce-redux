import React, { useState, useEffect } from "react";
import {
  onSnapshot,
  Query,
  CollectionReference,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../share/firebase";

const cache: { [key: string]: any } = {};

const useCollectionQuery: (
  key: string,
  colQuery: CollectionReference<DocumentData> | Query<DocumentData>
) => {
  data: QuerySnapshot<DocumentData> | null;
  loading: boolean;
  error: string;
} = (key, colQuery) => {
  const [data, setData] = useState<QuerySnapshot<DocumentData> | null>(
    cache[key] || null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const unsub = onSnapshot(
      colQuery,
      (querySnap) => {
        cache[key] = querySnap;
        setData(querySnap);
        setLoading(false);
        setError("");
      },
      (err) => {
        setData(null);
        setLoading(false);
        setError(err.message);
      }
    );
    // Clear up
    return unsub;
  }, []);
  return {
    data,
    loading,
    error,
  };
};

export default useCollectionQuery;
