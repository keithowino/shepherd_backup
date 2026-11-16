import { Router } from "express";
import { mediaController } from "../controllers/index.js";
import { recentQuerySchema, seriesParamsSchema } from "../validators/index.js";
import { validateRequest } from "../../../app/index.js"

const router = Router();

router.get("/recent", validateRequest(recentQuerySchema, "query"), mediaController.list);
router.get("/series/:id", validateRequest(seriesParamsSchema, "params"), mediaController.series);

export default router;