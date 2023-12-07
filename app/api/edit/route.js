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
    // const { content, id } = data;

    console.log(data);

    const post = await prisma.post.update({
      where: {
        id: data.id,
      },
      data: {
        content: data.content,
        date: data.date,
      },
    });

    if (post) {
      console.log(post);
    }
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({ message: "success" });
}
