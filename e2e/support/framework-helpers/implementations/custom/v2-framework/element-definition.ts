import { IElementDefinition } from "../../../../../../src/e2e/support/framework-helpers/interfaces/web-element-interfaces";

export interface FormElement extends IElementDefinition {
  pageName: string;
  name: string;
  dataId: string;
}
