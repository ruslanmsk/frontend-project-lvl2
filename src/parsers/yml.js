import yaml from 'js-yaml';

export default function parse(fileContent) {
  return yaml.load(fileContent);
}
