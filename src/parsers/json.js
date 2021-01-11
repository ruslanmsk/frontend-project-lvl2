import fs from 'fs';
import path from 'path';

export default function parse(filepath) {
    const fileContent = fs.readFileSync(path.resolve(filepath), 'utf-8');
    return JSON.parse(fileContent);
};
