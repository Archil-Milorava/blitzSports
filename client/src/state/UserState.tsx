import { atomWithStorage } from 'jotai/utils'

interface User {
  id: string;
  fullName: string;
  nickName: string;
  avatar: string;
  roles: string[];
  createdAt: string;
}


export const userAtom = atomWithStorage<User | null>('user',null)