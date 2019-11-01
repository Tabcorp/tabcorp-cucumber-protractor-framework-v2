// import {} from 'mocha';
// import { expect } from 'chai';
// import * as yaml from 'js-yaml';
// import * as fs from 'fs';
// import * as e2econfig from '../../../../e2e.conf.json';
//
// describe('UrlsMappingsChecks', () => {
//   const configFilePath = e2econfig.testsConfigurationVariables.required.relativePaths.urls.startsWith('/')
//                           ? e2econfig.testsConfigurationVariables.required.relativePaths.urls.substr(1)
//                           : e2econfig.testsConfigurationVariables.required.relativePaths.urls;
//
//   const urls: { pageName: string, pageUrl: string }[] = yaml.safeLoad(fs.readFileSync(configFilePath, 'utf8'));
//
//   it('PageNames cannot be empty in urls.yaml', () => {
//     const emptyPageNames = urls.filter(page => page.pageName == null || page.pageName.length === 0);
//     expect(emptyPageNames.length).to.equal(0, `Pages: ${emptyPageNames.map(page => page.pageUrl).join(',')}`);
//   });
//
//   it('PageUrls cannot be empty in urls.yaml except the for the Home page', () => {
//     let pagesNameExceptHome = urls.filter(page => page.pageName !== 'Home' && (page.pageUrl == null || page.pageUrl.length === 0));
//     expect(pagesNameExceptHome.length).to.equal(0, `Pages: ${pagesNameExceptHome.map(page => page.pageName).join(',')}`);
//   });
//
//   it('Home page url must empty in urls.yaml', () => {
//     let homePages: { pageName: string, pageUrl: string }[] = urls.filter(url => url.pageName == 'Home');
//
//     expect(homePages.length).to.be.equal(1);
//     expect(homePages[0].pageUrl.length).to.be.equal(0);
//   });
//
//   it(`Should not have duplicate pageNames in elements.yaml`, () => {
//     const groupedByName = urls.reduce((accumulator, yamlEl) => ({...accumulator, [yamlEl.pageName]: (accumulator[yamlEl.pageName] || 0) + 1}), {});
//     const nonUniqueName = Object.values(groupedByName).filter(v => v !== 1);
//
//     expect(nonUniqueName.length).to.equal(0);
//   });
//
//   it(`Should not have duplicate PageUrls in elements.yaml`, () => {
//     const groupedByName = urls.reduce((accumulator, yamlEl) => ({...accumulator, [yamlEl.pageUrl]: (accumulator[yamlEl.pageUrl] || 0) + 1}), {});
//     const nonUniqueName = Object.values(groupedByName).filter(v => v !== 1);
//
//     expect(nonUniqueName.length).to.equal(0);
//   });
// });
