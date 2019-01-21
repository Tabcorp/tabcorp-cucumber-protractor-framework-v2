import { IPageUrlsMap } from "./page-url-interfaces";

export interface ICustomNavigationBehaviorHelper {
  loadUrlMap(): Promise<IPageUrlsMap>;
  generateUrl(pageName: string, urlsMap?: IPageUrlsMap): Promise<string>;
  triggerSystemSpecificBehaviorPreNavigation(): Promise<void>;
  triggerSystemSpecificBehaviorPostNavigation(destinationUrl: string): Promise<void>;
  getCurrentPage(): string;
  setCurrentPage(pageName: string): void;
}
