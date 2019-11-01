// import {} from 'mocha';
// import { expect } from 'chai';
// import * as yaml from 'js-yaml';
// import * as fs from 'fs';
// import * as e2econfig from '../../../../e2e.conf.json';
// import { ILottYamlElement } from '../../../support/framework-helpers/implementations/custom/the-lott/element-definition';
//
// describe('Elements yaml file integrity Check', () => {
//   const configFilePath = e2econfig.testsConfigurationVariables.required.relativePaths.elements.startsWith('/')
//                           ? e2econfig.testsConfigurationVariables.required.relativePaths.elements.substr(1)
//                           : e2econfig.testsConfigurationVariables.required.relativePaths.elements;
//
//   const elements: ILottYamlElement[] = yaml.safeLoad(fs.readFileSync(configFilePath, 'utf8'));
//
//   it('Elements must be defined', () => {
//     expect(elements.length).to.gt(0);
//   });
//
//   it('Every element must have a name', () => {
//     const nameMissing = elements.filter(element => element.name == null || element.name.length === 0);
//     expect(nameMissing.length).to.equal(0);
//   });
//
//   it('all elements dataTestId must be lower case', () => {
//     const invalidDataTestIdFormatting = elements.filter(element => !(element.dataTestId == null || element.dataTestId.length === 0)
//                                                     && element.dataTestId.toLowerCase() !== element.dataTestId)
//                                 .map(el => el.dataTestId);
//     expect(invalidDataTestIdFormatting.length).to.equal(0, `All element dataTestId MUST be "lowercase" The following elements have an invalid dataTestId:\n${invalidDataTestIdFormatting.join(',')}`);
//   });
//
//   it('all elements parentDataTestId must be lower case', () => {
//     const invalidParentDataTestIdFormatting = elements.filter(element => !(element.parentDataTestId == null || element.parentDataTestId.length === 0)
//                                                     && element.parentDataTestId.toLowerCase() !== element.parentDataTestId)
//                                 .map(el => el.parentDataTestId);
//     expect(invalidParentDataTestIdFormatting.length).to.equal(0, `All element parentDataTestId MUST be "lowercase" The following elements have an invalid parentDataTestId:\n${invalidParentDataTestIdFormatting.join(',')}`);
//   });
//
//   it('Every element must have a name', () => {
//     const nameMissing = elements.filter(element => element.name == null || element.name.length === 0);
//     expect(nameMissing.length).to.equal(0);
//   });
//
//   it('Every element name must be unique accross all elements', () => {
//     const groupedByName = elements.reduce((accumulator, yamlEl) => ({...accumulator, [yamlEl.name]: (accumulator[yamlEl.name] || 0) + 1}), {});
//     const nonUniqueName = [];
//
//     for(const key of Object.keys(groupedByName)) {
//       if (groupedByName[key] > 1) {
//         nonUniqueName.push(key);
//       }
//     }
//
//     expect(nonUniqueName.length).to.equal(0, `non unique element name: ${nonUniqueName.join(',')}`);
//   });
//
//   it('All element must be defined only once accross all elements', () => {
//     const nonUniqueElements: string[] = [];
//
//     for (const element of elements) {
//       const elementsFromSameAureliaApp = elements.filter(e => e.aureliaApp === element.aureliaApp && e.name != element.name);
//       const elementWithSameDataTestId = elementsFromSameAureliaApp.filter(e => (e.dataTestId == null && element.dataTestId == null)
//                                                                                 || e.dataTestId === element.dataTestId);
//       const elementWithSameParentDataTestId = elementWithSameDataTestId.filter(e => (e.parentDataTestId == null && element.parentDataTestId == null)
//                                                                                    || e.parentDataTestId === element.parentDataTestId);
//       const elementWithSameCss = elementWithSameParentDataTestId.filter(e =>  (e.css == null && element.css == null)
//                                                                                 || e.css === element.css);
//
//       if (elementWithSameCss.length > 0) {
//         nonUniqueElements.push(`'${element.name}' identical to other(s): ${elementWithSameCss.map(e => `'${e.name}'`).join(',')}\n`);
//       }
//     }
//
//     expect(nonUniqueElements.length).to.equal(0, `Elements described under different names:\n${nonUniqueElements.join('')}`);
//   });
//
//   it(`All elements must belong to an aureliaApp`, () => {
//     const notFullfillingCriteriaElements: string[] = [];
//     for (const element of elements) {
//       if (element.aureliaApp == null || element.aureliaApp.length === 0) {
//         notFullfillingCriteriaElements.push(element.name);
//       }
//     }
//
//     expect(notFullfillingCriteriaElements.length).to.equal(0, `All elements must belong to an AureliaApp. Elements failling this rule: \n${notFullfillingCriteriaElements.join(', ')}`);
//   });
//
//   it(`All elements must have dataTestId/parentDataTestId when the AureliaApp is used to build the selector`, () => {
//     const elementListUsingAureliaApp = elements.filter(el => !el.aureliaAppSelectorNotInUse);
//     const notFullfillingCriteriaElements: string[] = [];
//
//     for (const element of elementListUsingAureliaApp) {
//       if ((element.dataTestId == null || element.dataTestId.length === 0)
//           && (element.parentDataTestId == null || element.parentDataTestId.length === 0)) {
//         notFullfillingCriteriaElements.push(element.name);
//       }
//     }
//
//     expect(notFullfillingCriteriaElements.length).to.equal(0, `All elements with selector built from AureliaApp must have a dataTestId. Elements failling this rule: \n${notFullfillingCriteriaElements.join(', ')}`);
//   })
//
//   it(`All elements must have a dataTestId or a css locator when the AureliaApp is NOT used to build the selector`, () => {
//     const elementListNotUsingAureliaApp = elements.filter(el => !!el.aureliaAppSelectorNotInUse);
//     const notFullfillingCriteriaElements: string[] = [];
//
//     for (const element of elementListNotUsingAureliaApp) {
//       if (!((element.dataTestId != null && element.dataTestId.length > 0)
//             || (element.css != null && element.css.length > 0))) {
//         notFullfillingCriteriaElements.push(element.name);
//       }
//     }
//     expect(notFullfillingCriteriaElements.length).to.equal(0, `All elements not using AureliaApp to build their selector must either have a dataTestId or a css. Elements failling this rule: \n${notFullfillingCriteriaElements.join(', ')}`);
//   })
//
//   it(`All elements must use the dynamic pattern when provided`, () => {
//     const elementWithDynamicPattern = elements.filter(el => el.dynamicPattern != null && el.dynamicPattern != '');
//     const notFullfillingCriteriaElements: string[] = [];
//
//     for (const element of elementWithDynamicPattern) {
//       const isDataTestIdDynamic: boolean = element.dataTestId != null
//                                             && element.dataTestId.length !== 0
//                                             && element.dataTestId.indexOf(element.dynamicPattern) > -1;
//
//       const isParentDataTestIdDynamic: boolean = element.parentDataTestId != null
//                                             && element.parentDataTestId.length !== 0
//                                             && element.parentDataTestId.indexOf(element.dynamicPattern) > -1;
//       if (!isDataTestIdDynamic
//           && !isParentDataTestIdDynamic) {
//         notFullfillingCriteriaElements.push(element.name);
//       }
//     }
//     expect(notFullfillingCriteriaElements.length).to.equal(0, `All elements with dynamic pattern must have a dataTestId containing the dynamic pattern sign. Elements failling this rule: \n${notFullfillingCriteriaElements.join(', ')}`);
//   })
// });
