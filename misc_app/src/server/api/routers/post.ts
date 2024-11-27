import { z } from "zod";
import { db } from "~/server/db"; // Assuming you have a database instance
import cuid from "cuid"; // Import the cuid library


import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({

  uploadFiles: protectedProcedure
  .input(z.object({
    files: z.array(z.object({
      name: z.string(),
      caseText: z.string(),
      misconductType: z.string().nullable(), // New field for type of misconduct
      verdict: z.string().nullable(), // New field for verdict
    })),
  }))
  .mutation(async ({ input, ctx }) => {

    if (!input.files || input.files.length === 0) {
      throw new Error("No files provided");
    }

    console.log("Uploading files:", input.files[0]!.name);


    if (!ctx.session || !ctx.session.user || !ctx.session.user.email) {
      throw new Error("Unauthorized");
    }

    try {
      const filesData = input.files.map(file => ({
        id: cuid(),
        name: file.name,
        date: new Date().toISOString().split('T')[0],
        userEmail: ctx.session.user.email!,
        misconductType: null,
        verdict: null,
        caseText: file.caseText,
      }));

      await db.files.createMany({ data: filesData });
    } catch (error) {
      console.error("Error uploading files:", error);
      throw new Error("Failed to upload files");
    }
  }
  ),
});

