const fs = require("fs-extra");
const path = require("path");

const sourcePath = path.resolve(__dirname);
const targetPath = path.resolve(
  process.env.LOCALAPPDATA,
  "FoundryVTT", "Data", "systems", "rsk"
);

console.log(`🔄 Syncing from ${sourcePath} to ${targetPath}...`);

/**
 * Recursively deletes files/folders in targetPath that do not exist in sourcePath.
 * Dotfolders are excluded from both deletion and copying.
 */
async function cleanObsoleteFiles(src, dest) {
  const entries = await fs.readdir(dest);

  for (const entry of entries) {
    if (entry.startsWith(".")) continue; // skip dotfolders

    const srcItem = path.join(src, entry);
    const destItem = path.join(dest, entry);

    const existsInSource = await fs.pathExists(srcItem);

    if (!existsInSource) {
      console.log(`🗑️ Removing obsolete: ${destItem}`);
      await fs.remove(destItem);
    } else {
      const stat = await fs.stat(destItem);
      if (stat.isDirectory()) {
        await cleanObsoleteFiles(srcItem, destItem);
      }
    }
  }
}

/**
 * Filters out folders and files starting with a dot.
 */
function filterDotFolders(src, dest) {
  return !path.basename(src).startsWith(".");
}

(async () => {
  try {
    await fs.ensureDir(targetPath);
    await cleanObsoleteFiles(sourcePath, targetPath);
    await fs.copy(sourcePath, targetPath, {
      overwrite: true,
      filter: filterDotFolders
    });
    console.log("✅ System synced successfully to Foundry VTT.");
  } catch (err) {
    console.error("❌ Sync failed:", err);
  }
})();
