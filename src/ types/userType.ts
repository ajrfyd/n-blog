export type UserRole = "user" | "admin";

export type UserStateType = {
  name: string;
  role: UserRole;
  isLogin?: boolean;
};