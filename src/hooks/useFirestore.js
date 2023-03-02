import { useState, useEffect } from "react";
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";

const useFirestore = (mcollection) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        //const ref = collection(projectFirestore, collection)
        const q = query(
            collection(projectFirestore, mcollection),
            orderBy("createdAt", "desc")
        );
        const unsub = onSnapshot(q, (snapshot) => {
            let documents = [];

            snapshot.forEach((doc) => {
                documents.push({ ...doc.data(), id: doc.id });
            });

            setDocs(documents);
        });

        return () => {
            unsub();
        };
    }, [collection]);
    return { docs };
};

export default useFirestore;
