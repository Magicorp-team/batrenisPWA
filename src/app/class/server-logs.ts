import { Action } from './action';
import { User } from './user';

export class ServerLogs {
  id: number | null;
  title: string;
  description: string;
  username: string;
  date: Date;
  user: User | null;
  action: Action | null;
  statusServerLog: string;
}
