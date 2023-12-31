import { getServerSession } from "next-auth";
import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

const auth = async (req) => {
  const session = await getServerSession();
  return session;
};

// FileRouter for your app, can contain multiple FileRoutes
export const myFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload

      console.log("Test");
      const session = await getServerSession();
      // If you throw, the user will not be able to upload
      if (!session.user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      if (session.user === "Anh") return { userId: 1 };
      return { userId: 2 };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
};

export default myFileRouter;
