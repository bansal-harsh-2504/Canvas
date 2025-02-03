import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

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
  } catch (error) {
    redirect("/");
  }

  return <>{children}</>;
}
