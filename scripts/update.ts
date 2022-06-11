import fs from 'fs-extra'
import { join, resolve } from 'path'

const packages = fs
  .readdirSync(resolve(__dirname, '../packages'))
  .filter(p => !p.endsWith('.ts') && !p.startsWith('.'))

function updatePackageJson() {
  const { version } = fs.readJSONSync('package.json')
  
  for (const pkg of packages) {
    const packageDir = join(__dirname, '../packages', pkg)
    const packageJsonPath = join(packageDir, 'package.json')
    const packageJSON = fs.readJSONSync(packageJsonPath)
    packageJSON.version = version

    fs.writeJSONSync(packageJsonPath, packageJSON, { spaces: 2 })
  }
}

async function run() {
  await Promise.all([
    updatePackageJson(),
  ])
}

run()
