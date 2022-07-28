#! /usr/bin/env node

import { program } from "commander";
const execCmd = (cmd, name, options) => {
  try {
    import(`../cli/${cmd}/index.js`)
      .then((mod) => {
        mod.default(name, options);
      })
      .catch((e) => {
        console.error(e);
      });
  } catch (err) {
    console.error(err);
  }
};

// 初始化项目
// 初始化后，参考npm,yarn,webpack进行项目构建
program
  .command("create <project-name>") // 定义init命令
  .description("初始化项目")
  .option("-r,--remote <remote>", "git remote Repo")
  .action((name, options) => {
    console.log(name, options || {});
    execCmd("create", name, options);
  });
// program
//   .command("list")
//   .description("模板列表")
//   .action(() => {
//     execCmd("list");
//   });
program.parse(process.argv);
