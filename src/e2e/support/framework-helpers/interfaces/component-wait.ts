export interface IComponentsWait {
  WaitForAllComponentsToLoad(reloadSamePage?: boolean): Promise<void>;
}
