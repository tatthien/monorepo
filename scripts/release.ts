import { execSync } from 'child_process';
import { readJSONSync } from 'fs-extra';
import chalk from 'chalk';

const { version: oldVersion } = readJSONSync('package.json');

execSync('npx bump', { stdio: 'inherit' });

const { version } = readJSONSync('package.json');

if (oldVersion === version) {
  console.log(chalk.red('No version change'));
  process.exit()
}

execSync('npm run update', { stdio: 'inherit' })
execSync('git add .', { stdio: 'inherit' })
execSync(`git commit -m "chore: release v${version}"`, { stdio: 'inherit' })
execSync(`git tag -a v${version} -m "v${version}"`, {stdio: 'inherit'})
