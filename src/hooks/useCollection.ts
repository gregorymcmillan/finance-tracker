import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection: any, _query: any, _orderBy: any) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref: any = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch transaction data");
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [collection, query, orderBy]);

  return { documents, error };
};
