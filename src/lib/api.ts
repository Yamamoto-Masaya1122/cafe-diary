import { UserFormData, LoginFormData } from "@/types/user";

export const register = async (userFormData: UserFormData) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userFormData),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "登録に失敗しました");
    }

    const data = await response.json();

    // トークンをlocalStorageに保存
    if (data.token) {
      localStorage.setItem("authToken", data.token);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (loginFormData: LoginFormData) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginFormData),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "ログインに失敗しました");
    }

    const data = await response.json();

    // トークンをlocalStorageに保存
    if (data.token) {
      localStorage.setItem("authToken", data.token);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    // トークンをlocalStorageから削除
    localStorage.removeItem("authToken");

    // サーバー側のログアウトAPIを呼ぶ
    await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
