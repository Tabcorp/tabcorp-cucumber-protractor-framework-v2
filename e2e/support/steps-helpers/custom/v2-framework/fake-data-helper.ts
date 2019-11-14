import { injectable, inject } from "inversify";

import { CUSTOMTYPES } from "../../../../IoC/custom/v2-framework/custom-types";
import { ICustomConfig } from "../../../framework-helpers/interfaces/custom/v2-framework/custom-config";

import * as path from 'path';
import * as fs from 'fs';
import json = Mocha.reporters.json;

const faker = require('faker');

@injectable()
export class FakeDataHelper {
  private readonly customConfig: ICustomConfig;

  constructor(@inject(CUSTOMTYPES.CustomConfig) customConfig : ICustomConfig) {
    this.customConfig = customConfig;
  }

  retrieveFakeDataValue(value: string) {
    const fakeDataPath = path.join(process.cwd(), this.customConfig.fakeDataPath);
    const elementsJsonObject = JSON.parse(fs.readFileSync(fakeDataPath, 'utf8'));
    return eval(elementsJsonObject[value]);
  }

}
