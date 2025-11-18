"use client";

import React, { useState } from "react";
import { Coffee, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginUserValidation } from "@/validations/user-validation";
import { apiClient } from "@/lib/api";
import { toast } from "sonner";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type LoginFormData = z.infer<typeof loginUserValidation>;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginUserValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: LoginFormData) => {
    setLoading(true);

    try {
      await apiClient.login(data);
      toast.success("ログインしました");
      router.push("/cafe-diary");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "ログインに失敗しました");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-amber-100">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-4 rounded-2xl shadow-lg">
              <Coffee className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-amber-900 mb-2">ログイン</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-amber-900">メールアドレス</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400 pointer-events-none" />
                        <Input
                          type="email"
                          className="w-full pl-11 pr-4 py-3 bg-white border-amber-200 focus:ring-amber-400 text-amber-900 placeholder-amber-300"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-amber-900">パスワード</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400 pointer-events-none" />
                        <Input
                          type="password"
                          className="w-full pl-11 pr-4 py-3 bg-white border-amber-200 focus:ring-amber-400 text-amber-900 placeholder-amber-300"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-3 rounded-xl font-medium hover:from-amber-500 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
              >
                {loading ? "処理中..." : "ログイン"}
              </button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/register")}
              className="text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
            >
              新規登録はこちら
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
