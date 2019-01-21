import { FileUtility } from "../e2e/support/framework-helpers/implementations/file-utility";
import { expect, should } from "chai";

export interface IMockYaml {
  objectName: string;
  objectValue: string;
};

describe('FileUtility', () => {
  const fileUtility: FileUtility = new FileUtility();

  it('should read file from a relative path', () => {
    const path: string = './src/unit/mock/mock-file.js';
    const fileRead: string = fileUtility.readFileSyncFromRelativePath(path);

    const fileReadWithoutLineJumpAndExtraSpace: string = fileRead.replace(/\r?\n?/g, '').replace('  ', ' ');

    expect(fileReadWithoutLineJumpAndExtraSpace).to.equal('export const func = function () { return \'this is a js function\';}');
  });

  it('should read a yaml file from a relative path', () => {
    const path: string = './src/unit/mock/mock-file.yaml';
    const yamlObject: IMockYaml[] = fileUtility.readYamlSyncFromRelativePath<IMockYaml>(path);

    should().exist(yamlObject);
    expect(yamlObject.length).to.equal(1);

    expect(yamlObject[0].objectName).to.equal("Mock object");
    expect(yamlObject[0].objectValue).to.equal("value");
  });
});
