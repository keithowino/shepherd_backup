import { mediaService } from "../services/media.service.js";
import { success } from "../../../app/index.js";

export const mediaController = {
    // async list(req, res, next) {
    //     try {
    //         // const { page, perPage } = req.query;   // already validated/coerced
    //         const { page, perPage } = req.validatedQuery;
    //         const result = await mediaService.getRecent({ page, perPage });

    //         return success(
    //             res,
    //             result.items,
    //             "Recent anime fetched.",
    //             200,
    //             // if you want pagination in the envelope, extend success() to
    //             // accept meta — otherwise return {items, pagination} as data
    //         );
    //     } catch (err) {
    //         next(err);
    //     }
    // },
    async list(req, res, next) {
        try {
            const { page, perPage } = req.validatedQuery;
            const result = await mediaService.getRecent({ page, perPage });

            return success(
                res,
                result.items,
                "Recent anime fetched.",
                200,
                result.pagination,
            );
        } catch (err) {
            next(err);
        }
    },

    async series(req, res, next) {
        try {
            // const { id } = req.params;
            const { id } = req.validatedParams;
            const result = await mediaService.getSeries(id);
            return success(res, result, "Series fetched.");
        } catch (err) {
            next(err);
        }
    },
};