import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, password } = await req.json();
    console.log(name, password);

    const user = await prisma.user.create({
      data: {
        name: name,
        password: password,
      },
    });

    if (user) {
      console.log(user);
    }

    //validate
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({ message: "success" });
}
