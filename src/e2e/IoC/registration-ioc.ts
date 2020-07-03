import { Container } from 'inversify';
import { BASETYPES } from './base-types';
import * as chaiAsPromised from "chai-as-promised";
import { BrowserWait } from '../support/framework-helpers/implementations/browser-wait';
import { HtmlHelper } from '../support/framework-helpers/implementations/html-helper';
import { DropdownHelper } from '../support/framework-helpers/implementations/dropdown-helper';
import { MomentHelper } from '../support/framework-helpers/implementations/moment-helper';
import { DataHelper } from '../support/framework-helpers/implementations/data-helper';
import { PageHelper } from '../support/framework-helpers/implementations/page-helper';
import { TimeUtility } from '../support/framework-helpers/implementations/time-utility-helper';
import { WebElementHelper } from '../support/framework-helpers/implementations/web-element-helper';
import { StringManipulationHelper } from '../support/steps-helpers/string-manipulation-helper';
import { ProtractorExpectedConditions, Ptor } from 'protractor';
import { RequiredConfig } from '../support/framework-helpers/implementations/required-config';
import { RetryHelper } from "../support/steps-helpers/retry-helper";
import { IRequiredConfig } from '../support/framework-helpers/interfaces/required-config';
import { ScriptHelper } from '../support/steps-helpers/script-helper';
import { FileUtility } from '../support/framework-helpers/implementations/file-utility';

export class RegistrationIoC {
  private static _container = null;

  private static getContainerSingleton(): Container {
    if (this._container == null) {
      this._container = new Container();
    }

    return this._container;
  }

  private static customRegistrationsMap: ICustomCallbackRegistrationWithArgs[] = [];

  public static addCustomRegistrationMethod(registrationCallback: ICustomCallbackRegistrationWithArgs | ICustomCallbackRegistration): void {
    let registration: ICustomCallbackRegistrationWithArgs = {
      callback: registrationCallback.callback,
      args: ((registrationCallback as ICustomCallbackRegistrationWithArgs).args || [])
    }

    RegistrationIoC.customRegistrationsMap.push(registration);
  }

  public static triggerPublicRegistration(protractor: Ptor, requiredConfig?: IRequiredConfig): void {
    RegistrationIoC.registerBaseTypes(protractor, requiredConfig);

    for(let registrationCallBack of RegistrationIoC.customRegistrationsMap) {
      if (registrationCallBack.args.length > 0) {
        registrationCallBack.callback(RegistrationIoC.getContainerSingleton(), ...registrationCallBack.args);
      } else {
        registrationCallBack.callback(RegistrationIoC.getContainerSingleton());
      }
    }
  }

  private static registerBaseTypes(protrac: Ptor, requiredConfig: IRequiredConfig) {

    RegistrationIoC.getContainerSingleton().bind<ProtractorExpectedConditions>(BASETYPES.ProtractExpectedConds).toConstantValue(protrac.ExpectedConditions);

    const config = new RequiredConfig(requiredConfig);
    RegistrationIoC.getContainerSingleton().bind<IRequiredConfig>(BASETYPES.RequiredConfig).toConstantValue(config);

    // Framework classes
    RegistrationIoC.getContainerSingleton().bind<BrowserWait>(BASETYPES.BrowserWait).to(BrowserWait);
    RegistrationIoC.getContainerSingleton().bind<HtmlHelper>(BASETYPES.HtmlHelper).to(HtmlHelper);
    RegistrationIoC.getContainerSingleton().bind<DropdownHelper>(BASETYPES.DropdownHelper).to(DropdownHelper);
    RegistrationIoC.getContainerSingleton().bind<MomentHelper>(BASETYPES.MomentHelper).to(MomentHelper);
    RegistrationIoC.getContainerSingleton().bind<DataHelper>(BASETYPES.DataHelper).to(DataHelper);
    RegistrationIoC.getContainerSingleton().bind<PageHelper>(BASETYPES.PageHelper).to(PageHelper);
    RegistrationIoC.getContainerSingleton().bind<FileUtility>(BASETYPES.FileUtility).to(FileUtility);
    RegistrationIoC.getContainerSingleton().bind<TimeUtility>(BASETYPES.TimeUtility).to(TimeUtility);
    RegistrationIoC.getContainerSingleton().bind<WebElementHelper>(BASETYPES.WebElementHelper).to(WebElementHelper);

    // Fonctionalities related classes
    RegistrationIoC.getContainerSingleton().bind<ScriptHelper>(BASETYPES.ScriptHelper).to(ScriptHelper);
    RegistrationIoC.getContainerSingleton().bind<RetryHelper>(BASETYPES.RetryHelper).to(RetryHelper);
    RegistrationIoC.getContainerSingleton().bind<StringManipulationHelper>(BASETYPES.StringManipulationHelper).to(StringManipulationHelper);
  }

  public static getContainer(): Container {
    return RegistrationIoC.getContainerSingleton();
  }

  public static clearContainer(): void {
    RegistrationIoC.getContainer().restore();
    RegistrationIoC._container = null;
  }
}

export interface ICustomCallbackRegistration {
  callback: ((inversifyContainer: Container, ...args: any[]) => void);
}

export interface ICustomCallbackRegistrationWithArgs {
  callback: ((inversifyContainer: Container, ...args: any[]) => void);
  args: any[];
}
