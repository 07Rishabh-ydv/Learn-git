import fs from "fs/promises";

const filePath = "./data.json";

// Read File Function
const readFile = async () => {
    let message = "";
    let status = 500;
    let data = [];

    try {
        const fileData = await fs.readFile(filePath, "utf-8");
        message = "File has been read successfully.";
        status = 200;
        data = JSON.parse(fileData); // Parse the JSON content
    } catch (error) {
        message = "Read error";
        status = 500;
        data = { error: error.message };
    }

    return { data, status, message };
};

// Write File Function
const writeFile = async (newData) => {
    let message = "";
    let status = 500;
    let data = [];

    try {
        const result = await readFile(); // Get existing data
        data = Array.isArray(result.data) ? result.data : [];

        data.push(newData); // Add the new data

        await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

        message = "File has been written successfully.";
        status = 200;
    } catch (error) {
        message = "Write error";
        data = { error: error.message };
    }

    return { data, status, message };
};

export default { readFile, writeFile };