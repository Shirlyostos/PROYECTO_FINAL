import express from "express";
import cors from "cors";
import fs from "fs";
import process from "process";

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = "./db.json";

app.get("/tareas", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
  res.json(data);
});

app.post("/tareas", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
  const nueva = req.body;

  data.push(nueva);

  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  res.json({ ok: true });
});

// PORT REQUERIDO POR RENDER
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Servidor escuchando en puerto " + PORT));
