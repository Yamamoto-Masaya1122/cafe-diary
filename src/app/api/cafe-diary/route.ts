import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/db";
import { cafeDiaryValidation } from "@/validations/cafe-diary-validation";
import { CafeDiaryData } from "@/types/cafe-diary";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const authenticate = (request: NextRequest) => {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("UNAUTHORIZED");
  }

  const token = authHeader.split(" ")[1];
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    throw new Error("UNAUTHORIZED");
  }
};

export async function GET(request: NextRequest) {
  try {
    const payload = authenticate(request);

    const diaries = await prisma.cafeDiary.findMany({
      where: { userId: payload.userId },
      orderBy: { visitDate: "desc" },
    });

    return NextResponse.json(
      diaries.map((diary: CafeDiaryData) => ({
        id: diary.id,
        name: diary.name,
        location: diary.location,
        visitDate: diary.visitDate,
        rating: diary.rating,
        notes: diary.notes,
        userId: diary.userId,
      }))
    );
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ message: "認証情報がありません" }, { status: 401 });
    }

    console.error("Cafe diary fetch error:", error);
    return NextResponse.json({ message: "カフェ日記を取得できませんでした" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = authenticate(request);
    const body = await request.json();

    const validationResult = cafeDiaryValidation.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ message: validationResult.error.message }, { status: 400 });
    }

    const { name, location, visitDate, rating, notes } = validationResult.data;

    const created = await prisma.cafeDiary.create({
      data: {
        name,
        location: location ?? "",
        visitDate: new Date(visitDate),
        rating,
        notes: notes ?? "",
        userId: payload.userId,
      },
    });

    return NextResponse.json(
      {
        id: created.id,
        name: created.name,
        location: created.location,
        visitDate: created.visitDate.toISOString().split("T")[0],
        rating: created.rating,
        notes: created.notes,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ message: "認証情報がありません" }, { status: 401 });
    }

    console.error("Cafe diary creation error:", error);
    return NextResponse.json({ message: "カフェ日記を作成できませんでした" }, { status: 500 });
  }
}
