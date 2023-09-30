(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['button.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <img class=\"button__icon\" src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"buttonImageLeft") : depth0), depth0))
    + "\" alt=\"leftIcon\">\n";
},"3":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <span class=\"button__text\">"
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"buttonText") : depth0), depth0))
    + "</span>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <img class=\"button__icon\" src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"buttonImageRight") : depth0), depth0))
    + "\" alt=\"rightIcon\">\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " <button class=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"buttonColor") : depth0), depth0))
    + " "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"buttonSize") : depth0), depth0))
    + " "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"buttonRadiusSize") : depth0), depth0))
    + "\" type=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"buttonType") : depth0), depth0))
    + "\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"buttonImageLeft") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":8},"end":{"line":4,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"buttonText") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":8},"end":{"line":7,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"buttonImageRight") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":8},"end":{"line":10,"column":15}}})) != null ? stack1 : "")
    + "    </button>\n";
},"useData":true});
templates['login.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"state") : depth0)) != null ? lookupProperty(stack1,"ImageTextLoginH1") : stack1), depth0))
    + " \n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"state") : depth0)) != null ? lookupProperty(stack1,"ImageTextRegistrH1") : stack1), depth0))
    + "\n                ";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"state") : depth0)) != null ? lookupProperty(stack1,"ImageTextLoginP1") : stack1), depth0))
    + " \n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"state") : depth0)) != null ? lookupProperty(stack1,"ImageTextRegistrP1") : stack1), depth0))
    + "\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <p class=\"font-caption\"> "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"state") : depth0)) != null ? lookupProperty(stack1,"LinkLogin") : stack1), depth0))
    + " </p> "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"button") || (depth0 != null ? lookupProperty(depth0,"button") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"button","hash":{},"data":data,"loc":{"start":{"line":26,"column":62},"end":{"line":26,"column":76}}}) : helper))) != null ? stack1 : "")
    + "\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <p class=\"font-caption\"> "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"state") : depth0)) != null ? lookupProperty(stack1,"LinkRegister") : stack1), depth0))
    + " </p> "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"button") || (depth0 != null ? lookupProperty(depth0,"button") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"button","hash":{},"data":data,"loc":{"start":{"line":28,"column":65},"end":{"line":28,"column":79}}}) : helper))) != null ? stack1 : "")
    + "\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"login-sign-up-layout__form-container\">\n    <div class=\"login-sign-up-layout__background-image\">\n        <div class=\"image-overlay-text\">\n            <h1 class=\"font-h1-medium\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isLogin") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":5,"column":16},"end":{"line":9,"column":23}}})) != null ? stack1 : "")
    + " </h1>\n            <p class=\"font-base-text\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isLogin") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":11,"column":16},"end":{"line":15,"column":23}}})) != null ? stack1 : "")
    + "            </p>\n        </div>\n        <img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"state") : depth0)) != null ? lookupProperty(stack1,"ImagePeople") : stack1), depth0))
    + "\" alt=\"Your Image\">\n    </div>\n    <div class=\"login-sign-up-layout__form\">\n        \n    </div>\n    \n    <div class=\"login-sign-up-layout__link-container\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isLogin") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data,"loc":{"start":{"line":25,"column":8},"end":{"line":29,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n\n</div>\n";
},"useData":true});
})();