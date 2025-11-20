import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/db";
import { cafeDiaryValidation } from "@/validations/cafe-diary-validation";

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

export async function PUT(request: NextRequest) {
  try {
    const payload = authenticate(request);
    const body = await request.json();

    const validationResult = cafeDiaryValidation.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ message: validationResult.error.message }, { status: 400 });
    }

    const { id, name, location, visitDate, rating, notes } = validationResult.data;

    // 論理削除済みレコードをチェック
    const existing = await prisma.cafeDiary.findFirst({
      where: { id, userId: payload.userId },
    });

    if (!existing) {
      return NextResponse.json({ message: "カフェ日記が見つかりません" }, { status: 404 });
    }

    if (existing.deletedAt) {
      return NextResponse.json({ message: "削除済みのカフェ日記は更新できません" }, { status: 400 });
    }

    const updated = await prisma.cafeDiary.update({
      where: { id, userId: payload.userId },
      data: { name, location, visitDate: new Date(visitDate), rating, notes },
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ message: "認証情報がありません" }, { status: 401 });
    }

    console.error("Cafe diary update error:", error);
    return NextResponse.json({ message: "カフェ日記を更新できませんでした" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const payload = authenticate(request);
    const id = request.nextUrl.pathname.split("/").pop();
    if (!id) {
      return NextResponse.json({ message: "カフェ日記IDが必要です" }, { status: 400 });
    }

    // 論理削除済みレコードをチェック
    const existing = await prisma.cafeDiary.findFirst({
      where: { id, userId: payload.userId },
    });

    if (!existing) {
      return NextResponse.json({ message: "カフェ日記が見つかりません" }, { status: 404 });
    }

    if (existing.deletedAt) {
      return NextResponse.json({ message: "既に削除済みのカフェ日記です" }, { status: 400 });
    }

    // 論理削除
    const deleted = await prisma.cafeDiary.update({
      where: { id, userId: payload.userId },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ message: "認証情報がありません" }, { status: 401 });
    }
    console.error("Cafe diary delete error:", error);
    return NextResponse.json({ message: "カフェ日記を削除できませんでした" }, { status: 500 });
  }
}
