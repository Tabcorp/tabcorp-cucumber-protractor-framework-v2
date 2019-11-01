// import {} from 'mocha';
// import * as chai from 'chai';
// import { expect, should } from 'chai';
// import * as spies from 'chai-spies';
// import { IWebElementLoader } from "../../support/framework-helpers/interfaces/web-element-interfaces";
// import { FileUtility } from "../../support/framework-helpers/implementations/file-utility";
// import { IRequiredConfig, IRelativePaths } from "../../support/framework-helpers/interfaces/required-config";
// import { LottWebElementLoader } from "../../support/framework-helpers/implementations/custom/the-lott/web-element-loader";
// import { ILottYamlElementMap, ILottYamlElement } from '../../support/framework-helpers/implementations/custom/the-lott/element-definition';
//
// chai.use(spies);
//
// describe('Lott Web Element Loader', () => {
//   let lottElementLoader: IWebElementLoader = null;
//   const fakeFileUtilites: FileUtility = {
//     readYamlSyncFromRelativePath: <T>(relativePath: string): T =>  {
//       return {} as T;
//     }
//   } as FileUtility;;
//   const fakeConfig: IRequiredConfig = {
//     relativePaths: {
//       elements: 'fake-path'
//     } as IRelativePaths
//   } as IRequiredConfig;
//
//
//   beforeEach(() => {
//     lottElementLoader = new LottWebElementLoader(fakeConfig, fakeFileUtilites);
//   });
//
//   describe('Elements are loaded from yaml file', () => {
//     let spyReadYaml: ChaiSpies.Spy = null;
//     const yamlMockElements = [
//       {
//         aureliaApp: "layout",
//         aureliaAppSelectorNotInUse: true,
//         name: "Modal Dialog Dismiss Button",
//         dataTestId: "",
//         css: "ux-dialog-header button",
//       },
//       {
//         aureliaApp: "result-app",
//         name: "Next Draw Arrow",
//         parentDataTestId: "summary-container-?",
//         dataTestId: "nextdraw-arrow",
//         css: ".prev-product-model",
//         dynamicPattern: "?"
//       },
//       {
//         aureliaApp: "result-app",
//         name: "Footer Button",
//         parentDataTestId: "summary-container-?",
//         dataTestId: "footer-button",
//         dynamicPattern: "?"
//       }
//     ];
//
//     beforeEach(() => {
//       spyReadYaml = chai.spy.on(fakeFileUtilites, 'readYamlSyncFromRelativePath', () => yamlMockElements);
//     });
//
//     afterEach(() => {
//       chai.spy.restore(fakeFileUtilites, 'readYamlSyncFromRelativePath');
//     });
//
//     it('loadElementMap must load the elements from the yaml file provided in config', async () => {
//       await lottElementLoader.loadElementMap();
//       expect(spyReadYaml).to.has.been.called.with(fakeConfig.relativePaths.elements);
//     });
//
//     it('Elements must be mapped from the yaml files', async () => {
//       const mappedResult: ILottYamlElementMap = await lottElementLoader.loadElementMap() as ILottYamlElementMap;
//       for (const yamlElement of yamlMockElements) {
//
//         const mappedElement: ILottYamlElement = mappedResult[yamlElement.name];
//
//         should().exist(mappedElement, `${yamlElement.name} should exist in yaml file`);
//
//         expect(mappedElement.aureliaApp).to.equal(yamlElement.aureliaApp, `${yamlElement.name} - inconsistent aurelia app`);
//         expect(mappedElement.aureliaAppSelectorNotInUse).to.equal(yamlElement.aureliaAppSelectorNotInUse, `${yamlElement.name} - inconsistent selector builder for aurelia App`);
//         expect(mappedElement.css).to.equal(yamlElement.css, `${yamlElement.name} - inconsistent css`);
//         expect(mappedElement.dataTestId).to.equal(yamlElement.dataTestId, `${yamlElement.name} - inconsistent dataTest-Id`);
//         expect(mappedElement.dynamicPattern).to.equal(yamlElement.dynamicPattern, `${yamlElement.name} - inconsistent dynamic pattern`);
//         expect(mappedElement.parentDataTestId).to.equal(yamlElement.parentDataTestId, `${yamlElement.name} - inconsistent parent datatest-id`);
//         expect(mappedElement.selector).to.be.undefined;
//       }
//     });
//   });
//
//   describe('Element Map should initialize and be accessible to the outside world', () => {
//     let spyLoadElementsMap: ChaiSpies.Spy = null;
//
//     beforeEach(() => {
//       spyLoadElementsMap = chai.spy.on(lottElementLoader, 'loadElementMap', () => {
//           return {
//           'fake-element': {
//               name: 'fake-name',
//               aureliaApp: 'fake-aurrelia-app',
//               aureliaAppSelectorNotInUse: false,
//               dataTestId: 'fake-data-test-id',
//               dynamicPattern: '?',
//               css: '.css',
//               parentDataTestId: 'parent-data-test-id',
//               selector: 'xxxxxxx'
//             }
//         };
//       });
//     });
//
//     afterEach(() => {
//       chai.spy.restore(lottElementLoader, 'loadElementMap');
//     });
//
//     it('loadElementMap must be called if the elements map has not been initialized yet', async () => {
//       const result = await (lottElementLoader as LottWebElementLoader).elementsMap();
//       expect(spyLoadElementsMap).to.have.been.called;
//       should().exist(result);
//       should().exist(result['fake-element']);
//     });
//
//     it('loadElementMap must NOT be called if the elements map has already been initialized yet', async () => {
//       await (lottElementLoader as LottWebElementLoader).elementsMap();
//       expect(spyLoadElementsMap).to.not.have.been.called;
//     });
//
//     it('loadElementMap must return the initialized elementsMap value', async () => {
//       (lottElementLoader as any)._elementsMap = {
//         'fake-element': {
//             name: 'fake-name',
//             aureliaApp: 'fake-aurrelia-app',
//             aureliaAppSelectorNotInUse: false,
//             dataTestId: 'fake-data-test-id',
//             dynamicPattern: '?',
//             css: '.css',
//             parentDataTestId: 'parent-data-test-id',
//             selector: 'xxxxxxx'
//           }
//       };
//       const result = await (lottElementLoader as LottWebElementLoader).elementsMap();
//       should().exist(result);
//       should().exist(result['fake-element']);
//     });
//   });
//
//   describe('Css Selector building', () => {
//     it('The selector returned by elementLocator must be built from aureliaApp, parentDataTestId, css and dataTestId', async () => {
//       const elementsMap: ILottYamlElementMap = {
//         'Silly Test Name':  {
//           aureliaApp: 'test-app',
//           name: 'Silly Name',
//           parentDataTestId: 'silly-test-parent-data-id',
//           dataTestId: "silly-test-data-id",
//           css: '.silly-class'
//         }
//       };
//
//       const locator: string = await lottElementLoader.getElementLocator('Silly Test Name', [], elementsMap);
//       const expectedSelector: string = '[aurelia-app=test-app] [data-test-id=silly-test-parent-data-id] .silly-class [data-test-id=silly-test-data-id]';
//
//       expect(locator).to.equal(expectedSelector);
//     });
//
//     it('The aureliaApp must be ignored if aureliaAppSelectorNotInUse is true', async () => {
//       const elementsMap: ILottYamlElementMap = {
//         'Silly Test Name':  {
//           aureliaApp: 'test-app',
//           aureliaAppSelectorNotInUse: true,
//           name: 'Silly Name',
//           parentDataTestId: 'silly-test-parent-data-id',
//           dataTestId: "silly-test-data-id",
//           css: '.silly-class'
//         }
//       };
//
//       const locator: string = await lottElementLoader.getElementLocator('Silly Test Name', [], elementsMap);
//       const expectedSelector: string = '[data-test-id=silly-test-parent-data-id] .silly-class [data-test-id=silly-test-data-id]';
//
//       expect(locator).to.equal(expectedSelector);
//     });
//
//     it('The selector returned by elementLocator must be stored', async () => {
//       const elementsMap: ILottYamlElementMap = {
//         'Silly Test Name':  {
//           aureliaApp: 'test-app',
//           name: 'Silly Name',
//           parentDataTestId: 'silly-test-parent-data-id',
//           dataTestId: "silly-test-data-id",
//           css: '.silly-class'
//         }
//       };
//
//       await lottElementLoader.getElementLocator('Silly Test Name', [], elementsMap);
//       const expectedSelector: string = '[aurelia-app=test-app] [data-test-id=silly-test-parent-data-id] .silly-class [data-test-id=silly-test-data-id]';
//
//       should().exist(elementsMap['Silly Test Name'].selector);
//       expect(elementsMap['Silly Test Name'].selector).to.equal(expectedSelector);
//     });
//
//     it('The selector must always be dynamically built from dataTestId, parentDataTestID, dynamicPattern and values passed', async () => {
//       const elementsMap: ILottYamlElementMap = {
//         'Silly Dynamic Test Name':  {
//           aureliaApp: 'test-app',
//           name: 'Silly Name',
//           parentDataTestId: 'silly-test-parent-data-id-pattern-?',
//           dataTestId: "silly-test-data-id-pattern-?",
//           dynamicPattern: "?",
//           css: '.silly-class'
//         }
//       };
//
//       const locator = await lottElementLoader.getElementLocator('Silly Dynamic Test Name', ['dynamic'], elementsMap);
//       const expectedSelector: string = '[aurelia-app=test-app] [data-test-id=silly-test-parent-data-id-pattern-dynamic] .silly-class [data-test-id=silly-test-data-id-pattern-dynamic]';
//
//       expect(locator).to.equal(expectedSelector);
//     });
//
//     it('The dynamic selector returned by elementLocator must not be stored', async () => {
//       const elementsMap: ILottYamlElementMap = {
//         'Silly Dynamic Test Name':  {
//           aureliaApp: 'test-app',
//           name: 'Silly Name',
//           parentDataTestId: 'silly-test-parent-data-id-pattern-?',
//           dataTestId: "silly-test-data-id-pattern-?",
//           dynamicPattern: "?",
//           css: '.silly-class'
//         }
//       };
//
//       await lottElementLoader.getElementLocator('Silly Dynamic Test Name', ['dynamic'], elementsMap);
//
//       should().not.exist(elementsMap['Silly Dynamic Test Name'].selector);
//     });
//   });
// });
