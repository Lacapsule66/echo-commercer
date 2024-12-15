import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/sanity-utils";
import { prisma } from "@/lib/prismaDB";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  const { name, email, comment, ratings, productID } = body;

  console.log(body, typeof ratings);

  try {
    const review = await prisma.review.create({
      data: {
        productID,
        name,
        email,
        comment,
        ratings,
      },
    });

    return NextResponse.json({ review }, { status: 200 });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
