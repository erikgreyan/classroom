const {
    PORT,
    MONGODB_URI,
    SESSION_SECRET
} = process.env;

if (!PORT || !MONGODB_URI || !SESSION_SECRET) {
    throw new Error("Missing environment variables");
}

export {
    PORT,
    MONGODB_URI,
    SESSION_SECRET
}