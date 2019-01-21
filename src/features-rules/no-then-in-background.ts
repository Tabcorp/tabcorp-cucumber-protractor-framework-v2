
class ThenForbiddenInBackground {
  public static readonly ruleName = 'no-then-in-background';

  public static thenForbidden(feature) {
    var errors = [];
    if (feature && feature.children) {
      for (let background of feature.children) {
        if (background.type !== 'Background') {
          continue;
        }
        for (let step of background.steps) {
          if (step.keyword === 'Then ') {
            errors.push(ThenForbiddenInBackground.createError(step));
          }
        }
      }
    }

    return errors;
  }

  public static createError(step) {
    return {
      message: `Background "'${step.keyword}${step.text}'" - Keyword 'Then' forbidden in Background`,
      rule   : ThenForbiddenInBackground.ruleName,
      line   : step.location.line
    };
  }
}

module.exports = {
  name: ThenForbiddenInBackground.ruleName,
  run: ThenForbiddenInBackground.thenForbidden
};
