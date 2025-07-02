
import * as z from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const postSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  content: z.string().min(50, { message: "Content must be at least 50 characters." }),
  featuredImage: z
    .any()
    .optional()
    .refine((files) => !files || files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
  tags: z.string().optional(),
})

export const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty.").max(500, "Comment is too long."),
})

