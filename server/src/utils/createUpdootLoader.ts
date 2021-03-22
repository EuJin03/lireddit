import DataLoader from "dataloader";
import { Updoot } from "../entities/Updoot";

// keys = [{postId: 5, userId: 10}] / userId
// return {postId: 5, userId: 10, value: 1}
export const createUpdootLoader = () =>
  new DataLoader<{ postId: Number; userId: number }, Updoot | null>(
    async keys => {
      const updoots = await Updoot.findByIds(keys as any);
      const updootIdsToUpdoot: Record<string, Updoot> = {};
      updoots.forEach(updoot => {
        updootIdsToUpdoot[`${updoot.userId}|${updoot.postId}`] = updoot;
      });

      // console.log("updootmap: ", updoots);
      const keymap = keys.map(
        key => updootIdsToUpdoot[`${key.userId}|${key.postId}`]
      );

      // console.log("keymap: ", keymap);
      return keymap;
    }
  );
// batch and cache
