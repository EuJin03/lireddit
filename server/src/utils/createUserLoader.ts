import DataLoader from "dataloader";
import { User } from "../entities/User";

// keys = [1, 31, 124, 16] / userId
// return [{id: 1, username: "eugene"}, {}, {}] object of user
export const createUserLoader = () =>
  new DataLoader<number, User>(async userIds => {
    const users = await User.findByIds(userIds as number[]);

    const userIdToUser: Record<number, User> = {};
    users.forEach(u => {
      userIdToUser[u.id] = u;
      // {key: value}
    });

    return userIds.map(userId => userIdToUser[userId]);
  });
// batch and cache
