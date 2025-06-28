import { z } from "zod";


export const postSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters."),
    content: z.string().min(20, "Content is too short."),
});