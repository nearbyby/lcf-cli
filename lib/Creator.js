const downloadGitRepo = require("download-git-repo");
const util = require("util");
const { repoPath } = require("../utils/config");
const { loading } = require("../utils");
const chalk = require("chalk");
const path = require("path");
const inquirer = require("inquirer");

class Creator {
  // 项目名称及项目路径
  constructor(name, target) {
    this.name = name;
    this.target = target;
    this.downloadGitRepo = util.promisify(downloadGitRepo); // 仓库信息 —— 模板信息
  }
  // 创建项目部分
  async create() {
    console.log(this.name, this.target);
    let repo = await this.getRepoInfo();
    // 下载模板
    await this.download(repo);
    // 模板使用提示
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
    console.log("  yarn install");
    console.log("  yarn serve\r\n");
  }

  // 获取模板信息及用户选择的模板
  async getRepoInfo() {
    // 提取仓库名
    const repos = repoPath.map((item) => item.name);
    // 选取模板信息
    let { repo } = await new inquirer.prompt([
      {
        name: "repo",
        type: "list",
        message: "Please choose a template to create project",
        choices: repos,
      },
    ]);
    console.log(repo);
    return repo;
  }

  // 下载git仓库
  async download(repo) {
    // 模板下载地址
    const templateUrl = repoPath.find((item) => item.name === repo).repo;
    // 调用 downloadGitRepo 方法将对应模板下载到指定目录
    await loading(
      "downloading template, please wait",
      this.downloadGitRepo,
      templateUrl,
      path.resolve(process.cwd(), this.target) // 项目创建位置
    );
  }
}

module.exports = Creator;
