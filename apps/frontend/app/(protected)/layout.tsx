import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { JSX } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function RoomsLayout({
  children,
}: LayoutProps): Promise<JSX.Element> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    redirect("/");
  }
  try {
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string);
  } catch {
    redirect("/");
  }

  return <>{children}</>;
}
