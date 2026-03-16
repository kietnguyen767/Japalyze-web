
const dbUrl = process.env.DATABASE_URL;
if (dbUrl) {
    console.log("Length:", dbUrl.length);
    const hex = Buffer.from(dbUrl).toString('hex');
    console.log("Hex:", hex);
    for (let i = 0; i < dbUrl.length; i++) {
        console.log(`${i}: ${dbUrl[i]} (${dbUrl.charCodeAt(i)})`);
    }
} else {
    console.log("NOT FOUND");
}
