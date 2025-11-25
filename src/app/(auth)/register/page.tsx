import React from "react";
import { Metadata } from "next";
import UserRegisterForm from "@/components/molecules/UserRegisterForm";

// メタデータを生成
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "新規登録",
    description: "新規登録ページ",
    keywords: ["新規登録", "ユーザー", "登録"],
  };
}

const RegisterPage = () => {
  return <UserRegisterForm />;
};

export default RegisterPage;
