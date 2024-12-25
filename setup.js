#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

async function main() {
  try {
    // Get project name
    const projectName = await question("Enter project name: ");
    const projectPath = path.join(process.cwd(), projectName);

    // Create project directory
    console.log(`\n🚀 Creating new project in ${projectPath}...`);
    fs.mkdirSync(projectPath, { recursive: true });

    // Copy template files
    console.log("📁 Copying template files...");
    copyDirectory(path.join(__dirname, "template"), projectPath);

    // Update package.json
    console.log("📝 Updating package.json...");
    const packageJsonPath = path.join(projectPath, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    packageJson.name = projectName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Update import aliases in tsconfig.json
    console.log("🔧 Updating tsconfig.json paths...");
    const tsconfigPath = path.join(projectPath, "tsconfig.json");
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf8"));

    // Ensure paths are relative to the new project root
    if (tsconfig.compilerOptions && tsconfig.compilerOptions.paths) {
      Object.keys(tsconfig.compilerOptions.paths).forEach((alias) => {
        tsconfig.compilerOptions.paths[alias] = tsconfig.compilerOptions.paths[
          alias
        ].map((p) => (p.startsWith("./") ? p : "./" + p));
      });
    }
    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));

    // Initialize git repository
    console.log("🔰 Initializing git repository...");
    execSync("git init", { cwd: projectPath });

    // Install dependencies
    console.log("📦 Installing dependencies...");
    execSync("npm install", { cwd: projectPath, stdio: "inherit" });

    console.log("\n✅ Project setup complete!");
    console.log("\nNext steps:");
    console.log(`1. cd ${projectName}`);
    console.log("2. Create .env.local file from .env.example");
    console.log("3. npm run dev");

    rl.close();
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
}

function copyDirectory(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });

  entries.forEach((entry) => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

main();
