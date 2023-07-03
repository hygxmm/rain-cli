const fs = require("fs-extra");
const path = require("path");
const inquirer = require("inquirer");
const Creator = require("../utils/Creator");

module.exports = async function (projectName, options) {
  //   console.log(projectName, options);
  // 获取当前工作目录
  const cwd = process.cwd();
  // 拼接得到项目目录
  const targetDir = path.join(cwd, projectName);
  // 判断目录是否已经存在
  if (fs.existsSync(targetDir)) {
    // 判断是否使用强制创建
    if (options.force) {
      await fs.remove(targetDir);
    } else {
      let { isOverwrite } = await inquirer.prompt([
        {
          name: "isOverwrite",
          type: "confirm",
          message:
            "Target directory already exists. Are you sure to overwrite it?",
        },
      ]);
      if (isOverwrite) {
        await fs.remove(targetDir);
      } else {
        console.log("cancel create");
        return;
      }
    }
  }
  const creator = new Creator(projectName, targetDir);
  creator.create();
};
