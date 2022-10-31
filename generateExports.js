const fs = require('fs');
const path = require('path');

function collectModules(dir, extname) {
    let modules = [];
    fs.readdirSync(`./src/${dir}/`).forEach(function (file) {
      // Load the module if it's a script.
      if (path.extname(file) === extname) {
        if (file.includes(".disabled")) {
          console.info(`Did not load disabled module: ${file}`);
        } else {
          const moduleName = path.basename(file, extname);
          if (moduleName === "_") return;
          modules.push(moduleName);
          console.info(`Scanning ${moduleName} from ${file} ...`);
        }
      }
    });
    return modules;
}

const header = '// GENERATED FILE. DO NOT EDIT!\n// See generateExports.js for details.\n'

console.info('Generating module loader ...');

let modules = collectModules('commands', '.ts');
let loader_content = header;
for (let mod of modules) {
    loader_content += `import * as ${mod} from './${mod}';\n`;
}
let loader_map = modules.map((moduleName) => moduleName.toLowerCase() === moduleName ? moduleName : `${moduleName.toLowerCase()}: ${moduleName}`).join(', ');
loader_content += `\nexport default { ${loader_map} };\n`;
fs.writeFileSync("./src/commands/_.ts", loader_content);

let triggers = collectModules('triggers', '.ts');
loader_content = header;
for (let mod of triggers) {
    loader_content += `import * as ${mod} from "./${mod}";\n`;
}
loader_map = triggers.join(', ');
loader_content += `\nexport default [ ${loader_map} ];\n`;
fs.writeFileSync("./src/triggers/_.ts", loader_content);
