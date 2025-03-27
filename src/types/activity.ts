import { User } from './user';

export interface RecentActivity {
  id: string;
  userId: string;
  user: User;
  action: string;
  target: string;
}
