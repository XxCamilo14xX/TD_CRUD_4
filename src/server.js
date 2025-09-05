import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

const dataPath = path.join(__dirname, "..", "data", "items.json");

function readData() {
  return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

app.get("/api/items", (req, res) => {
  const items = readData();
  res.json(items);
});

app.get("/api/items/:id", (req, res) => {
  const items = readData();
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: "Item no encontrado" });
  res.json(item);
});

app.post("/api/items", (req, res) => {
  const items = readData();
  const newItem = {
    id: items.length ? items[items.length - 1].id + 1 : 1,
    ...req.body
  };
  items.push(newItem);
  writeData(items);
  res.status(201).json(newItem);
});

app.put("/api/items/:id", (req, res) => {
  const items = readData();
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Item no encontrado" });

  items[index] = { ...items[index], ...req.body };
  writeData(items);
  res.json(items[index]);
});

app.delete("/api/items/:id", (req, res) => {
  let items = readData();
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Item no encontrado" });

  const deleted = items.splice(index, 1);
  writeData(items);
  res.json(deleted[0]);
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});