import { cors } from "@elysiajs/cors";

import { Elysia } from "elysia";

import dotenv from "dotenv";

import { todoRoutes } from "./routes/Routes";

dotenv.config();

const app = new Elysia();
app.use(cors());
app.use(todoRoutes);

// Get dynamic port from Railway (or default to 3000 for local dev)
const PORT = Number(process.env.PORT) || 3000;

if (isNaN(PORT) || PORT < 0 || PORT > 65535) {
  throw new Error("❌ Invalid PORT: must be between 0 and 65535");
}

app.listen(PORT);
console.log(`✅ Server running at http://localhost:${PORT}`);
