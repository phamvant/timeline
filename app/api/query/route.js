import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json({ message: "not success" });
    } else {
      console.log(session.user);
    }

    const data = await req.json();
    const { imageUrl, title, content, date } = data;

    console.log(data);

    const user = await prisma.post.create({
      data: {
        imageUrl: imageUrl,
        title: title,
        content: content,
        date: date,
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
