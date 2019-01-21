

export interface IElementDefinition { }

export interface IElementDefinitionMap {
  [elementName: string]: IElementDefinition;
}

export interface IWebElementLoader {
  getElementLocator(elementName: string, params?: string[], elementsMap?: { [elementName: string]: IElementDefinition}): Promise<string>;

  loadElementMap(): Promise<IElementDefinitionMap>;
}
