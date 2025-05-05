const fs = require("fs");
const path = require("path");

const packsDir = path.resolve(__dirname, "packs");

// Helper: Get list of directories inside `packs/`
function getSubfolders(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && !entry.name.startsWith("."))
    .map(entry => entry.name);
}

// Helper: Load all JSON files from a folder
function loadJsonFiles(folderPath) {
  const files = fs.readdirSync(folderPath)
    .filter(f => f.endsWith(".json") && !f.startsWith("."));
  return files.map(file => {
    const fullPath = path.join(folderPath, file);
    try {
      const contents = fs.readFileSync(fullPath, "utf-8");
      return JSON.parse(contents);
    } catch (err) {
      console.error(`⚠️ Failed to parse ${file}: ${err.message}`);
      return null;
    }
  }).filter(Boolean);
}

// Compile each subfolder to .db
function compileAll() {
  const subfolders = getSubfolders(packsDir);

  for (const folder of subfolders) {
    const folderPath = path.join(packsDir, folder);
    const outputPath = path.join(packsDir, `${folder}.db`);

    const entries = loadJsonFiles(folderPath);
    const output = entries.map(e => JSON.stringify(e)).join("\n");

    fs.writeFileSync(outputPath, output, "utf-8");
    console.log(`✅ Compiled ${entries.length} entries to ${folder}.db`);
  }
}

compileAll();
