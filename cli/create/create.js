import { downloadGit } from "../utils/load.js";
import Packager from "./packager.js";
import simpleGit from "simple-git";
import fse from "fs-extra";
import path from "path";
const git = simpleGit();
import ora from "ora";
import { resolvePwdPath } from "../utils/path.js";
import chalk from "chalk";
const myOra = ora();
const create = async (config) => {
  if (!checkExist(config.name)) {
    const spinner = ora("项目生成中...\n");
    spinner.start();
    if (fse.existsSync(config.dir)) {
      spinner.fail(`项目目录: ${config.name} ，已存在，请修改项目名称后重试！\n`);
      spinner.stop();
      return;
    }
    try {
      await downloadGit(config.git, config.cacheDir);
      await createMain(config);
      await createPackage(config);
      clear(config.cacheDir, config.dir);

      spinner.succeed(`项目 ${chalk.green(config.name)} 生成成功！\n`);
      spinner.info(`请使用 ${chalk.green("yarn install")} or ${chalk.green("npm install")} 安装依赖\n`);
      spinner.info(`更多详情请查看 ${chalk.green("READMME.MD")} \n`);
      spinner.stop();
    } catch (e) {
      console.error(e);
      spinner.stop();
    }
  }
};
const createMain = async (config) => {
  return fse.copy(config.cacheDir, config.dir);
};

const clear = async (cacheDir, dir) => {
  fse.removeSync(path.resolve(dir, "./package-lock.json"));
  fse.removeSync(path.resolve(dir, "./yarn-lock.json"));
};
const createPackage = async (config) => {
  const packager = new Packager(config.cacheDir, config.dir);
  packager.read();
  try {
    const gitInfos = await git.getRemotes(true);
    const gitInfo = gitInfos.filter((item) => item.name == "origin")[0];
    if (gitInfo) {
      packager.setValue("repository", { type: "git", url: gitInfo.refs.fetch || gitInfo.refs.push });
    }
  } catch (e) {
    console.error(e);
  }
  packager.setValue("name", config.name);
  packager.write();
};
export const checkExist = (name) => {
  let dir = resolvePwdPath(name);
  if (fse.existsSync(dir)) {
    myOra.fail(`项目目录: ${name} ，已存在，请修改项目名称后重试！`);
    return true;
  }
  return false;
};
export default create;
