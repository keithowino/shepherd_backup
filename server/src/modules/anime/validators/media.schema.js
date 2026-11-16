import { z } from "zod";

export const recentQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    perPage: z.coerce.number().int().min(1).max(50).default(20),
});

export const seriesParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});