import fs from "fs";
import path from "path";

export default function (filepath1, filepath2) {
  const fileContent1 = fs.readFileSync(path.resolve(filepath1));
  const fileContent2 = fs.readFileSync(path.resolve(filepath2));

  const file1 = JSON.parse(fileContent1);
  const file2 = JSON.parse(fileContent2);

  const result = ["{"];

  for (const [key, value] of Object.entries(file1)) {
    if (key in file2) {
      if (value === file2[key]) {
        result.push(`    ${key}: ${value}`);
      } else {
        result.push(`  - ${key}: ${value}`);
        result.push(`  + ${key}: ${file2[key]}`);
      }
    } else {
      result.push(`  - ${key}: ${value}`);
    }
  }

  for (const [key, value] of Object.entries(file2)) {
    if (!(key in file1)) {
      result.push(`  + ${key}: ${value}`);
    }
  }

  result.push("}");

  return result.join("\n").trim();
}