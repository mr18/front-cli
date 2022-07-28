import inquirer from "inquirer";
import { getProjectInfo } from "../utils/base.js";
import tplConfig from "../../template/config.js";
import create, { checkExist } from "./create.js";

const main = async (pjName, options) => {
  if (!checkExist(pjName)) {
    if (options.remote) {
      createPorject(pjName, "remote", options.remote);
    } else {
      let promptOpt = {
        name: "type",
        message: "请选择项目类型",
        type: "list",
        choices: Object.keys(tplConfig),
      };
      let promptRes = await inquirer.prompt(promptOpt);
      createPorject(pjName, promptRes.type);
    }
  }
};
export const createPorject = (pjName, type, remote) => {
  let projectInfo = getProjectInfo(pjName);
  projectInfo.type = type;
  projectInfo.git = remote || tplConfig[type];
  create(projectInfo);
};

export default main;
