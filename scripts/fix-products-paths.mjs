import fs from "fs";
import path from "path";

const productsPath = "client/public/api/products.json";
const assetsDir    = "client/public/assets";

function candidates(name) {
  const base = path.basename(name || "");
  const dec  = decodeURIComponent(base);
  const withUnderscores = dec.replace(/\s+/g, "_");
  const collapse = withUnderscores.replace(/_+/g, "_");

  // try several plausible variants
  const set = new Set([
    base,
    dec,
    withUnderscores,
    collapse,
    dec.toLowerCase(),
    withUnderscores.toLowerCase(),
    collapse.toLowerCase(),
  ]);
  return [...set];
}

function findExisting(fileBase) {
  for (const c of candidates(fileBase)) {
    const full = path.join(assetsDir, c);
    if (fs.existsSync(full)) return c; // return the actual existing filename
  }
  return null;
}

function main() {
  if (!fs.existsSync(productsPath)) {
    console.error("Cannot find", productsPath);
    process.exit(1);
  }
  const raw = fs.readFileSync(productsPath, "utf8");
  let data = JSON.parse(raw);

  let changed = 0, missing = [];
  data = data.map((prod) => {
    const src = prod.image ?? prod.imageUrl ?? "";
    const fileBase = src.replace(/^assets\//, "");
    const found = findExisting(fileBase);

    if (found) {
      const newUrl = `assets/${found}`;
      if (prod.imageUrl !== newUrl || prod.image) {
        changed++;
        return { ...prod, imageUrl: newUrl, image: undefined };
      }
      return prod;
    } else {
      missing.push({ id: prod.id, wanted: fileBase });
      return prod;
    }
  });

  fs.writeFileSync(productsPath, JSON.stringify(data, null, 2) + "\n", "utf8");

  console.log(`Updated ${changed} product image paths.`);
  if (missing.length) {
    console.log("\nStill missing (no matching file found):");
    for (const m of missing) console.log(`- id ${m.id}: ${m.wanted}`);
    process.exitCode = 1;
  }
}

main();
