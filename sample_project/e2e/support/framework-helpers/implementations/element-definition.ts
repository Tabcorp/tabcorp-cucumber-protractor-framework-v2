import framework = require('tabcorp-cucumber-protractor-framework-v2');

export interface PlayForPurposeElement extends framework.IElementDefinition {
  pageName: string;
  name: string;
  dataId: string;
}
