import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(req) {
  try {
    const { session } = await getServerSession();

    console.log(session);

    if (!session?.user) {
      return NextResponse.json({ message: "not success" });
    }

    const { imageUrl, title, content } = await req.json();

    const user = await prisma.post.create({
      data: {
        imageUrl: imageUrl,
        title: title,
        content: content,
        date: Date.now(),
        authorId: "thuan2",
      },
    });

    if (user) {
      console.log(user);
    }
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({ message: "success" });
}
