var utils = {
    arraysDiffer: function (a, b) {
      var isDifferent = false;
      if (a.length !== b.length) {
        isDifferent = true;
      } else {
        a.forEach(function (item, index) {
          if (!this.isSame(item, b[index])) {
            isDifferent = true;
          }
        }, this);
      }
      return isDifferent;
    },

    objectsDiffer: function (a, b) {
      var isDifferent = false;
      if (Object.keys(a).length !== Object.keys(b).length) {
        isDifferent = true;
      } else {
        Object.keys(a).forEach(function (key) {
          if (!this.isSame(a[key], b[key])) {
            isDifferent = true;
          }
        }, this);
      }
      return isDifferent;
    },

    isSame: function (a, b) {
      if (typeof a !== typeof b) {
        return false;
      } else if (Array.isArray(a)) {
        return !this.arraysDiffer(a, b);
      } else if (typeof a === 'object' && a !== null && b !== null) {
        return !this.objectsDiffer(a, b);
      }

      return a === b;
    },

    find: function (collection, fn) {
      for (var i = 0, l = collection.length; i < l; i++) {
        var item = collection[i];
        if (fn(item)) {
          return item;
        }
      }
      return null;
    }
  }

  var isExisty = function (value) {
    return value !== null && value !== undefined;
  };

  var isEmpty = function (value) {
    return value === '' ;
  };

  var validations = {
    isDefaultRequiredValue: function (values, value) {
      return value === undefined || value === '';
    },
    isExisty: function (values, value) {
      return isExisty(value);
    },
    matchRegexp: function (values, value, regexp) {
      return !isExisty(value) || isEmpty(value) || regexp.test(value);
    },
    isUndefined: function (values, value) {
      return value === undefined;
    },
    isEmptyString: function (values, value) {
      return isEmpty(value);
    },
    isEmail: function (values, value) {
      return validations.matchRegexp(values, value, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);
    },
    isUrl: function (values, value) {
      return validations.matchRegexp(values, value, /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i);
    },
    isTrue: function (values, value) {
      return value === true;
    },
    isFalse: function (values, value) {
      return value === false;
    },
    isNumeric: function (values, value) {
      if (typeof value === 'number') {
        return true;
      }
      return validations.matchRegexp(values, value, /^[-+]?(?:\d*[.])?\d+$/);
    },
    isAlpha: function (values, value) {
      return validations.matchRegexp(values, value, /^[A-Z]+$/i);
    },
    isAlphanumeric: function (values, value) {
      return validations.matchRegexp(values, value, /^[0-9A-Z]+$/i);
    },
    isInt: function (values, value) {
      return validations.matchRegexp(values, value, /^(?:[-+]?(?:0|[1-9]\d*))$/);
    },
    isFloat: function (values, value) {
      return validations.matchRegexp(values, value, /^(?:[-+]?(?:\d+))?(?:\.\d*)?(?:[eE][\+\-]?(?:\d+))?$/);
    },
    isWords: function (values, value) {
      return validations.matchRegexp(values, value, /^[A-Z\s]+$/i);
    },
    isSpecialWords: function (values, value) {
      return validations.matchRegexp(values, value, /^[A-Z\s\u00C0-\u017F]+$/i);
    },
    isLength: function (values, value, length) {
      return !isExisty(value) || isEmpty(value) || value.length === length;
    },
    equals: function (values, value, eql) {
      return !isExisty(value) || isEmpty(value) || value == eql;
    },
    equalsField: function (values, value, field) {
      return value == values[field];
    },
    maxLength: function (values, value, length) {
      return !isExisty(value) || value.length <= length;
    },
    minLength: function (values, value, length) {
      return !isExisty(value) || isEmpty(value) || value.length >= length;
    },
    isMonth:function(values,value){
      return !isExisty(value) || (value <= 12 && value >=1);
    },
    isCreditCardYear:function(values,value){
      if(value.toString().length === 4){
        return !isExisty(value) || (value >= new Date().getFullYear());
      }
      return !isExisty(value);
    },
    isYear:function(values,value){
      return !isExisty(value) || (value >= 1850 && value <= new Date().getFullYear());
    },
    isDay:function(values,value){
      const isLeapYear = new Date(values['year'], 2, 0).getDate() == 29;
      var validDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
      validDays[1] = isLeapYear?29:28;
      return !isExisty(value) || !isExisty(values['year']) || !isExisty(values['month']) || (value<= validDays[Number(values['month']-1)] && value>=1);
    }
  };


var HOC = function (Component) {
  return React.createClass({
    mixins: [MixinFormsy],
    render: function () {
      return React.createElement(Component, {
        setValidations: this.setValidations,
        setValue: this.setValue,
        resetValue: this.resetValue,
        getValue: this.getValue,
        hasValue: this.hasValue,
        getErrorMessage: this.getErrorMessage,
        getErrorMessages: this.getErrorMessages,
        isFormDisabled: this.isFormDisabled,
        isValid: this.isValid,
        isPristine: this.isPristine,
        isFormSubmitted: this.isFormSubmitted,
        isRequired: this.isRequired,
        showRequired: this.showRequired,
        showError: this.showError,
        isValidValue: this.isValidValue,
        ...this.props
      });
    }
  });
};

var Decorator = function (Component) {
    return React.createClass({
      mixins: [MixinFormsy],
      render: function () {
        return React.createElement(Component, {
          setValidations: this.setValidations,
          setValue: this.setValue,
          resetValue: this.resetValue,
          getValue: this.getValue,
          hasValue: this.hasValue,
          getErrorMessage: this.getErrorMessage,
          getErrorMessages: this.getErrorMessages,
          isFormDisabled: this.isFormDisabled,
          isValid: this.isValid,
          isPristine: this.isPristine,
          isFormSubmitted: this.isFormSubmitted,
          isRequired: this.isRequired,
          showRequired: this.showRequired,
          showError: this.showError,
          isValidValue: this.isValidValue,
          ...this.props
        });
      }
    });
  };



var  MixinFormsy = {
    getInitialState: function () {
      return {
        _value: this.props.value,
        _isRequired: false,
        _isValid: true,
        _isPristine: true,
        _pristineValue: this.props.value,
        _validationError: [],
        _externalError: null,
        _formSubmitted: false
      };
    },
    contextTypes: {
      formsy: React.PropTypes.object // What about required?
    },
    getDefaultProps: function () {
      return {
        validationError: '',
        validationErrors: {}
      };
    },

    componentWillMount: function () {
      var configure = function () {
        this.setValidations(this.props.validations, this.props.required);
        // Pass a function instead?
        this.context.formsy.attachToForm(this);
        //this.props._attachToForm(this);
      }.bind(this);

      if (!this.props.name) {
        throw new Error('Form Input requires a name property when used');
      }

      /*
      if (!this.props._attachToForm) {
        return setTimeout(function () {
          if (!this.isMounted()) return;
          if (!this.props._attachToForm) {
            throw new Error('Form Mixin requires component to be nested in a Form');
          }
          configure();
        }.bind(this), 0);
      }
      */
      configure();
    },

    // We have to make the validate method is kept when new props are added
    componentWillReceiveProps: function (nextProps) {
      this.setValidations(nextProps.validations, nextProps.required);

    },

    componentDidUpdate: function (prevProps) {

      // If the value passed has changed, set it. If value is not passed it will
      // internally update, and this will never run
      if (!utils.isSame(this.props.value, prevProps.value)) {
        this.setValue(this.props.value);
      }

      // If validations or required is changed, run a new validation
      if (!utils.isSame(this.props.validations, prevProps.validations) || !utils.isSame(this.props.required, prevProps.required)) {
        this.context.formsy.validate(this);
      }
    },

    // Detach it when component unmounts
    componentWillUnmount: function () {
      this.context.formsy.detachFromForm(this);
      //this.props._detachFromForm(this);
    },

    setValidations: function (validations, required) {

      // Add validations to the store itself as the props object can not be modified
      this._validations = convertValidationsToObject(validations) || {};
      this._requiredValidations = required === true ? {isDefaultRequiredValue: true} : convertValidationsToObject(required);

    },

    // We validate after the value has been set
    setValue: function (value) {
      this.setState({
        _value: value,
        _isPristine: false
      }, function () {
        this.context.formsy.validate(this);
        //this.props._validate(this);
      }.bind(this));
    },
    resetValue: function () {
      this.setState({
        _value: this.state._pristineValue,
        _isPristine: true
      }, function () {
        this.context.formsy.validate(this);
        //this.props._validate(this);
      });
    },
    getValue: function () {
      return this.state._value;
    },
    hasValue: function () {
      return this.state._value !== '';
    },
    getErrorMessage: function () {
      var messages = this.getErrorMessages();
      return messages.length ? messages[0] : null;
    },
    getErrorMessages: function () {
      return !this.isValid() || this.showRequired() ? (this.state._externalError || this.state._validationError || []) : [];
    },
    isFormDisabled: function () {
      return this.context.formsy.isFormDisabled();
      //return this.props._isFormDisabled();
    },
    isValid: function () {
      return this.state._isValid;
    },
    isPristine: function () {
      return this.state._isPristine;
    },
    isFormSubmitted: function () {
      return this.state._formSubmitted;
    },
    isRequired: function () {
      return !!this.props.required;
    },
    showRequired: function () {
      return this.state._isRequired;
    },
    showError: function () {
      return !this.showRequired() && !this.isValid();
    },
    isValidValue: function (value) {
      return this.context.formsy.isValidValue.call(null, this, value);
      //return this.props._isValidValue.call(null, this, value);
    }
  };


Formsy = {};
var options = {};
var emptyArray = [];

Formsy.Mixin = MixinFormsy;
Formsy.HOC = HOC;
Formsy.Decorator = Decorator;
var validationRules = validations;

Formsy.defaults = function (passedOptions) {
  options = passedOptions;
};

Formsy.addValidationRule = function (name, func) {
  validationRules[name] = func;
};




Formsy.Form = React.createClass({
  displayName: 'Formsy',
  getInitialState: function () {
    return {
      isValid: true,
      isSubmitting: false,
      canChange: false
    };
  },
  getDefaultProps: function () {
    return {
      onSuccess: function () {},
      onError: function () {},
      onSubmit: function () {},
      onValidSubmit: function () {},
      onInvalidSubmit: function () {},
      onSubmitted: function () {},
      onValid: function () {},
      onInvalid: function () {},
      onChange: function () {},
      validationErrors: null,
      preventExternalInvalidation: false
    };
  },

  childContextTypes: {
    formsy: React.PropTypes.object
  },
  getChildContext: function () {
    return {
      formsy: {
        attachToForm: this.attachToForm,
        detachFromForm: this.detachFromForm,
        validate: this.validate,
        isFormDisabled: this.isFormDisabled,
        isValidValue: (component, value) => {
          return this.runValidation(component, value).isValid;
        }
      }
    }
  },

  // Add a map to store the inputs of the form, a model to store
  // the values of the form and register child inputs
  componentWillMount: function () {
    this.inputs = [];
  },

  componentDidMount: function () {
    this.validateForm();
  },

  componentWillUpdate: function () {
    // Keep a reference to input names before form updates,
    // to check if inputs has changed after render
    this.prevInputNames = this.inputs.map(component => component.props.name);
  },

  componentDidUpdate: function () {

    if (this.props.validationErrors && typeof this.props.validationErrors === 'object' && Object.keys(this.props.validationErrors).length > 0) {
      this.setInputValidationErrors(this.props.validationErrors);
    }

    var newInputNames = this.inputs.map(component => component.props.name);
    if (utils.arraysDiffer(this.prevInputNames, newInputNames)) {
      this.validateForm();
    }

  },

  // Allow resetting to specified data
  reset: function (data) {
    this.setFormPristine(true);
    this.resetModel(data);
  },

  // Update model, submit to url prop and send the model
  submit: function (event) {

    event && event.preventDefault();

    // Trigger form as not pristine.
    // If any inputs have not been touched yet this will make them dirty
    // so validation becomes visible (if based on isPristine)
    this.setFormPristine(false);
    var model = this.getModel();
    this.props.onSubmit(model, this.resetModel, this.updateInputsWithError);
    this.state.isValid ? this.props.onValidSubmit(model, this.resetModel, this.updateInputsWithError) : this.props.onInvalidSubmit(model, this.resetModel, this.updateInputsWithError);

  },

  mapModel: function (model) {

    if (this.props.mapping) {
      return this.props.mapping(model)
    } else {
      return formDataToObject(Object.keys(model).reduce((mappedModel, key) => {

        var keyArray = key.split('.');
        var base = mappedModel;
        while (keyArray.length) {
          var currentKey = keyArray.shift();
          base = (base[currentKey] = keyArray.length ? base[currentKey] || {} : model[key]);
        }

        return mappedModel;

      }, {}));
    }
  },

  getModel: function () {
    var currentValues = this.getCurrentValues();
    return this.mapModel(currentValues);
  },

  // Reset each key in the model to the original / initial / specified value
  resetModel: function (data) {
    this.inputs.forEach(component => {
      var name = component.props.name;
      if (data && data[name]) {
        component.setValue(data[name]);
      } else {
        component.resetValue();
      }
    });
    this.validateForm();
  },

  setInputValidationErrors: function (errors) {
    this.inputs.forEach(component => {
      var name = component.props.name;
      var args = [{
        _isValid: !(name in errors),
        _validationError: typeof errors[name] === 'string' ? [errors[name]] : errors[name]
      }];
      component.setState.apply(component, args);
    });
  },

  // Checks if the values have changed from their initial value
  isChanged: function() {
    return !utils.isSame(this.getPristineValues(), this.getCurrentValues());
  },

   getPristineValues: function() {
    return this.inputs.reduce((data, component) => {
      var name = component.props.name;
      data[name] = component.props.value;
      return data;
    }, {});
  },

  // Go through errors from server and grab the components
  // stored in the inputs map. Change their state to invalid
  // and set the serverError message
  updateInputsWithError: function (errors) {
    Object.keys(errors).forEach((name, index) => {
      var component = utils.find(this.inputs, component => component.props.name === name);
      if (!component) {
        throw new Error('You are trying to update an input that does not exist. ' +
          'Verify errors object with input names. ' + JSON.stringify(errors));
      }
      var args = [{
        _isValid: this.props.preventExternalInvalidation || false,
        _externalError: typeof errors[name] === 'string' ? [errors[name]] : errors[name]
      }];
      component.setState.apply(component, args);
    });
  },

  isFormDisabled: function () {
    return this.props.disabled;
  },

  getCurrentValues: function () {
    return this.inputs.reduce((data, component) => {
      var name = component.props.name;
      data[name] = component.state._value;
      return data;
    }, {});
  },

  setFormPristine: function (isPristine) {
    this.setState({
      _formSubmitted: !isPristine
    });

    // Iterate through each component and set it as pristine
    // or "dirty".
    this.inputs.forEach((component, index) => {
      component.setState({
        _formSubmitted: !isPristine,
        _isPristine: isPristine
      });
    });
  },

  // Use the binded values and the actual input value to
  // validate the input and set its state. Then check the
  // state of the form itself
  validate: function (component) {

    // Trigger onChange
    if (this.state.canChange) {
      this.props.onChange(this.getCurrentValues(), this.isChanged());
    }

    var validation = this.runValidation(component);
    // Run through the validations, split them up and call
    // the validator IF there is a value or it is required
    component.setState({
      _isValid: validation.isValid,
      _isRequired: validation.isRequired,
      _validationError: validation.error,
      _externalError: null
    }, this.validateForm);

  },

  // Checks validation on current value or a passed value
  runValidation: function (component, value) {

    var currentValues = this.getCurrentValues();
    var validationErrors = component.props.validationErrors;
    var validationError = component.props.validationError;
    value = arguments.length === 2 ? value : component.state._value;

    var validationResults = this.runRules(value, currentValues, component._validations);
    var requiredResults = this.runRules(value, currentValues, component._requiredValidations);

    // the component defines an explicit validate function
    if (typeof component.validate === "function") {
      validationResults.failed = component.validate() ? [] : ['failed'];
    }

    var isRequired = Object.keys(component._requiredValidations).length ? !!requiredResults.success.length : false;
    var isValid = !validationResults.failed.length && !(this.props.validationErrors && this.props.validationErrors[component.props.name]);

    return {
      isRequired: isRequired,
      isValid: isRequired ? false : isValid,
      error: (function () {

        if (isValid && !isRequired) {
          return emptyArray;
        }

        if (validationResults.errors.length) {
          return validationResults.errors;
        }

        if (this.props.validationErrors && this.props.validationErrors[component.props.name]) {
          return typeof this.props.validationErrors[component.props.name] === 'string' ? [this.props.validationErrors[component.props.name]] : this.props.validationErrors[component.props.name];
        }

        if (isRequired) {
          var error = validationErrors[requiredResults.success[0]];
          return error ? [error] : null;
        }

        if (validationResults.failed.length) {
          return validationResults.failed.map(function(failed) {
            return validationErrors[failed] ? validationErrors[failed] : validationError;
          }).filter(function(x, pos, arr) {
            // Remove duplicates
            return arr.indexOf(x) === pos;
          });
        }

      }.call(this))
    };

  },

  runRules: function (value, currentValues, validations) {

    var results = {
      errors: [],
      failed: [],
      success: []
    };
    if (Object.keys(validations).length) {
      Object.keys(validations).forEach(function (validationMethod) {

        if (validationRules[validationMethod] && typeof validations[validationMethod] === 'function') {
          throw new Error('Formsy does not allow you to override default validations: ' + validationMethod);
        }

        if (!validationRules[validationMethod] && typeof validations[validationMethod] !== 'function') {
          throw new Error('Formsy does not have the validation rule: ' + validationMethod);
        }

        if (typeof validations[validationMethod] === 'function') {
          var validation = validations[validationMethod](currentValues, value);
          if (typeof validation === 'string') {
            results.errors.push(validation);
            results.failed.push(validationMethod);
          } else if (!validation) {
            results.failed.push(validationMethod);
          }
          return;

        } else if (typeof validations[validationMethod] !== 'function') {
          var validation = validationRules[validationMethod](currentValues, value, validations[validationMethod]);
          if (typeof validation === 'string') {
            results.errors.push(validation);
            results.failed.push(validationMethod);
          } else if (!validation) {
            results.failed.push(validationMethod);
          } else {
            results.success.push(validationMethod);
          }
          return;

        }

        return results.success.push(validationMethod);

      });
    }

    return results;

  },

  // Validate the form by going through all child input components
  // and check their state
  validateForm: function () {

    // We need a callback as we are validating all inputs again. This will
    // run when the last component has set its state
    var onValidationComplete = function () {
      var allIsValid = this.inputs.every(component => {
        return component.state._isValid;
      });

      this.setState({
        isValid: allIsValid
      });

      if (allIsValid) {
        this.props.onValid();
      } else {
        this.props.onInvalid();
      }

      // Tell the form that it can start to trigger change events
      this.setState({
        canChange: true
      });

    }.bind(this);

    // Run validation again in case affected by other inputs. The
    // last component validated will run the onValidationComplete callback
    this.inputs.forEach((component, index) => {
      var validation = this.runValidation(component);
      if (validation.isValid && component.state._externalError) {
        validation.isValid = false;
      }
      component.setState({
        _isValid: validation.isValid,
        _isRequired: validation.isRequired,
        _validationError: validation.error,
        _externalError: !validation.isValid && component.state._externalError ? component.state._externalError : null
      }, index === this.inputs.length - 1 ? onValidationComplete : null);
    });

    // If there are no inputs, set state where form is ready to trigger
    // change event. New inputs might be added later
    if (!this.inputs.length && this.isMounted()) {
      this.setState({
        canChange: true
      });
    }
  },

  // Method put on each input component to register
  // itself to the form
  attachToForm: function (component) {

    if (this.inputs.indexOf(component) === -1) {
      this.inputs.push(component);
    }

    this.validate(component);
  },

  // Method put on each input component to unregister
  // itself from the form
  detachFromForm: function (component) {
    var componentPos = this.inputs.indexOf(component);

    if (componentPos !== -1) {
      this.inputs = this.inputs.slice(0, componentPos)
        .concat(this.inputs.slice(componentPos + 1));
    }

    this.validateForm();
  },
  render: function () {
    var {
      mapping,
      validationErrors,
      onSubmit,
      onValid,
      onInvalid,
      onInvalidSubmit,
      onChange,
      reset,
      preventExternalInvalidation,
      onSuccess,
      onError,
      ...nonFormsyProps
    } = this.props;

    return (
      <form {...nonFormsyProps} onSubmit={this.submit}>
        {this.props.children}
      </form>
    );

  }
});
