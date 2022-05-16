#!/usr/bin/env node
const chalk = require("chalk");
const { Command } = require("commander");
const figlet = require("figlet");
// 导入当前根目录下的package.json文件，
// 为了获取对应的字段值，比如版本version
const package = require("../package");
// 初始化
const program = new Command();

program
  .version(
    `l-cli ${package.version}`,
    "-v, --version",
    "display version for vta-cli"
  )
  .usage("<command> [options]");

program.name("lcf").usage("<command> [options]");

// 监听 --help 指令
program.on("--help", function () {
  console.log(
    "\r\n" +
      figlet.textSync("lcf-cli", {
        font: "3D-ASCII",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
  );
  // 前后两个空行调整格式，更舒适
  console.log();
  console.log(
    ` Run ${chalk.cyan(
      "lcf <command> --help"
    )} for detailed usage of given command.`
  );
  console.log();
});

program
  .command("create <name>")
  .description("create a new project")
  .option("-f, --force", "忽略文件夹检查，如果已存在则直接覆盖")
  .action((source, destination) => {
    require("../lib/create")(source, destination);
  });

try {
  program.parse(process.argv);
} catch (error) {
  console.log("err: ", error);
}
