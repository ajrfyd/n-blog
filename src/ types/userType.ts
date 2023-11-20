export type UserRole = "user" | "admin" | null;

export type UserStateType = {
  name: string;
  role: UserRole;
  isLogin?: boolean;
};