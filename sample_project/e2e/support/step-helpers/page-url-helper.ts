import inversify = require('inversify');
import { browser } from 'protractor';
import { CUSTOMTYPES } from "../../IoC/custom-types";
import { ICustomConfig } from "../framework-helpers/interfaces/custom-config";

import * as path from 'path';
import * as fs from 'fs';

@inversify.injectable()
export class PageURLHelper {
  private readonly customConfig: ICustomConfig;

  constructor(@inversify.inject(CUSTOMTYPES.CustomConfig) customConfig : ICustomConfig) {
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
