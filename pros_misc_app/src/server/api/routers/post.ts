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
      // New fields added
      misconductType: z.string().nullable(), // New field for type of misconduct
      verdict: z.string().nullable(), // New field for verdict
    })),
  }))
  .mutation(async ({ input, ctx }) => {

    if (!ctx.session || !ctx.session.user || !ctx.session.user.email) {
      throw new Error("Unauthorized");
    }

    const filesData = input.files.map(file => ({
      id: cuid(), // Generate a unique ID
      name: file.name, // Use the file name
      date: new Date().toISOString().split('T')[0], // Current date without time
      userEmail: ctx.session.user.email!, // User email
      misconductType: null, // Set to null
      verdict: null, // Set to null
      caseText: file.caseText, // Store the actual text file
    }));

    await db.files.createMany({ data: filesData });

  }),
});

