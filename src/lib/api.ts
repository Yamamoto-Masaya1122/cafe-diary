import { UserFormData, LoginFormData } from "@/types/user";
import { CafeDiaryData } from "@/types/cafe-diary";

const API_BASE_URL = "/api";

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private getAuthToken() {
    if (typeof window === "undefined") return null;
    const stored = sessionStorage.getItem("userData");
    if (!stored) return null;
    try {
      const parsed = JSON.parse(stored);
      return parsed.token as string | undefined;
    } catch (error) {
      console.error("Failed to parse userData from sessionStorage:", error);
      return null;
    }
  }

  async register(userFormData: UserFormData) {
    try {
      const response = await fetch(`${this.baseUrl}/register`, {
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
  }

  async login(loginFormData: LoginFormData) {
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

      // ログイン情報をセッションに保存
      if (data.token) {
        sessionStorage.setItem("userData", JSON.stringify(data));
      }

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async logout() {
    try {
      // ログイン情報をセッションから削除
      sessionStorage.removeItem("userData");

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
  }

  async createCafeDiary(cafeDiaryData: CafeDiaryData): Promise<CafeDiaryData> {
    try {
      const token = this.getAuthToken();
      if (!token) {
        throw new Error("ログイン情報が見つかりません");
      }

      const response = await fetch(`${this.baseUrl}/cafe-diary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cafeDiaryData),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "カフェ日記を作成できませんでした");
      }
      const data: CafeDiaryData = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getCafeDiaries(): Promise<CafeDiaryData[]> {
    try {
      const token = this.getAuthToken();
      if (!token) {
        throw new Error("ログイン情報が見つかりません");
      }

      const response = await fetch(`${this.baseUrl}/cafe-diary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "カフェ日記を取得できませんでした");
      }

      const data: CafeDiaryData[] = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateCafeDiary(cafeDiaryData: CafeDiaryData): Promise<CafeDiaryData> {
    try {
      const token = this.getAuthToken();
      if (!token) {
        throw new Error("ログイン情報が見つかりません");
      }
      const response = await fetch(`${this.baseUrl}/cafe-diary/${cafeDiaryData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cafeDiaryData),
      });
      if (!response.ok) {
        console.log("エラーが発生しました", response);
        const data = await response.json();
        throw new Error(data.message || "カフェ日記を更新できませんでした");
      }
      const data: CafeDiaryData = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
