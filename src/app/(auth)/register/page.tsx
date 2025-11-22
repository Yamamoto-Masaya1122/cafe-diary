import React from "react";
import { Metadata } from "next";
import RegisterForm from "@/components/molecules/RegisterForm";

// メタデータを生成
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "新規登録",
    description: "新規登録ページ",
    keywords: ["新規登録", "ユーザー", "登録"],
  };
}

const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;
