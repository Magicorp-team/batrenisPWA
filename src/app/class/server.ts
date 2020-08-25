import { Action } from './action';
import { ServerLogs } from './server-logs';
import { User } from './user';

interface ServerEnv {
  key: string;
  value: string;
}

export class Server {
  id: number | null;
  title: string;
  description: string;
  name: string | null;
  serverInstallDir: string | null;
  saveDir: string | null;
  serverEnv: ServerEnv[] | null;
  hostname: string | null;
  backupActive: boolean | null;
  autorestartActive: boolean | null;
  autorestartTime: string | null;
  type: string;
  status: string;
  managers: User[];
  actions: Action[];
  serverLogs: ServerLogs[] | null;
}
