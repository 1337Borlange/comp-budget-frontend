// import { getServerSession } from 'next-auth';
// import { NextRequest, NextResponse } from 'next/server';
// import { authOptions } from '../../auth/[...nextauth]/route';
// import { revalidatePath } from 'next/cache';
// import { apiFetch } from '@/lib/helpers';
// import { apiUrl } from '@/lib/settings';

// export async function DELETE(request: NextRequest) {
//   const session = await getServerSession(authOptions);
//   const id = request.nextUrl.searchParams.get('id');
//   const deleted = await apiFetch(
//     (session as any)?.id_token,
//     `${apiUrl}/adm/expenses?expenseId=${id}`,
//     { method: 'DELETE' }
//   );
//   if (deleted.status !== 200) {
//     throw new Error('Could not delete expense.');
//   }
//   revalidatePath('/admin');
//   return NextResponse.json({ revalidated: true, now: Date.now() });
// }

// export default async function GET(req: Request, res: Response) {
//     const query = req.query;
//     const { userId } = query;
// }
