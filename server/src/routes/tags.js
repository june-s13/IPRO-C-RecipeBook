import { Router } from "express";
import { getTags } from "../db/tags.js";

const tagsRoute = Router();

tagsRoute.get("/", async (req, res) => {
  const tags = await getTags();
  res.send(tags);
});

export { tagsRoute };
