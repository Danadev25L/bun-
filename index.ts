import { cors } from "@elysiajs/cors";

import { Elysia } from "elysia";

import dotenv from "dotenv";

import { todoRoutes } from "./routes/Routes";

dotenv.config();

const app = new Elysia();
app.use(cors());
app.use(todoRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
}
);
