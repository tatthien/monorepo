import fs from 'fs-extra'
import { join, resolve } from 'path'
import { execSync } from 'child_process'

const { version } = fs.readJSONSync('package.json')

const packages = fs
  .readdirSync(resolve(__dirname, '../packages'))
  .filter(p => !p.endsWith('.ts') && !p.startsWith('.'))

const getPkgRoot = pkg => resolve(__dirname, '../packages', pkg)

for (const pkg of packages) {
  publishPackage(pkg, version)
}

function publishPackage(pkg: string, version: string) {
  const pkgRoot = getPkgRoot(pkg)
  execSync('npm publish --access public', { cwd: pkgRoot, stdio: 'inherit' })
}
