const DB_NAME = "pale-blue-mock-files";

const DB_VERSION = 1;

const STORE_NAME = "source-files";


function openDatabase() {
    return new Promise((resolve, reject) => {
        const request =
            indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
            const db =
                request.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(
                request.error ||
                new Error("Failed to open mock file storage.")
            );
        };
    });
}


export async function saveMockFile(fileId, file) {
    const db =
        await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction =
            db.transaction(STORE_NAME, "readwrite");

        const store =
            transaction.objectStore(STORE_NAME);

        const request =
            store.put(file, String(fileId));

        request.onsuccess = () => resolve();

        request.onerror = () =>
            reject(
                request.error ||
                new Error("Failed to save mock file.")
            );

        transaction.oncomplete =
            () => db.close();
    });
}


export async function getMockFile(fileId) {
    const db =
        await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction =
            db.transaction(STORE_NAME, "readonly");

        const store =
            transaction.objectStore(STORE_NAME);

        const request =
            store.get(String(fileId));

        request.onsuccess = () => {
            resolve(request.result ?? null);
        };

        request.onerror = () =>
            reject(
                request.error ||
                new Error("Failed to read mock file.")
            );

        transaction.oncomplete =
            () => db.close();
    });
}


export async function deleteMockFile(fileId) {
    const db =
        await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction =
            db.transaction(STORE_NAME, "readwrite");

        const store =
            transaction.objectStore(STORE_NAME);

        const request =
            store.delete(String(fileId));

        request.onsuccess =
            () => resolve();

        request.onerror = () =>
            reject(
                request.error ||
                new Error("Failed to delete mock file.")
            );


        transaction.oncomplete =
            () => db.close();
    });
}