const downloadGitRepo = require("download-git-repo");
const ora = require("ora");
const { getTemplateRepo, getTemplateTags } = require("../utils/api.js");
const inquirer = require("inquirer");

class Creator {
  constructor(name, targetDir) {
    this.name = name;
    this.targetDir = targetDir;
  }
  async create() {
    console.log(this.name, this.targetDir);
    this.download();
    // await this.getRepoInfo();
    await this.getTagInfo("react-vite-template");
  }
  // 获取模板信息及最终选择的模板
  async getRepoInfo() {
    let repos = await getTemplateRepo();
    // 过滤出仓库名
    repos = repos.map((item) => item.name);
    // 选择仓库
    const { repo } = await inquirer.prompt([
      {
        name: "repo",
        type: "list",
        message: "please choose a template to create project",
        choices: repos,
      },
    ]);
    console.log(repo);
  }
  //
  async getTagInfo(repo) {
    let tags = await getTemplateTags(repo);
    console.log(tags, "-------");
    tags = tags.map((item) => item.name);
    const { tag } = await inquirer.prompt([
      {
        name: "tag",
        type: "list",
        message: "please choose a tag to create project",
        choices: tags,
      },
    ]);
    console.log(tag);
  }
  async download() {
    const templateUrl = "github:hygxmm/react-vite-template#1.0.0";
    const spinner = ora();
    spinner.start(); // 开启加载
    downloadGitRepo(templateUrl, this.targetDir, (err) => {
      if (!err) {
        spinner.succeed(); // 结束加载
        console.log("create success");
      } else {
        spinner.fail(); // 结束加载
        console.log("create fail");
      }
    });
  }
}

module.exports = Creator;
