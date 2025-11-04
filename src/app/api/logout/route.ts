import { NextResponse } from "next/server";

export async function POST() {
  try {
    // サーバー側で必要な処理（セッションの削除など）があればここに記述
    return NextResponse.json({ message: "ログアウトしました" }, { status: 200 });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "ログアウトに失敗しました" }, { status: 500 });
  }
}
