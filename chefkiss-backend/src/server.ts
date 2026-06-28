import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/authReoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "chefkiss API está rodadndo" });
});

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
