import "reflect-metadata";

const BASETYPES = {

  ProtractExpectedConds: Symbol.for("ProtractorExpectedConditions"),

// # Framework/browser related base helpers
  // classes
  RequiredConfig: Symbol.for("IRequiredConfig"),
  BrowserWait: Symbol.for("BrowserWait"),
  HtmlHelper: Symbol.for("HtmlHelper"),
  PageHelper: Symbol.for("PageHelper"),
  ScriptHelper: Symbol.for("ScriptHelper"),
  TimeUtility: Symbol.for("TimeUtility"),
  FileUtility: Symbol.for("FileUtility"),
  WebElementHelper: Symbol.for("WebElementHelper"),
  // interfaces requiring custom implementation
  ComponentsWait: Symbol.for("IComponentsWait"),
  CustomNavigationBehaviorHelper: Symbol.for("ICustomNavigationBehaviorHelper"),
  WebElementLoader: Symbol.for("IWebElementLoader"),
  Logger: Symbol.for("ILogger"),

// # Functionality related base helpers
  // classes
  StringGeneratorHelper: Symbol.for("StringGeneratorHelper"),
  // interfaces requiring custom implementation
  DialogInteractionHelper: Symbol.for("IDialogInteractionHelper"),
  JurisdictionHelper: Symbol.for("IJurisdictionHelper"),
  LoginProcessHelper: Symbol.for("ILoginProcessHelper")
};

export { BASETYPES };
