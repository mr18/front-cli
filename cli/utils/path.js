import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
export const resolvePwdPath = (dir) => {
  return path.resolve(process.cwd(), dir);
};

export const resolvePath = (dir) => {
  const filename = fileURLToPath(import.meta.url);
  const dirpath = dirname(filename);
  return path.resolve(dirpath, dir);
};
