export interface IJurisdictionHelper {
  selectJurisdiction(jurisdiction: string): Promise<void>;
  hardSetJurisdiction(jurisdiction: string): Promise<void>;
  isJurisdiction(jurisdiction: string): Promise<boolean>;
}
