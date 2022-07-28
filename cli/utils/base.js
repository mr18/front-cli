import jsonFormat from "json-format";
import { resolvePath, resolvePwdPath } from "./path.js";
import ora from "ora";
const myOra = ora();
export const logger = myOra;

export const getProjectInfo = (name) => {
  return {
    name,
    cacheDir: resolvePath("./.micro/" + name),
    dir: resolvePwdPath(name),
  };
};

export const toJson = (obj) => {
  return jsonFormat(obj, { type: "space", size: 2 });
};
export const addValue = (obj, keySp, value) => {
  if (!keySp.length) return;
  let sk = keySp.shift();
  if (!keySp.length) {
    obj[sk] = value;
  } else {
    !obj[sk] && (obj[sk] = {});
    addValue(obj[sk], keySp, value);
  }
};
