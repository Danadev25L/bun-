import { cors } from "@elysiajs/cors";

import { Elysia } from "elysia";

import dotenv from "dotenv";

import { todoRoutes } from "./routes/Routes";

dotenv.config();

const app = new Elysia();


app.use(cors());

// Register routes
app.use(todoRoutes);
app.listen(3000);

console.log("✅ Server running at http://localhost:3000");

