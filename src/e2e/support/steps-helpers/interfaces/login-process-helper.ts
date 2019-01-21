export interface ILoginProcessHelper {
  isUserLoggedIn(isExpectedToBeLoggedIn?: boolean): Promise<boolean>;
  isLoginPromptPresent(): Promise<boolean>;
  bringUpLoginPrompt(): Promise<void>;
  enterLoginDetails(username: string, pwd: string): Promise<void>;
  logout(): Promise<void>;
  hardLogoutAndClearCache(): Promise<void>;
}
