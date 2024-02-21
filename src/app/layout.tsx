import type { Metadata } from "next";
import { Providers } from "@/lib/Providers";

import "../styles/style.scss";
import { Main } from "@/components/Main";
import { auth } from "@/lib/auth";

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
  const session = await auth();

  return (
    <Providers session={session}>
      <Main>{children}</Main>
    </Providers>
  );
}
