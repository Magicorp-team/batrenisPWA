import { User } from './user';

export class News {
  id: number | null;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: User | null;
}
