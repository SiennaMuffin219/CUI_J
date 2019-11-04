import {copy, removeSync} from 'fs-extra';
import paths from './config/paths.json'

console.log("Copying " + paths.from);
for (const to of paths.to) {
    console.log("\tto " + to);
    removeSync(to);
    copy(paths.from, to).then(r => {});
}

