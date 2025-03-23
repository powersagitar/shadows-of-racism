export type UserWithoutId = {
  name: string;
  email: string;
  role: "artist" | "teacher";
  image?: string;
};

export type User = UserWithoutId & {
  id: number;
};
