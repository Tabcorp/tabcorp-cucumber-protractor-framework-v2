// import { RequiredConfig } from "../e2e/support/framework-helpers/implementations/required-config";
// import { IRequiredConfig } from "../e2e/support/framework-helpers/interfaces/required-config";
// import { should, expect } from "chai";
//
// describe('Required Config', () => {
//   it('Should be initialized with from the IRequiredConfig passed', () => {
//     const config: IRequiredConfig = new RequiredConfig({
//       retry: {
//         default: {
//           attempt: 3,
//           delay: 140
//         },
//         expectedNotFound: {
//           attempt: 2,
//           delay: 25
//         }
//       },
//       afterClickWaitDelay: 50,
//       relativePaths: {
//         urls: "/mappings/urls.yaml",
//         elements: "/mappings/elements.yaml",
//         scripts: "/scripts/"
//       },
//       disableTransitions: true,
//       isAngularApp: true,
//       animationClasses: [".spinner-circular", ".spinner-path"],
//       defaultStartPage: 'stratPage',
//     });
//
//     should().exist(config);
//
//     should().exist(config.retry);
//     should().exist(config.retry.default);
//     expect(config.retry.default.attempt).to.equal(3);
//     expect(config.retry.default.delay).to.equal(140);
//     should().exist(config.retry.expectedNotFound);
//     expect(config.retry.expectedNotFound.attempt).to.equal(2);
//     expect(config.retry.expectedNotFound.delay).to.equal(25);
//
//     should().exist(config.relativePaths);
//     expect(config.relativePaths.elements).to.equal('/mappings/elements.yaml');
//     expect(config.relativePaths.urls).to.equal('/mappings/urls.yaml');
//     expect(config.relativePaths.scripts).to.equal('/scripts/');
//
//     should().exist(config.disableTransitions);
//     expect(config.disableTransitions).to.equal(true);
//
//     should().exist(config.afterClickWaitDelay);
//     expect(config.afterClickWaitDelay).to.equal(50);
//
//     should().exist(config.animationClasses);
//     expect(config.animationClasses.length).to.equal(2);
//
//     should().exist(config.isAngularApp);
//     expect(config.isAngularApp).to.be.true;
//
//     should().exist(config.defaultStartPage);
//     expect(config.defaultStartPage).to.equal('stratPage');
//   });
//
//   it('Should hold consistent values when partially initialized with partial retry (full IRetry) only', () => {
//     const config: IRequiredConfig = new RequiredConfig({
//       retry: {
//         default: {
//           delay: 200,
//           attempt: 6
//         }
//       }
//     } as IRequiredConfig);
//
//     should().exist(config);
//
//     should().exist(config.retry);
//     should().exist(config.retry.default);
//     expect(config.retry.default.attempt).to.equal(6);
//     expect(config.retry.default.delay).to.equal(200);
//     should().exist(config.retry.expectedNotFound);
//     expect(config.retry.expectedNotFound.attempt).to.equal(1);
//     expect(config.retry.expectedNotFound.delay).to.equal(100);
//
//     should().exist(config.relativePaths);
//     expect(config.relativePaths.elements).to.equal('path_not_provided');
//     expect(config.relativePaths.urls).to.equal('path_not_provided');
//     expect(config.relativePaths.scripts).to.equal('path_not_provided');
//
//     should().exist(config.disableTransitions);
//     expect(config.disableTransitions).to.equal(false);
//
//     should().exist(config.afterClickWaitDelay);
//     expect(config.afterClickWaitDelay).to.equal(10);
//
//     should().exist(config.animationClasses);
//     expect(config.animationClasses.length).to.equal(0);
//   });
//
//   it('Should hold consistent values when partially initialized with partial retry (partial IRetry) only', () => {
//     const config: IRequiredConfig = new RequiredConfig({
//       retry: {
//         default: {
//           delay: 200,
//         },
//         expectedNotFound: {
//           attempt: 6,
//         }
//       }
//     } as IRequiredConfig);
//
//     should().exist(config);
//
//     should().exist(config.retry);
//     should().exist(config.retry.default);
//     expect(config.retry.default.attempt).to.equal(2);
//     expect(config.retry.default.delay).to.equal(200);
//     should().exist(config.retry.expectedNotFound);
//     expect(config.retry.expectedNotFound.attempt).to.equal(6);
//     expect(config.retry.expectedNotFound.delay).to.equal(100);
//
//     should().exist(config.relativePaths);
//     expect(config.relativePaths.elements).to.equal('path_not_provided');
//     expect(config.relativePaths.urls).to.equal('path_not_provided');
//     expect(config.relativePaths.scripts).to.equal('path_not_provided');
//
//     should().exist(config.disableTransitions);
//     expect(config.disableTransitions).to.equal(false);
//
//     should().exist(config.afterClickWaitDelay);
//     expect(config.afterClickWaitDelay).to.equal(10);
//
//     should().exist(config.animationClasses);
//     expect(config.animationClasses.length).to.equal(0);
//   });
//
//   it('Should hold consistent values when partially initialized with partial relative path only', () => {
//     const config: IRequiredConfig = new RequiredConfig({
//       relativePaths: {
//         urls: 'this is a path'
//       }
//     } as IRequiredConfig);
//
//     should().exist(config);
//
//     should().exist(config.retry);
//     should().exist(config.retry.default);
//     expect(config.retry.default.attempt).to.equal(2);
//     expect(config.retry.default.delay).to.equal(150);
//     should().exist(config.retry.expectedNotFound);
//     expect(config.retry.expectedNotFound.attempt).to.equal(1);
//     expect(config.retry.expectedNotFound.delay).to.equal(100);
//
//     should().exist(config.relativePaths);
//     expect(config.relativePaths.elements).to.equal('path_not_provided');
//     expect(config.relativePaths.urls).to.equal('this is a path');
//     expect(config.relativePaths.scripts).to.equal('path_not_provided');
//
//     should().exist(config.disableTransitions);
//     expect(config.disableTransitions).to.equal(false);
//
//     should().exist(config.afterClickWaitDelay);
//     expect(config.afterClickWaitDelay).to.equal(10);
//
//     should().exist(config.animationClasses);
//     expect(config.animationClasses.length).to.equal(0);
//   });
//
//   it('Should default isAngularApp to false if no value is provided', () => {
//     const config: IRequiredConfig = new RequiredConfig({} as IRequiredConfig);
//
//     should().exist(config);
//     expect(config.isAngularApp).to.be.false;
//   });
//
//   it('Should default the start page to "Home" if no value is provided', () => {
//     const config: IRequiredConfig = new RequiredConfig({} as IRequiredConfig);
//
//     should().exist(config);
//     expect(config.defaultStartPage).to.equal('Home');
//   });
// });
