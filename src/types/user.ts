export interface UserFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}
