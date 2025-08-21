#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import { execSync } from "child_process";
import path from "path";
import fs from "fs";
async function main() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'project_name',
            message: chalk.green('Enter your project name:')
        },
        {
            type: 'list',
            name: 'project_template',
            message: chalk.green("Choose your template"),
            choices: [
                {
                    name: chalk.blue('React-Template'),
                    value: 'reactTemplate'
                },
                {
                    name: chalk.yellow('React-Tailwind-Template'),
                    value: 'reactTailwindTemplate'
                },
                {
                    name: chalk.redBright('React-Router-Template'),
                    value: 'reactRouterTemplate'
                },
                {
                    name: chalk.red('React-Router-Tailwind-Template'),
                    value: 'reactRouterTailwindTemplate'
                },
                {
                    name: chalk.gray('React-Shadcn-Tailwind-Template'),
                    value: 'reactShadcnTemplate'
                },
                {
                    name: chalk.cyan('Backend-Template'),
                    value: 'backendTemplate'
                },
                {
                    name: chalk.whiteBright('React-Fullstack-Template'),
                    value: 'reactFullstackTemplate'
                }
            ]
        }
    ]);
    const projectName = answers.project_name;
    const projectTemplate = answers.project_template;
    const spinner = createSpinner(chalk.yellow("Creating your project...")).start();
    try {
        const repoMap = {
            reactTemplate: 'https://github.com/yaseenrehan123/react-template.git',
            reactTailwindTemplate: 'https://github.com/yaseenrehan123/react-tailwind-template.git',
            reactRouterTemplate: '',
            reactRouterTailwindTemplate: '',
            reactShadcnTemplate: 'https://github.com/yaseenrehan123/react-shadcn-template.git',
            backendTemplate: 'https://github.com/yaseenrehan123/backend-template.git',
            reactFullstackTemplate: 'https://github.com/yaseenrehan123/fullstack-template.git'
        };
        const repo = repoMap[projectTemplate];
        if (!repo) {
            spinner.error({ text: chalk.red(`No repo template configured for ${projectTemplate}`) });
            return;
        }
        execSync(`git clone ${repo} ${projectName}`, { stdio: "inherit" });
        const projectPath = path.join(process.cwd(), projectName);
        fs.rmSync(path.join(projectPath, ".git"), { recursive: true, force: true });
        execSync(`git init`, { cwd: projectPath, stdio: "inherit" });
        if (fs.existsSync(path.join(projectPath, "package.json"))) {
            execSync(`npm install`, { cwd: projectPath, stdio: "inherit" });
        }
        else {
            console.log(chalk.yellow("Warning: Unable to find package.json"));
        }
        spinner.success({ text: chalk.green("Project created successfully!") });
    }
    catch (err) {
        spinner.error({ text: chalk.red("Failed to create project.") });
        console.error(err);
    }
}
await main();
//# sourceMappingURL=index.js.map