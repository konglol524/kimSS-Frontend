import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      data: {
        _id: string;
        name: string;
        telephone: string;
        email: string;
        role: string;
        point: number;
      }

      token: string;
    };
  }
}
