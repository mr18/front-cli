import fse from "fs-extra";
import childProcess from "child_process";
import { spawn } from "cross-spawn";
export const downloadGit = async (gitRepo, dir) => {
  return new Promise((res, rej) => {
    try {
      fse.removeSync(dir);
      let result = childProcess.spawnSync("git", ["clone", gitRepo, dir]);
      if (result.status == 0) {
        res();
      } else {
        throw result.stderr.toString();
      }
    } catch (err) {
      throw err;
    }
  });
};
export const initPack = async (dir) => {
  return new Promise((res, rej) => {
    try {
      spawn("yarn", ["install"], { cwd: dir }, () => {
        res();
      });
    } catch (e) {
      try {
        spawn("npm", ["install"], { cwd: dir });
        res();
      } catch (e) {
        rej(e);
      }
    }
  });
};
