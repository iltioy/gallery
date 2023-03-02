import { useState, useEffect } from "react";
import { projectStorage, projectFirestore } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import {
    ref,
    uploadBytes,
    getDownloadURL,
    uploadBytesResumable,
} from "firebase/storage";

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        // references
        const storageRef = ref(projectStorage, file.name);
        const collectionRef = collection(projectFirestore, "images");

        const uploadTask = uploadBytesResumable(storageRef, file);
        // uploadBytes(storageRef, file).then(async (snapshot) => {
        //     let precentage =
        //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     console.log(snapshot.bytesTransferred);
        //     setProgress(precentage);
        //     const url = await getDownloadURL(storageRef);
        //     setUrl(url);
        // });

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (err) => {
                setError(err);
            },
            async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                const createdAt = serverTimestamp();

                await addDoc(collectionRef, { url, createdAt });
                console.log("first");

                setUrl(url);
            }
        );
    }, [file]);

    return { progress, url, error };
};

export default useStorage;
