import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

function walkDir(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      walkDir(fullPath)
    } else if (file.endsWith('.png') || file.endsWith('.jpeg') || file.endsWith('.jpg')) {
      const webpPath = fullPath.replace(/\.(png|jpeg|jpg)$/, '.webp')
      console.log(`Converting ${file} -> ${path.basename(webpPath)}`)
      try {
        execSync(`npx -y sharp-cli -i "${fullPath}" -o "${webpPath}" -q 85`, { stdio: 'inherit' })
      } catch (err) {
        console.error(`Failed to convert ${fullPath}`, err)
      }
    }
  }
}

const targetDir = path.join(process.cwd(), 'public', 'selected work projects')
walkDir(targetDir)
console.log('All project images converted to WebP successfully!')
