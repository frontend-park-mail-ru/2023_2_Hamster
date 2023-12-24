(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['button.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " id=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":23},"end":{"line":1,"column":29}}}) : helper)))
    + "\" ";
},"3":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <img class=\"button__icon\" src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"buttonImageLeft") : depth0), depth0))
    + "\" alt=\"leftIcon\">\n";
},"5":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <span class=\"button__text\">"
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"buttonText") : depth0), depth0))
    + "</span>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <img class=\"button__icon\" src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"buttonImageRight") : depth0), depth0))
    + "\" alt=\"rightIcon\">\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"id") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":8},"end":{"line":1,"column":38}}})) != null ? stack1 : "")
    + "\n    class=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"buttonColor") : depth0), depth0))
    + " \n    "
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"buttonSize") : depth0), depth0))
    + " \n    "
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"buttonRadiusSize") : depth0), depth0))
    + "\" \n    type=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"buttonType") : depth0), depth0))
    + "\"\n>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"buttonImageLeft") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":4},"end":{"line":9,"column":11}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"buttonText") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":4},"end":{"line":13,"column":11}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"buttonImageRight") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":4},"end":{"line":17,"column":11}}})) != null ? stack1 : "")
    + "</button>\n";
},"useData":true});
templates['input.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"input__label font-caption\">"
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"inputLabelText") : depth0), depth0))
    + "</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                input-error\n            ";
},"5":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <img \n            class=\"input__icon input__icon-left\" \n            src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"inputImageLeft") : depth0), depth0))
    + "\"\n        > \n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " id=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":18,"column":26},"end":{"line":18,"column":32}}}) : helper)))
    + "\" ";
},"9":function(container,depth0,helpers,partials,data) {
    return "            autocomplete=\"off\"\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "                input__text-left \n";
},"13":function(container,depth0,helpers,partials,data) {
    return "                input__text-right\n            ";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"inputImageLeft") : depth0),{"name":"unless","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":34,"column":8},"end":{"line":39,"column":19}}})) != null ? stack1 : "");
},"16":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <img \n                class=\"input__icon input__icon-right\" \n                src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"inputImageRight") : depth0), depth0))
    + "\"\n            > \n";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"input-helper\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isError") : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":46,"column":12},"end":{"line":48,"column":19}}})) != null ? stack1 : "")
    + "\">\n        "
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"inputHelperText") : depth0), depth0))
    + "\n    </div>\n";
},"19":function(container,depth0,helpers,partials,data) {
    return "                input-helper_error\n            ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, alias4=container.hooks.helperMissing, alias5="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"inputLabelText") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":4,"column":7}}})) != null ? stack1 : "")
    + "\n<div class=\"input-container \n            "
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"inputSize") : depth0), depth0))
    + "\n            "
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"inputRadiusSize") : depth0), depth0))
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isError") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":12},"end":{"line":11,"column":19}}})) != null ? stack1 : "")
    + "\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"inputImageLeft") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":4},"end":{"line":17,"column":11}}})) != null ? stack1 : "")
    + "    <input "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"id") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":11},"end":{"line":18,"column":41}}})) != null ? stack1 : "")
    + " type=\""
    + alias3(((helper = (helper = lookupProperty(helpers,"typeOfInput") || (depth0 != null ? lookupProperty(depth0,"typeOfInput") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias1,{"name":"typeOfInput","hash":{},"data":data,"loc":{"start":{"line":18,"column":48},"end":{"line":18,"column":63}}}) : helper)))
    + "\"\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"autocompleteOff") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":8},"end":{"line":21,"column":15}}})) != null ? stack1 : "")
    + "\n        name=\""
    + alias3(((helper = (helper = lookupProperty(helpers,"nameOfField") || (depth0 != null ? lookupProperty(depth0,"nameOfField") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias1,{"name":"nameOfField","hash":{},"data":data,"loc":{"start":{"line":23,"column":14},"end":{"line":23,"column":29}}}) : helper)))
    + "\"\n        placeholder=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"inputPlaceholder") : depth0), depth0))
    + "\"\n        class=\"input input__text \n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"inputImageLeft") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(13, data, 0),"data":data,"loc":{"start":{"line":26,"column":12},"end":{"line":30,"column":19}}})) != null ? stack1 : "")
    + "\"\n    >\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"inputImageRight") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":33,"column":4},"end":{"line":40,"column":11}}})) != null ? stack1 : "")
    + "\n</div>\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"inputHelperText") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":44,"column":0},"end":{"line":51,"column":7}}})) != null ? stack1 : "");
},"useData":true});
templates['list.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <li class=\"list__item\">\n        <div class=\"list__item-container\">\n            <span class=\"list__item-title font-caption\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"listItemTitle") : depth0), depth0))
    + "</span>\n            <span class=\"list__item-additional font-caption\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"listItemValue") : depth0), depth0))
    + " "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"valueUnits") : depth0), depth0))
    + "</span>\n        </div>\n    </li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"listItems") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":8,"column":9}}})) != null ? stack1 : "");
},"useData":true});
templates['menu.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <span class=\"menu__header font-caption\">\n        "
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"menuSectionHeading") : depth0), depth0))
    + "\n    </span>\n    <ul class=\"menu__list font-caption\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"menuItems") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":15,"column":17}}})) != null ? stack1 : "")
    + "    </ul>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <li class=\"menu__item menu__item_color\" id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"menuItemID") : depth0), depth0))
    + "\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"menuItemIcon") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":16},"end":{"line":10,"column":23}}})) != null ? stack1 : "")
    + "                <span class=\"menu__item-text\">\n                    "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"menuItemText") : depth0), depth0))
    + "\n                </span>\n            </li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <img class=\"menu__item-icon\" src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"menuItemIcon") : depth0), depth0))
    + "\" alt=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"menuItemAlt") : depth0), depth0))
    + "\">\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"menuSections") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":17,"column":9}}})) != null ? stack1 : "");
},"useData":true});
templates['card.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <span class=\"card__headline-text font-base-text\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cardHeadline") : depth0), depth0))
    + " "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"units") : depth0), depth0))
    + "</span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <span class=\"card__headline-text font-base-text\">"
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"cardHeadline") : depth0), depth0))
    + "</span>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <span class=\"card__subhead-text font-caption\">"
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"cardSubhead") : depth0), depth0))
    + "</span>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"card__status "
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"cardStatus") : depth0), depth0))
    + "\"></div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"card "
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"cardSize") : depth0), depth0))
    + "\">\n    <div class=\"card__heading\">\n        <div class=\"card__heading-text-container\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"units") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":8,"column":19}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"cardSubhead") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":12},"end":{"line":11,"column":19}}})) != null ? stack1 : "")
    + "        </div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"cardStatus") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":8},"end":{"line":15,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n    <ul class=\"list\">\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"list") || (depth0 != null ? lookupProperty(depth0,"list") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"list","hash":{},"data":data,"loc":{"start":{"line":18,"column":8},"end":{"line":18,"column":18}}}) : helper))) != null ? stack1 : "")
    + "\n    </ul>\n</div>\n";
},"useData":true});
templates['loginSignupForm.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"passwordRepeatInput") || (depth0 != null ? lookupProperty(depth0,"passwordRepeatInput") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"passwordRepeatInput","hash":{},"data":data,"loc":{"start":{"line":8,"column":12},"end":{"line":8,"column":37}}}) : helper))) != null ? stack1 : "")
    + "\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"login-form\">\n    <form action=\"\">\n        <h1 class=\"\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"header") || (depth0 != null ? lookupProperty(depth0,"header") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"header","hash":{},"data":data,"loc":{"start":{"line":3,"column":21},"end":{"line":3,"column":31}}}) : helper)))
    + "</h1>\n        <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"helperText") || (depth0 != null ? lookupProperty(depth0,"helperText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"helperText","hash":{},"data":data,"loc":{"start":{"line":4,"column":11},"end":{"line":4,"column":25}}}) : helper)))
    + "</p>\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"userNameInput") || (depth0 != null ? lookupProperty(depth0,"userNameInput") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"userNameInput","hash":{},"data":data,"loc":{"start":{"line":5,"column":8},"end":{"line":5,"column":27}}}) : helper))) != null ? stack1 : "")
    + "\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"passwordInput") || (depth0 != null ? lookupProperty(depth0,"passwordInput") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"passwordInput","hash":{},"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":6,"column":27}}}) : helper))) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isSignup") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":8},"end":{"line":9,"column":15}}})) != null ? stack1 : "")
    + "        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"loginButton") || (depth0 != null ? lookupProperty(depth0,"loginButton") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"loginButton","hash":{},"data":data,"loc":{"start":{"line":10,"column":8},"end":{"line":10,"column":25}}}) : helper))) != null ? stack1 : "")
    + "\n    </form>\n</div>\n";
},"useData":true});
templates['sidebar.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <img\n                        class=\"sidebar__header-logo\"\n                        src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"siteLogo") : depth0), depth0))
    + "\"\n                        alt=\"Site logo\"\n                >\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"sidebar__footer-reminder\">\n                "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"reminder") || (depth0 != null ? lookupProperty(depth0,"reminder") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"reminder","hash":{},"data":data,"loc":{"start":{"line":26,"column":16},"end":{"line":26,"column":30}}}) : helper))) != null ? stack1 : "")
    + "\n            </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <img\n                        class=\"sidebar__footer-profile-img\"\n                        src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"profilePic") : depth0), depth0))
    + "\"\n                        alt=\"Profile image\"\n                >\n";
},"7":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <span class=\"sidebar__footer-profile-name font-base-text\">\n                    "
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"profileName") : depth0), depth0))
    + "\n                </span>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<aside class=\"sidebar\">\n    <div class=\"sidebar__header\">\n        <div class=\"sidebar__header-container\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"siteLogo") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":10,"column":19}}})) != null ? stack1 : "")
    + "            <span class=\"sidebar__header-text font-h1-bold\">\n                Hammy wallet\n            </span>\n        </div>\n    </div>\n\n    <div class=\"sidebar__container\">\n        <nav class=\"menu\">\n            "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"menu") || (depth0 != null ? lookupProperty(depth0,"menu") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"menu","hash":{},"data":data,"loc":{"start":{"line":19,"column":12},"end":{"line":19,"column":22}}}) : helper))) != null ? stack1 : "")
    + "\n        </nav>\n    </div>\n\n    <div class=\"sidebar__footer\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"reminder") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":8},"end":{"line":28,"column":15}}})) != null ? stack1 : "")
    + "        <div class=\"sidebar__footer-profile-container\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"profilePic") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":30,"column":12},"end":{"line":36,"column":19}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"profileName") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":37,"column":12},"end":{"line":41,"column":19}}})) != null ? stack1 : "")
    + "            "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"logoutButton") || (depth0 != null ? lookupProperty(depth0,"logoutButton") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"logoutButton","hash":{},"data":data,"loc":{"start":{"line":42,"column":12},"end":{"line":42,"column":30}}}) : helper))) != null ? stack1 : "")
    + "\n        </div>\n    </div>\n</aside>\n";
},"useData":true});
templates['dashboard.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = ((helper = (helper = lookupProperty(helpers,"balance") || (depth0 != null ? lookupProperty(depth0,"balance") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"balance","hash":{},"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":13}}}) : helper))) != null ? stack1 : "")
    + "\n"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"plannedBudget") || (depth0 != null ? lookupProperty(depth0,"plannedBudget") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"plannedBudget","hash":{},"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":2,"column":19}}}) : helper))) != null ? stack1 : "")
    + "\n"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"actualBudget") || (depth0 != null ? lookupProperty(depth0,"actualBudget") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"actualBudget","hash":{},"data":data,"loc":{"start":{"line":3,"column":0},"end":{"line":3,"column":18}}}) : helper))) != null ? stack1 : "")
    + "\n";
},"useData":true});
templates['layout.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"layout\">\n    <div class=\"grid\">\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"content") || (depth0 != null ? lookupProperty(depth0,"content") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"content","hash":{},"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":21}}}) : helper))) != null ? stack1 : "")
    + "\n    </div>\n</div>\n";
},"useData":true});
templates['loginSignUp.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"ImageTextLoginH1") || (depth0 != null ? lookupProperty(depth0,"ImageTextLoginH1") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"ImageTextLoginH1","hash":{},"data":data,"loc":{"start":{"line":6,"column":20},"end":{"line":6,"column":40}}}) : helper)))
    + " \n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"ImageTextRegistrH1") || (depth0 != null ? lookupProperty(depth0,"ImageTextRegistrH1") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"ImageTextRegistrH1","hash":{},"data":data,"loc":{"start":{"line":8,"column":20},"end":{"line":8,"column":42}}}) : helper)))
    + "\n                ";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"ImageTextLoginP1") || (depth0 != null ? lookupProperty(depth0,"ImageTextLoginP1") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"ImageTextLoginP1","hash":{},"data":data,"loc":{"start":{"line":12,"column":20},"end":{"line":12,"column":40}}}) : helper)))
    + " \n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"ImageTextRegistrP1") || (depth0 != null ? lookupProperty(depth0,"ImageTextRegistrP1") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"ImageTextRegistrP1","hash":{},"data":data,"loc":{"start":{"line":14,"column":20},"end":{"line":14,"column":42}}}) : helper)))
    + "\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <p class=\"font-caption\"> "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"LinkLogin") || (depth0 != null ? lookupProperty(depth0,"LinkLogin") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"LinkLogin","hash":{},"data":data,"loc":{"start":{"line":26,"column":37},"end":{"line":26,"column":50}}}) : helper)))
    + " </p> "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"button") || (depth0 != null ? lookupProperty(depth0,"button") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"button","hash":{},"data":data,"loc":{"start":{"line":26,"column":56},"end":{"line":26,"column":70}}}) : helper))) != null ? stack1 : "")
    + "\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <p class=\"font-caption\"> "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"LinkRegister") || (depth0 != null ? lookupProperty(depth0,"LinkRegister") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"LinkRegister","hash":{},"data":data,"loc":{"start":{"line":28,"column":37},"end":{"line":28,"column":53}}}) : helper)))
    + " </p> "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"button") || (depth0 != null ? lookupProperty(depth0,"button") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"button","hash":{},"data":data,"loc":{"start":{"line":28,"column":59},"end":{"line":28,"column":73}}}) : helper))) != null ? stack1 : "")
    + "\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
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
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"ImagePeople") || (depth0 != null ? lookupProperty(depth0,"ImagePeople") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"ImagePeople","hash":{},"data":data,"loc":{"start":{"line":18,"column":18},"end":{"line":18,"column":33}}}) : helper)))
    + "\" alt=\"People image\">\n    </div>\n    <div class=\"login-sign-up-layout__form\">\n        \n    </div>\n    \n    <div class=\"login-sign-up-layout__link-container\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isLogin") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data,"loc":{"start":{"line":25,"column":8},"end":{"line":29,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n\n</div>\n";
},"useData":true});
})();