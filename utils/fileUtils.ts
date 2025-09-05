export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // result is in format "data:image/jpeg;base64,LzlqLzRBQ...". We only want the base64 part.
            const base64String = (reader.result as string).split(',')[1];
            if (base64String) {
                resolve(base64String);
            } else {
                reject(new Error("Could not extract base64 string from file."));
            }
        };
        reader.onerror = error => reject(error);
    });
};
