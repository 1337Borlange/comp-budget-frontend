import type { Metadata } from "next";
import { Providers } from "@/lib/Providers";

import { getServerSession } from "next-auth";
import { authOptions } from '@/auth';
import "../styles/style.scss";
import { Main } from "@/components/Main";

export const metadata: Metadata = {
  title: {
    template: "%s | tretton37",
    default: "tretton37", // a default is required when creating a template
  },
  description: "View your company competence budget",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <Providers session={session}>
      <Main>{children}</Main>
    </Providers>
  );
}
