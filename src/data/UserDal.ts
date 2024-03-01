// write db interactions here.
// then invoke these dal functions in server components. or in session handler, in the case of ME call.
import {db} from '@/lib/PrismaClient';
import { Users } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export async function getMe():Promise<Users | null>{
  const session = await getServerSession(authOptions);
  if(!session) return null;

  return await getUserByEmail(session.user?.email as string);
}

export async function getUserByEmail(email: string):Promise<Users | null> {
   return db.users.findFirst({
    where: {
      Email: email
    }
  });
}



