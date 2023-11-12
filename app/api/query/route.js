import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(req) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json({ message: "not success" });
    } else {
      console.log(session.user);
    }

    const data = await req.json();
    const { imageUrl, title, content } = data;

    console.log(data);

    const user = await prisma.post.create({
      data: {
        imageUrl: imageUrl,
        title: title,
        content: content,
        date: new Date(),
        authorId: 18,

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

export async function GET(req) {
  try {
    const data = await prisma.post.findMany();
    console.log(data);

    return NextResponse.json({ data });
  } catch (e) {
    console.log(err);
  }
  return NextResponse.json({ message: "success" });
}
