import { injectable, inject } from "inversify";

import { CUSTOMTYPES } from "../../../../IoC/custom/v2-framework/custom-types";
import { ICustomConfig } from "../../../framework-helpers/interfaces/custom/v2-framework/custom-config";

import * as path from 'path';
import * as fs from 'fs';
import json = Mocha.reporters.json;

@injectable()
export class PageURLHelper {
  private readonly customConfig: ICustomConfig;

  constructor(@inject(CUSTOMTYPES.CustomConfig) customConfig : ICustomConfig) {
    this.customConfig = customConfig;
  }

  getDefinedPageURL(pageName: string) {
    return this.getPageURL(this.formatPageNameKey(pageName));
  }

  private formatPageNameKey(pageName: string) {
    return pageName.replace(/ /g, "_").toLowerCase();
  }

  getPageURL(pageName: string) {
    const pageURLSPath: string = path.join(process.cwd(), this.customConfig.urlsPath + '.json');
    const urlJsonObject = JSON.parse(fs.readFileSync(pageURLSPath, 'utf8'));
    return urlJsonObject[pageName];
  }

}
