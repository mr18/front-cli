import fse from "fs-extra";
import jsonFormat from "json-format";
import path from "path";
export default class Packager {
  constructor(from, to) {
    this.data = {};
    if (!/package\.json$/.test(from)) {
      from = path.resolve(from, "./package.json");
    }
    this.from = from;
    this.to = to;
  }
  _addValue(obj, keySp, value) {
    if (!keySp.length) return;
    const sk = keySp.shift();
    if (!keySp.length) {
      obj[sk] = value;
    } else {
      !obj[sk] && (obj[sk] = {});
      this._addValue(obj[sk], keySp, value);
    }
  }
  setValue(key, value) {
    const keySp = key.split(".");
    this._addValue(this.data, keySp, value);
    return this.data;
  }
  write() {
    fse.writeFileSync(path.resolve(this.to, "./package.json"), this.toJson());
  }
  read() {
    try {
      this.data = fse.readJsonSync(this.from);
    } catch (e) {
      console.error(e);
    }
  }
  toJson() {
    return jsonFormat(this.data, { type: "space", size: 2 });
  }
}
