import { browser } from 'protractor';
import * as path from 'path';
import { IRequiredConfig } from '../framework-helpers/interfaces/required-config';
import { injectable, inject } from 'inversify';
import { BASETYPES } from '../../IoC/base-types';
import { FileUtility } from '../framework-helpers/implementations/file-utility';

@injectable()
export class ScriptHelper {
  private readonly config: IRequiredConfig;
  private readonly fileUtility: FileUtility;

  constructor(@inject(BASETYPES.RequiredConfig) config: IRequiredConfig,
    @inject(BASETYPES.FileUtility) fileUtility: FileUtility) {
    this.config = config;
    this.fileUtility = fileUtility;
  }

  public async runScriptFromFile(scriptName: string): Promise<void> {
    const script = this.fileUtility.readFileSyncFromRelativePath(path.join(this.config.relativePaths.scripts, scriptName + '.js'));

    browser.executeScript(script);
  }

  public async runScriptInline(inlineCommand: string, ...args: any[]): Promise<void> {
    if (args != null) {
      browser.executeScript(inlineCommand, ...args);
    } else {
      browser.executeScript(inlineCommand);
    }
  }

}
