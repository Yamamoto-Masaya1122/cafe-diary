import LoginForm from "@/components/molecules/LoginForm";
import { Metadata } from "next";

// メタデータを生成
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "ログイン",
    description: "ログインページ",
    keywords: ["ログイン", "ユーザー", "認証"],
  };
}

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
