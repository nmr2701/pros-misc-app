import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({

  uploadFiles: protectedProcedure
    .input(z.object({ files: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      const { files } = input;

      const azureFunctionUrl = "https://your-azure-function-url";

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file); // Adjust the key as needed
      });
      
      try {
        const response = await fetch(azureFunctionUrl, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload files");
        }

        return { success: true };
      } catch (error) {
        console.error("Failed to upload files:", error);
        return { success: false };
      }


    }),
  
});
