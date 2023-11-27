import { apiFetch } from "@/lib/helpers";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { apiUrl } from "@/lib/settings";
let accessToken;

export async function POST(req: Request, res: Response) {
  return NextResponse.json({ status: 200 });
}

// async function getUser() {
//   const headersInstance = headers()
//   const authorization = headersInstance.get('authorization')
//   // Forward the authorization header
//   const res = await fetch('...', {
//     headers: { authorization },
//   })
//   return res.json()
// }

// export async function GET(req: Request, res: NextApiResponse) {
//   const session = await getSession({ req });

//   if (!session) {
//     return NextResponse.json({
//       error: 'Internal Server Error. No session found.',
//       status: 500,
//     });
//   }

//   // const token = await getToken({ req, secret });

//   const response = await apiFetch(
//     (session as any).id_token,
//     `${apiUrl}/expenses?userId=${(session as any)?.userId}`
//   );

//   if (response.status !== 200) {
//     return NextResponse.json({
//       error: 'Internal Server Error',
//       status: response.status,
//     });
//   }

//   const data = await response.json();

//   return NextResponse.json({ data });
// }
// export default getExpenses;
