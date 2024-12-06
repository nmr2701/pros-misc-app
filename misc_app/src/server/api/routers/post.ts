import { z } from "zod";
import { db } from "~/server/db"; // Assuming you have a database instance
import cuid from "cuid"; // Import the cuid library
import AWS from 'aws-sdk';
import { env } from "~/env"



AWS.config.update({ region: 'us-east-2' }); // e.g., 'us-east-1'

const lambda = new AWS.Lambda({
  region: 'us-east-2', // Replace with your AWS region
  accessKeyId: env.ACCESS_KEY,
  secretAccessKey: env.SECRET_ACCESS_KEY
});

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { EmailAddress } from "@clerk/nextjs/server";

export const postRouter = createTRPCRouter({

  uploadFiles: publicProcedure
  .input(z.object({
    files: z.array(z.object({
      name: z.string(),
      caseText: z.string(),
      misconductType: z.string().nullable(), // New field for type of misconduct
      verdict: z.string().nullable(), // New field for verdict
      userEmail: z.string(),
    })),
  }))
  .mutation(async ({ input, ctx }) => {

    if (!input.files || input.files.length === 0) {
      throw new Error("No files provided");
    }

    console.log("Uploading files:", input.files[0]!.name);
    try {
      const filesData = input.files.map(async (file) => {
        const params = {
          FunctionName: 'testlambda', // Replace with your Lambda function name
          Payload: JSON.stringify({ case_text: file.caseText }), // Pass caseText as payload
        };

        const lambdaResponse = await lambda.invoke(params).promise();
        const responsePayload = JSON.parse(lambdaResponse.Payload as string); // Parse the response payload
        console.log("1",lambdaResponse)
        console.log("2", responsePayload)
        return {
          id: cuid(),
          name: file.name,
          date: new Date(),
          userEmail: file.userEmail,
          misconductType: responsePayload, // Set misconductType from Lambda response
          verdict: null,
          caseText: file.caseText,
        };
      });

      // Wait for all promises to resolve
      const resolvedFilesData = await Promise.all(filesData);

      await db.files.createMany({ data: resolvedFilesData });
    } catch (error) {
      console.error("Error uploading files:", error);
      throw new Error("Failed to upload files");
    }
  }),

  getFiles: publicProcedure
  .query(async ({ ctx }) => {
    const files = await db.files.findMany();
    return files;
  }),
});

