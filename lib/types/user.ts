export type UserWithoutId = {
  full_name: string;
  email: string;
  image?: string;
};

export type User = UserWithoutId & {
  id: number;
};
