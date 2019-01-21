
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { injectable } from 'inversify';

@injectable()
export class FileUtility {
  public readFileSyncFromRelativePath(relativePath: string): string {
    const filePath: string = path.join(process.cwd(), relativePath);
    const file = fs.readFileSync(filePath, 'utf8');

    return file;
  }

  public readFileSyncFromAbsolutePath(filePath: string): string {
    const file = fs.readFileSync(filePath, 'utf8');

    return file;
  }

  /* --- yaml --- */
  public readYamlSyncFromRelativePath<T>(relativePath: string): T[] {
    const file: string = this.readFileSyncFromRelativePath(relativePath);
    const yamlObject: T[] = yaml.safeLoad(file);

    return yamlObject;
  }

  public readYamlSyncFromAbsolutePath<T>(filePath: string): T[] {
    const file: string = this.readFileSyncFromRelativePath(filePath);
    const yamlObject: T[] = yaml.safeLoad(file);

    return yamlObject;
  }
}
