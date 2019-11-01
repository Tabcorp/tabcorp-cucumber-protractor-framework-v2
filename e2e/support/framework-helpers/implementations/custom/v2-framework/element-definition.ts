import { IElementDefinition } from "tabcorp-cucumber-protractor-framework-v2";

export interface FormElement extends IElementDefinition {
  pageName: string;
  name: string;
  dataId: string;
}
