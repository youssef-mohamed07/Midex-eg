import { schemaTypes } from "../src/sanity/schemas/index";

const paths = new Set<string>();

function traverseType(typeDef: any, path = "") {
  if (!typeDef || !typeDef.fields) return;

  for (const field of typeDef.fields) {
    const currentPath = path ? `${path}.${field.name}` : field.name;
    paths.add(currentPath);

    if (field.type === "object" || field.type === "document") {
      traverseType(field, currentPath);
    } else if (field.type === "array" && field.of) {
      for (const member of field.of) {
        if (member.type === "object") {
           // Inline object in array
           traverseType(member, `${currentPath}[]`);
        } else {
           const refType = schemaTypes.find((t: any) => t.name === member.type);
           if (refType) {
              traverseType(refType, `${currentPath}[]`);
           }
        }
      }
    } else {
       // Look up reference types (e.g. type: "localeString")
       const refType = schemaTypes.find((t: any) => t.name === field.type);
       if (refType) {
          traverseType(refType, currentPath);
       }
    }
  }
}

for (const type of schemaTypes) {
  if (type.type === "document") {
    // Top-level document fields
    traverseType(type, "");
  }
}

import fs from 'fs';
console.log(`Total static attribute paths: ${paths.size}`);
fs.writeFileSync('paths.txt', Array.from(paths).sort().join('\n'));
