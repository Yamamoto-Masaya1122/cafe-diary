import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/db";
import { loginUserValidation } from "@/validations/user-validation";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // バリデーション
    const validationResult = loginUserValidation.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ message: validationResult.error.message }, { status: 400 });
    }

    const { email, password } = validationResult.data;

    // ユーザー検索
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "メールアドレスまたはパスワードが正しくありません" }, { status: 401 });
    }

    // パスワード照合
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "メールアドレスまたはパスワードが正しくありません" }, { status: 401 });
    }

    // JWTトークン生成
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return NextResponse.json(
      {
        message: "ログインに成功しました",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "ログインに失敗しました" }, { status: 500 });
  }
}
