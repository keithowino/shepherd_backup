// export const validateRequest = (schema, source = "query") => (req, _res, next) => {
//     const parsed = schema.safeParse(req[source]);
//     if (!parsed.success) {
//         return next(new ApiError("Invalid request", 400, "VALIDATION", parsed.error.issues));
//     }
//     req[source] = parsed.data;
//     next();
// };

export const validateRequest = (schema, source = "query") => (req, _res, next) => {
    const parsed = schema.safeParse(req[source]);
    if (!parsed.success) {
        return next(parsed.error);   // errorHandler turns ZodError into 400
    }
    // Don't touch req.query / req.params directly.
    if (source === "query") req.validatedQuery = parsed.data;
    else if (source === "params") req.validatedParams = parsed.data;
    else req.validatedBody = parsed.data;
    next();
};