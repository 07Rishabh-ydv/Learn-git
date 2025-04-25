import express from "express";
import rw from "./rw.js";

const app = express();

// Middleware to parse JSON
app.use(express.json());

// GET route
app.get("/", async (req, res) => {
    try {
        const data = await rw.readFile();
        res.status(data.status).json({ data: data.data, message: data.message });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// POST route
app.post("/", async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ message: "No data provided" });
        }

        await rw.writeFile(data);
        res.status(201).json({ data: data, message: "Data written successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

const PORT = 8800;
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));