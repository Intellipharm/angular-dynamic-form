/*!
 * angular-dynamic-form v0.1.4
 * http://intellipharm.com/
 *
 * Copyright 2015 Intellipharm
 *
 * 2015-04-15 10:44:07
 *
 */
(function() {
    'use strict';

    //----------------------------------
    // Angular Dynamic Form
    //----------------------------------

    angular.module('AngularDynamicForm', [
        'angular.filter'
    ]);
})();

angular.module('AngularDynamicForm').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('angular-dynamic-form/views/dynamic-form-fieldset.html',
    "<div class=\"dynamic-form-fieldset {{style_config.fieldset_class}}\" ng-class=\"{\n" +
    "    'has-feedback': config.has_validation_feedback,\n" +
    "    'has-success': errors.length === 0 && show_validation,\n" +
    "    'has-error': errors.length > 0 && show_validation,\n" +
    "    'required': field.validate}\">\n" +
    "\n" +
    "    <label ng-if=\"field.label !== '' && config.show_labels\" for=\"{{field.name}}\"\n" +
    "           class=\"{{style_config.label_class}}\">{{field.label}}</label>\n" +
    "\n" +
    "    <!-- edit state -->\n" +
    "\n" +
    "    <div class=\"{{style_config.input_box_class}}\">\n" +
    "\n" +
    "        <div ng-include src=\"input_view_template\"></div>\n" +
    "\n" +
    "        <!-- validation feedback -->\n" +
    "        <span ng-show=\"config.has_validation_feedback\"\n" +
    "              class=\"{{style_config.validation_feedback_class}} glyphicon\"\n" +
    "              ng-class=\"{\n" +
    "              'glyphicon-ok': errors.length === 0 && show_validation,\n" +
    "              'glyphicon-remove': errors.length > 0 && show_validation\n" +
    "              }\"></span>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- indicators -->\n" +
    "    <div ng-show=\"field.required && config.has_required_indicator\" class=\"{{style_config.required_indicator_class}}\">\n" +
    "        <span>*</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"errors.length > 0 && show_validation\"\n" +
    "         class=\"{{style_config.field_message_error_class}}\">{{errors[0]}}</div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('angular-dynamic-form/views/dynamic-form-groups.html',
    "<!-- form groups -->\n" +
    "<div ng-if=\"has_groups\"\n" +
    "     class=\"panel panel-default form-section\"\n" +
    "     ng-repeat=\"(key, group) in grouped_fields_array | groupBy: 'group_order'\">\n" +
    "\n" +
    "    <div class=\"panel-heading\">{{group[0].group_label}}</div>\n" +
    "    <div class=\"panel-body\">\n" +
    "\n" +
    "        <dynamic-form-fieldset ng-repeat=\"field in group\"\n" +
    "                               field=\"field\"\n" +
    "                               model=\"model\"\n" +
    "                               config=\"form_field_config\"\n" +
    "                               style-config=\"form_style_config\"\n" +
    "                               errors=\"errors[field.name]\"\n" +
    "                               show-validation=\"errors[field.name]\"\n" +
    "                               on-change=\"ctrl.onFieldChange()\"\n" +
    "                               on-blur=\"ctrl.onFieldBlur()\"></dynamic-form-fieldset>\n" +
    "\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('angular-dynamic-form/views/dynamic-form-no-groups.html',
    "<!-- no form groups -->\n" +
    "<dynamic-form-fieldset ng-if=\"!has_groups\"\n" +
    "                       ng-repeat=\"field in fields_array\"\n" +
    "                       field=\"field\"\n" +
    "                       model=\"model\"\n" +
    "                       config=\"form_field_config\"\n" +
    "                       style-config=\"form_style_config\"\n" +
    "                       errors=\"errors[field.name]\"\n" +
    "                       show-validation=\"errors[field.name]\"\n" +
    "                       on-change=\"ctrl.onFieldChange()\"\n" +
    "                       on-blur=\"ctrl.onFieldBlur()\"></dynamic-form-fieldset>"
  );


  $templateCache.put('angular-dynamic-form/views/dynamic-form.html',
    "<!-- message -->\n" +
    "<div class=\"{{form_style_config.message_box_class}}\" move-with-scroll suppress=\"form_config.scroll_message\">\n" +
    "\n" +
    "    <div ng-messages=\"message_state\" class=\"message\">\n" +
    "        <div class=\"{{form_style_config.message_success_class}}\" role=\"alert\"\n" +
    "             ng-message=\"success\" ng-if=\"message.success && form_config.show_success_messages\">{{message.success}}</div>\n" +
    "        <div class=\"{{form_style_config.message_error_class}}\" role=\"alert\"\n" +
    "             ng-message=\"error\" ng-if=\"message.error && form_config.show_error_messages\">{{message.error}}</div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- form -->\n" +
    "<form role=\"form\" class=\"form-horizontal\">\n" +
    "\n" +
    "    <!-- groups or no-groups template -->\n" +
    "    <div ng-include src=\"form_view_template\"></div>\n" +
    "\n" +
    "    <!-- buttons -->\n" +
    "    <div class=\"{{form_style_config.button_box_class}}\" ng-show=\"show_buttons\">\n" +
    "        <button ng-show=\"form_config.show_submit_button\" type=\"submit\"\n" +
    "                class=\"{{form_style_config.submit_button_class}}\"\n" +
    "                ng-click=\"ctrl.onSubmit()\">{{form_config.submit_button_label}}</button>\n" +
    "\n" +
    "        <button ng-show=\"form_config.show_cancel_button\" type=\"button\"\n" +
    "                class=\"{{form_style_config.cancel_button_class}}\"\n" +
    "                ng-click=\"ctrl.onCancel()\">{{form_config.cancel_button_label}}</button>\n" +
    "\n" +
    "        <button ng-show=\"form_config.show_clear_button\" type=\"button\"\n" +
    "                class=\"{{form_style_config.clear_button_class}}\"\n" +
    "                ng-click=\"ctrl.onClear()\">{{form_config.clear_button_label}}</button>\n" +
    "    </div>\n" +
    "</form><!-- /form -->"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/checkbox.html',
    "<!-- checkbox -->\n" +
    "<input type=\"checkbox\"\n" +
    "       ng-model=\"model[field.name]\"\n" +
    "       ng-change=\"ctrl.onChange()\" ng-disabled=\"model.form_field_config[field.name].disabled\">\n" +
    "\n" +
    "<label ng-if=\"field.right_label !== '' && config.show_right_labels\" for=\"{{field.name}}\"\n" +
    "       class=\"{{style_config.right_label_class}}\">{{field.right_label}}</label>"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/currency.html',
    "<!-- currency -->\n" +
    "<div class=\"input-group\">\n" +
    "    <div class=\"input-group-addon\">{{field.symbol}}</div>\n" +
    "    <input type=\"text\" id=\"{{field.name}}\" class=\"form-control\" placeholder=\"{{field.label}}\"\n" +
    "           ng-model=\"model[field.name]\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "</div>"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/multi_select.html',
    "<!-- multi_select -->\n" +
    "<select class=\"form-control\"\n" +
    "        ng-model=\"model[field.name]\" multiple size=\"{{field.type.size}}\" ng-options=\"option.value as option.label for option in field.options\"\n" +
    "        ng-change=\"ctrl.onChange()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "</select>"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/password.html',
    "<!-- password -->\n" +
    "<input type=\"password\" id=\"{{field.name}}\" class=\"form-control\" placeholder=\"{{field.label}}\"\n" +
    "           ng-model=\"model[field.name]\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/select.html',
    "<!-- select -->\n" +
    "<select class=\"form-control\"\n" +
    "        ng-model=\"model[field.name]\" ng-options=\"option.value as option.label for option in field.options\"\n" +
    "        ng-change=\"ctrl.onChange()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "    <option value=\"\" disabled>Please select</option>\n" +
    "</select>"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/text.html',
    "<!-- text -->\n" +
    "<input type=\"text\" id=\"{{field.name}}\" class=\"{{style_config.input_class}}\" placeholder=\"{{field.label}}\"\n" +
    "       ng-model=\"model[field.name]\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/textarea.html',
    "<!-- textarea -->\n" +
    "<textarea id=\"{{field.name}}\" class=\"form-control\" placeholder=\"{{field.label}}\"\n" +
    "          ng-model=\"model[field.name]\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\"></textarea>\n"
  );

}]);

(function() {
    'use strict';

    //----------------------------------
    // DynamicForm Settings
    //----------------------------------

    var message_prefix = 'AngularDynamicForm: ';

    angular.module('AngularDynamicForm')
        .value('AngularDynamicFormCustomInputViewUrl', 'views/inputs/')
        .constant('DYNAMIC_FORM_EVENTS', {
            init:           'dynamic-form:init',
            valid:          'dynamic-form:valid',
            invalid:        'dynamic-form:invalid',
            saveSuccess:    'dynamic-form:process-success',
            saveError:      'dynamic-form:process-error',
            submit:         'dynamic-form:submit',
            validate:       'dynamic-form:validate'
        })
        .constant('MESSAGE_EXTERNAL_METHOD_ERROR',                      message_prefix + 'Custom method must handle its own errors')
        .constant('MESSAGE_EXTERNAL_METHOD_INVALID_RETURN',             message_prefix + 'Custom method must return either Boolean value or Promise')
        .constant('MESSAGE_INVALID_STEP',                               message_prefix + 'Invalid step')
        .constant('MESSAGE_UNRECOGNISED_STEP_NAME',                     message_prefix + 'Unrecognised step name')
        .constant('MESSAGE_INVALID_CONFIG',                             message_prefix + 'Invalid config')
        .constant('MESSAGE_INVALID_FIELDS_OBJECT',                      message_prefix + 'Invalid fields object')
        .constant('MESSAGE_INVALID_OPTIONS_ARRAY',                      message_prefix + 'Invalid options array')
        .constant('MESSAGE_INVALID_OPTIONS_OBJECT',                     message_prefix + 'Invalid options object')
        .constant('MESSAGE_UNRECOGNISED_CONFIG_NAME',                   message_prefix + 'Unrecognised config name')
        .constant('MESSAGE_INVALID_MODEL_METHOD',                       message_prefix + 'Invalid model method');
})();

(function() {
    'use strict';

    //----------------------------------
    // Dynamic Form Controller
    //----------------------------------

    var DynamicFormCtrl = function($rootScope, $scope, $q, DYNAMIC_FORM_EVENTS, FieldTransformer, ConfigTransformer, SubmitService) {

        var self = this;

        // control
        $scope.submit_step = null;
        $scope.show_buttons = false;

        var dont_clear_fields = ['model'];

        // defaults
        this.default_submit_steps = [
            'validate',
            'save'
        ];

        // messaging
        $scope.message        = {};
        $scope.message_state  = {success: false, error: false};

        /////////////////////////////////////////////////////
        //
        // handlers
        //
        /////////////////////////////////////////////////////

        /**
         * onCancel
         */
        this.onCancel = function() {

            if (!_.isUndefined($scope.onCancel)) {
                $scope.onCancel('');
            }
        };

        /**
         * onClear
         */
        this.onClear = function() {

            // clear model data
            _.forEach($scope.model, function (item, key) {

                // if not in dont_clear_fields
                if (!_.contains(dont_clear_fields, key)) {
                    $scope.model[key] = undefined; // clear field
                }
            }, this);

            if (!_.isUndefined($scope.onClear)) {
                $scope.onClear('');
            }
        };

        /**
         * onFieldBlur
         */
        this.onFieldBlur = function() {

            // custom blur handler
            if (!_.isUndefined($scope.onBlur)) {
                $scope.onBlur();
            }
        };

        /**
         * onFieldChange
         */
        this.onFieldChange = function() {

            // custom change handler
            if (!_.isUndefined($scope.onChange)) {
                $scope.onChange();
            }

            // show button on change
            if ($scope.form_config.show_buttons_on_change) {
                $scope.show_buttons = true;
            }
        };

        /**
         * onSubmit
         */
        this.onSubmit = function() {

            // get submit steps
            var submit_steps = !_.isUndefined($scope.submit_steps) ? $scope.submit_steps : this.default_submit_steps;

            // call submit service
            SubmitService.handleSubmit(submit_steps, $scope.model, $scope.form_config).then(

                // complete
                function(response) {

                    // custom complete handler
                    if (!_.isUndefined($scope.onSubmitComplete)) {
                        $scope.onSubmitComplete(response);
                    }
                },

                // error
                function(response) {

                    // custom error handler
                    if (!_.isUndefined($scope.onError)) {
                        $scope.onError(response);
                    }
                },

                // updates (messaging)
                function(response) {

                    // set errors
                    $scope.errors = response.errors;

                    // show message
                    self.showMessage(response.message_state, response.message);

                    // emit event (if recognised step)
                    switch (response.step) {

                        case 'validate':
                            if (response.message_state === 'success') {
                                $scope.$emit(DYNAMIC_FORM_EVENTS.valid);
                            } else {
                                $scope.$emit(DYNAMIC_FORM_EVENTS.invalid);
                            }
                            break;

                        case 'save':
                            if (response.message_state === 'success') {
                                $scope.$emit(DYNAMIC_FORM_EVENTS.saveSucccess);
                            } else {
                                $scope.$emit(DYNAMIC_FORM_EVENTS.saveError, response);
                            }
                            break;

                    }
                }
            );
        };

        /////////////////////////////////////////////////////
        //
        // init
        //
        /////////////////////////////////////////////////////

        /**
         * init
         * called when model is ready
         */
        this.init = function() {

            // transform configs
            $scope.form_config          = ConfigTransformer.transformConfig('form', $scope.form_config);
            $scope.form_style_config    = ConfigTransformer.transformConfig('form_style', $scope.form_style_config);
            $scope.form_field_config    = ConfigTransformer.transformConfig('form_field', $scope.form_field_config);

            // transform fields
            $scope.fields_array         = FieldTransformer.transformFields($scope.fields, $scope.form_config, $scope.model);

            // if groups
            if ($scope.has_groups) {

                // transform group fields
                $scope.grouped_fields_array = FieldTransformer.transformGroupFields($scope.fields_array, $scope.groups_config);
            }

            // auto submit
            if ($scope.form_config.auto_submit) {
                this.onSubmit();
            }

            // show button on change
            if (!$scope.form_config.show_buttons_on_change) {
                $scope.show_buttons = true;
            }
        };

        /////////////////////////////////////////////////////
        //
        // messaging
        //
        /////////////////////////////////////////////////////

        /**
         * hideMessage
         */
        this.hideMessage = function() {
            $scope.message = {};
            _.forEach($scope.message_state, function (item) {
                item = false;
            });
        };

        /**
         * showMessage
         *
         * @param type
         * @param message
         */
        this.showMessage = function(type, message) {
            this.hideMessage();
            $scope.message[type] = message;
            $scope.message_state[type] = true;
        };

        /////////////////////////////////////////////////////
        //
        // watchers
        //
        /////////////////////////////////////////////////////

        //-----------------------------------
        // model
        //-----------------------------------

        var unWatchModel = $scope.$watch('model', function(model) {
            if (!_.isUndefined(model)) {
                self.init();
                unWatchModel();
            }
        }, true);

        /////////////////////////////////////////////////////
        //
        // events
        //
        /////////////////////////////////////////////////////

        //-----------------------------------
        // submit (force submit)
        //-----------------------------------

        $scope.$on(DYNAMIC_FORM_EVENTS.submit, function(evt, params) {

            if (_.has(params, 'model') && params.model !== $scope.model.model) {
                return;
            }

            self.onSubmit();

            //if ($scope.is_active == true) {
            //    $scope.submitted = true;
            //    self.onSubmit();
            //} else {
            //    $scope.submitted = false;
            //}
        });
    };

    DynamicFormCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$q',
        'DYNAMIC_FORM_EVENTS',
        'AngularDynamicForm.transformers.FieldTransformer',
        'AngularDynamicForm.transformers.ConfigTransformer',
        'AngularDynamicForm.helpers.SubmitService'
    ];

    angular.module('AngularDynamicForm')
        .controller('DynamicFormCtrl', DynamicFormCtrl);
})();

(function() {
    'use strict';

    var dynamicForm = function() {

        return {
            restrict: 'E',
            scope: {
                model:              '=',
                fields:             '=',
                form_config:        '=config',
                form_field_config:  '=fieldConfig',
                form_style_config:  '=styleConfig',
                groups_config:      '=groupsConfig',
                submit_steps:       '=submitSteps',
                onSubmitComplete:   '&',
                onCancel:           '&',
                onClear:            '&',
                onError:            '&',
                onChange:           '&',
                onBlur:             '&'
            },
            controller: 'DynamicFormCtrl as ctrl',
            templateUrl: 'angular-dynamic-form/views/dynamic-form.html',
            link: function(scope) {//, element) {

                //element.addClass('dynamic-form');

                // set form template
                if (!_.isUndefined(scope.groups_config)) {
                    scope.has_groups = true;
                    scope.form_view_template = 'angular-dynamic-form/views/dynamic-form-groups.html';
                } else {
                    scope.has_groups = false;
                    scope.form_view_template = 'angular-dynamic-form/views/dynamic-form-no-groups.html';
                }
            }
        };
    };

    dynamicForm.$inject = [];

    angular.module('AngularDynamicForm')
        .directive('dynamicForm', dynamicForm);

})();

(function () {
    'use strict';

    //----------------------------------
    // Submit Service
    //----------------------------------

    var Service = function($q,
                           ValidationService,
                           ExternalCallService,
                           MESSAGE_INVALID_STEP,
                           MESSAGE_UNRECOGNISED_STEP_NAME) {

        var self = this;

        var _last_response_type;
        var _last_response;

        ///////////////////////////////////////
        //
        // step handlers
        //
        ///////////////////////////////////////

        /**
         * handleSubmit
         *
         * @param steps
         * @param model
         * @param form_config
         * @returns Promise
         */
        this.handleSubmit = function(steps, model, form_config) {

            var deferred = $q.defer();

            // set handlers
            var handlers = {
                submit_complete: deferred.resolve,
                submit_update: deferred.notify,
                submit_error: deferred.reject
            };

            // process
            self.handleSubmitSteps(0, steps, model, form_config, handlers);

            return deferred.promise;
        };

        /**
         * handleSubmitSteps
         *
         * @param step
         * @param steps
         * @param model
         * @param form_config
         * @param handlers
         */
        this.handleSubmitSteps = function(step, steps, model, form_config, handlers, response) {

            // default
            step = !_.isUndefined(step) ? step : 0;

            // step is out of range
            if (step >= steps.length) {

                // call complete handler
                if (!_.isNull(handlers.submit_complete)) {
                    handlers.submit_complete(response);
                }
                return;
            }

            self.handleSubmitStep(step, steps, model, form_config).then(

                // resolve
                function (response) {

                    // redefined model & form config
                    if (_.has(response, 'model')) {
                        model = response.model;
                    }
                    if (_.has(response, 'form_config')) {
                        form_config = response.form_config;
                    }

                    _last_response = response;
                    _last_response_type = 'success';

                    // send update
                    sendUpdate('success', response, step, steps, form_config, handlers);

                    // continue...
                    self.handleSubmitSteps(++step, steps, model, form_config, handlers, response);
                },

                // rejection
                function (response) {

                    // redefined model & form config
                    if (_.has(response, 'model')) {
                        model = response.model;
                    }
                    if (_.has(response, 'form_config')) {
                        form_config = response.form_config;
                    }

                    _last_response = response;
                    _last_response_type = 'success';

                    // send update
                    sendUpdate('error', response, step, steps, form_config, handlers);
                }
            );
        };

        /**
         * sendUpdate
         *
         * @param response_type
         * @param response
         * @param step
         * @param steps
         * @param form_config
         * @param handlers
         */
        var sendUpdate = function(response_type, response, step, steps, form_config, handlers) {

            // transform response if not an object
            if (!_.isObject(response)) {
                response = {message: response};
            }

            // get message from form config using step
            step = _.isFunction(steps[step]) ? 'custom' : steps[step];
            var form_config_message_key;

            switch (step) {
                case 'validate':    form_config_message_key = 'validation_' + response_type + '_message'; break;
                case 'save':        form_config_message_key = 'save_' + response_type + '_message'; break;
                default:            form_config_message_key = 'custom_' + response_type + '_message'; break;
            }

            var args = {
                message_state: response_type,
                step: step
            };

            // set message to form config message or response message
            args.message = !_.isNull(form_config[form_config_message_key]) ? form_config[form_config_message_key] : response.message;

            // errors
            args.errors = _.has(response, 'data') ? response.data : {};

            // send update
            if (!_.isNull(handlers.submit_update)) {
                handlers.submit_update(args);
            }
        };

        /**
         * handleSubmitStep
         *
         * @param step
         * @param steps
         * @param model
         * @param form_config
         * @returns Promise
         */
        this.handleSubmitStep = function(step, steps, model, form_config) {

            return $q(function(resolve, reject) {

                // step is invalid
                if (!_.isFunction(steps[step]) && !_.isString(steps[step])) {
                    throw new Error(MESSAGE_INVALID_STEP);
                }

                // step is a custom method
                if (_.isFunction(steps[step])) {

                    // set args as last response if defined
                    var args;
                    if (!_.isUndefined(_last_response) && !_.isNull(_last_response)) {

                        if (_.isString(_last_response)) {
                            _last_response = {message: _last_response};
                        }

                        args = _last_response;
                        args.type = _last_response_type;
                    }

                    // call external method with args;
                    ExternalCallService.callExternalMethod(steps[step], args).then(resolve, reject);
                    return;
                }

                // step is a string (internal method)
                self.handleSubmitStepInternalMethod(step, steps, model, form_config).then(resolve, reject);
            });
        };

        /**
         * handleSubmitStepInternalMethod
         *
         * @param step
         * @param steps
         * @param model
         * @param form_config
         * @returns Promise
         */
        this.handleSubmitStepInternalMethod = function(step, steps, model, form_config) {

            var step_method_key = steps[step];

            // invalid method
            if (!_.has(self.internal_methods, step_method_key)) {
                throw new Error(MESSAGE_UNRECOGNISED_STEP_NAME);
            }

            // call internal method
            switch (step_method_key) {

                case 'validate':
                    return self.internal_methods.validate(model, form_config);

                case 'save':
                    return self.internal_methods.save(model);

                default:
                    return self.internal_methods[step_method_key]();
            }
        };

        ///////////////////////////////////////
        //
        // internal methods
        //
        ///////////////////////////////////////

        /**
         * save
         *
         * @param model
         * @returns Promise
         */
        this.save = function(model) {
            return ExternalCallService.callExternalMethod(model.save, [], model);
        };

        ///////////////////////////////////////
        //
        // init
        //
        ///////////////////////////////////////

        // set internal methods

        this.internal_methods = {
            validate:     ValidationService.validate,
            save:         this.save
        };
    };

    Service.$inject = [
        '$q',
        'AngularDynamicForm.validation.ValidationService',
        'AngularDynamicForm.helpers.ExternalCallService',
        'MESSAGE_INVALID_STEP',
        'MESSAGE_UNRECOGNISED_STEP_NAME'
    ];

    angular.module('AngularDynamicForm')
        .service('AngularDynamicForm.helpers.SubmitService', Service);

})();

(function () {
    'use strict';

    //----------------------------------
    // External Call Service
    //----------------------------------

    var Service = function($q,
                           MESSAGE_EXTERNAL_METHOD_ERROR,
                           MESSAGE_EXTERNAL_METHOD_INVALID_RETURN) {

        /**
         * callExternalMethod
         *
         * @param method
         * @param args
         * @param scope
         * @returns Promise
         */
        this.callExternalMethod = function(method, args, scope) {
            return $q(function(resolve, reject) {

                var response;

                // call method and get response
                try {

                    // TODO: start: is this the best way to do this?????
                    // here we call the method on the provided scope with provided args
                    if (!_.isUndefined(scope)) {
                        response = method.apply(scope, args);
                    }
                    // here we call the method on the current scope with args as a single argument
                    else {
                        response = method(args);
                    }
                    // TODO: end

                } catch (error) {
                    throw new Error(MESSAGE_EXTERNAL_METHOD_ERROR);
                }

                if (_.isUndefined(response)) {
                    throw new Error(MESSAGE_EXTERNAL_METHOD_INVALID_RETURN);
                }

                // if method response is boolean value
                if (response === false || response === true) {

                    if (response) {
                        resolve(null);
                    } else {
                        reject(null);
                    }
                }

                // method response is a promise
                else {

                    try {
                        response.then(resolve, reject);
                    } catch (error) {

                        // not a promise
                        if (error instanceof TypeError) {
                            throw new Error(MESSAGE_EXTERNAL_METHOD_INVALID_RETURN);
                        }

                        // unknown error
                        else {
                            throw new Error(MESSAGE_EXTERNAL_METHOD_ERROR);
                        }
                    }
                }
            });
        };
    };

    Service.$inject = [
        '$q',
        'MESSAGE_EXTERNAL_METHOD_ERROR',
        'MESSAGE_EXTERNAL_METHOD_INVALID_RETURN'
    ];

    angular.module('AngularDynamicForm')
        .service('AngularDynamicForm.helpers.ExternalCallService', Service);

})();

(function () {
    'use strict';

    //----------------------------------
    // Validation Service
    //----------------------------------

    var Service = function($q, ExternalCallService) {

        /**
         * validate
         *
         * @param model
         * @param config
         * @returns {*}
         */
        this.validate = function(model, config) {

            return $q(function(resolve, reject) {

                // create validation field list
                var validation_list = createValidationList(model, config);

                // call external method
                ExternalCallService.callExternalMethod(model.validate, [
                    validation_list
                ], model).then(resolve, reject);

            });
        };

        /**
         * createValidationList
         *
         * @param model
         * @param config
         * @returns {Array}
         */
        var createValidationList = function(model, config) {

            var list = [];

            // validation fields by inclusion (white list)
            if (!_.isNull(config.validate_fields)) {
                list = config.validate_fields;
            }

            // validation fields by exclusion (black list)
            else if (!_.isNull(config.validate_fields_exclude)) {

                _.forEach(model, function (item, key) {
                    if (!_.include(config.validate_fields_exclude, key) && !_.include(config.validate_fields, key)) {
                        list.push(key);
                    }
                });
            }

            //console.log(model);
            //console.log(config);
            //console.log(list);

            return list;
        };

    };

    Service.$inject = ['$q', 'AngularDynamicForm.helpers.ExternalCallService'];

    angular.module('AngularDynamicForm')
        .service('AngularDynamicForm.validation.ValidationService', Service);

})();

(function () {
    'use strict';

    //----------------------------------
    // Config Transformer Service
    //----------------------------------

    var Service = function(MESSAGE_UNRECOGNISED_CONFIG_NAME) {

        var _form_config = {
            auto_submit:                  false, // use when you need to auto submit form (eg. after redirect)
            label_camelcase:              true,
            label_replace_underscores:    true,
            show_buttons_on_change:       false,
            show_error_messages:          true,
            show_success_messages:        true,
            show_submit_button:           true,
            show_cancel_button:           false,
            show_clear_button:            false,
            submit_button_label:          'SUBMIT',
            cancel_button_label:          'CANCEL',
            clear_button_label:           'CLEAR',
            validate_fields:              null,
            validate_fields_exclude:      null,
            validation_error_message:     null,
            validation_success_message:   null,
            save_error_message:           null,
            save_success_message:         null,
            custom_error_message:         null,
            custom_success_message:       null
        };

        var _form_field_config = {
            has_messages:                 true,
            has_groups:                   true,
            show_labels:                  true,
            show_right_labels:            true,
            has_validation_feedback:      true,
            has_required_indicator:       true
        };

        var _form_style_config = {
            fieldset_class:               '',
            label_class:                  '',
            right_label_class:            '',
            input_box_class:              '',
            input_class:                  '',
            validation_feedback_class:    '',
            required_indicator_class:     '',
            message_box_class:            '',
            button_box_class:             '',
            submit_button_class:          '',
            cancel_button_class:          '',
            clear_button_class:           '',
            message_error_class:          '',
            field_message_error_class:    '',
            message_success_class:        ''
        };

        this.config  = {
            form: _form_config,
            form_field: _form_field_config,
            form_style: _form_style_config
        };

        /**
        * transformConfig
        *
         * @param name
         * @param extension
         * @returns {}
         */
        this.transformConfig = function(name, extension) {

            if (!_.has(this.config, name)) {
                throw new Error(MESSAGE_UNRECOGNISED_CONFIG_NAME);
            }

            return _.merge(_.clone(this.config[name]), extension);
        };
    };

    Service.$inject = ['MESSAGE_UNRECOGNISED_CONFIG_NAME'];

    angular.module('AngularDynamicForm')
        .service('AngularDynamicForm.transformers.ConfigTransformer', Service);

})();

(function () {
    'use strict';

    //----------------------------------
    // Field Transformer Service
    //----------------------------------

    var Service = function(MESSAGE_INVALID_CONFIG,
                           MESSAGE_INVALID_FIELDS_OBJECT,
                           MESSAGE_INVALID_OPTIONS_ARRAY,
                           MESSAGE_INVALID_OPTIONS_OBJECT) {

        var _config_required_keys = ['label_camelcase', 'label_replace_underscores'];
        var _fields_required_keys = ['type'];
        var _options_required_keys = ['label', 'value'];

        var _fields_defaults = {
            text: {
                type: 'text', required: false
            },
            textarea: {
                type: 'textarea', required: false
            },
            currency: {
                type: 'currency', symbol: '$', required: false
            },
            password: {
                type: 'password', required: false
            },
            checkbox: {
                type: 'checkbox', required: false
            },
            select: {
                type: 'select', options: [], required: false
            },
            multi_select: {
                type: 'select', options: [], size: 4, required: false
            }
        };

        //----------------------------------
        // public
        //----------------------------------

        /**
        * transformFields
        *
         * @param fields
         * @param config
         * @param model
         * @returns []
         */
        this.transformFields = function(fields, config, model) {

            var result = [];

            // validate config
            if (_.difference(_config_required_keys, _.keys(config)).length !== 0) {
                throw new Error(MESSAGE_INVALID_CONFIG);
            }

            // process form field by type property
            _.forEach(fields, function (item, key) {

                // validate field object
                if (_.difference(_fields_required_keys, _.keys(item)).length !== 0) {
                    throw new Error(MESSAGE_INVALID_FIELDS_OBJECT);
                }

                // transform field
                var _item  = transformField(item, key, config, model[key]);

                // add to array
                result.push(_item);
            });

            return result;
        };

        /**
         * transformGroupFields
         *
         * @param fields_array
         * @param config
         * @returns {Array}
         */
        this.transformGroupFields = function(fields_array, config) {

            var result = [];

            // add group to each field
            _.forEach(fields_array, function(field) {

                var group_order = 1;

                _.forEach(config, function(group) {

                    _.forEach(group.fields, function(group_field, index) {
                        if (group_field === field.name) {

                            // clone field
                            var _field = _.clone(field);

                            // add field group properties
                            _field.group_label = group.label;
                            if (_.has(group, 'order')) {
                                group_order = group.order;
                            }
                            _field.group_order = group_order;
                            _field.order = index;

                            // add to array
                            result.push(_field);
                        }

                        // sort (by order)
                        result = _.sortBy(result, 'order');
                    }, this);
                    group_order++;
                }, this);
            }, this);

            // sort (by group_order)
            result = _.sortBy(result, 'group_order');

            return result;
        };

        //----------------------------------
        // private
        //----------------------------------

        /**
         * transformField
         *
         * @param item
         * @param key
         * @param config
         * @param model
         */
        var transformField = function(item, key, config) {//, model) {

            var result = {};

            // if a recognised field type
            if (_.has(_fields_defaults, item.type)) {

                // validate options array
                if (_.has(item, 'options')) {

                    // if not an array
                    if (!_.isArray(item.options)) {
                        throw new Error(MESSAGE_INVALID_OPTIONS_ARRAY);
                    }

                    _.forEach(item.options, function (option) {

                        // validate option object
                        if (_.difference(_options_required_keys, _.keys(option)).length !== 0) {
                            throw new Error(MESSAGE_INVALID_OPTIONS_OBJECT);
                        }
                    });
                }

                // extend default
                var defaults = _.cloneDeep(_fields_defaults[item.type]);

                // merge defaults with item
                result =_.merge(defaults, item);
            }

            // custom field
            else {
                result = _.clone(item);
            }

            // add extra field properties
            if (!_.has(result, 'label')) {
                result.label = transformLabel(key, config.label_camelcase, config.label_replace_underscores);
            }
            result.name = key;
            result.model = _.has(item, 'model') ? item.model : null;
            result.validate = false;

            return result;
        };

        /**
         * transformLabel
         *
         * @param label
         * @param camelcase
         * @param replace_underscores
         */
        var transformLabel = function(label, camelcase, replace_underscores) {

            // replace underscores
            if (replace_underscores) {
                label = label.replace(/\_/g, ' ');
            }

            // camelcase
            if (camelcase) {
                label = _.startCase(label);
            }

            return label;
        };
    };

    Service.$inject = [
        'MESSAGE_INVALID_CONFIG',
        'MESSAGE_INVALID_FIELDS_OBJECT',
        'MESSAGE_INVALID_OPTIONS_ARRAY',
        'MESSAGE_INVALID_OPTIONS_OBJECT'
    ];

    angular.module('AngularDynamicForm')
        .service('AngularDynamicForm.transformers.FieldTransformer', Service);

})();

(function() {
    'use strict';

    //----------------------------------
    // Dynamic Form Fieldset Controller
    //----------------------------------

    var DynamicFormFieldsetCtrl = function($scope) {

        /**
         * onBlur
         */
        this.onBlur = function() {
            if (!_.isUndefined($scope.onBlur)) {
                $scope.onBlur();
            }
        };

        /**
         * onChange
         */
        this.onChange = function() {
            if (!_.isUndefined($scope.onChange)) {
                $scope.onChange();
            }
        };
    };

    DynamicFormFieldsetCtrl.$inject = ['$scope'];

    angular.module('AngularDynamicForm').controller('DynamicFormFieldsetCtrl', DynamicFormFieldsetCtrl);
})();

(function() {
    'use strict';

    var dynamicFormFieldset = function($templateCache, AngularDynamicFormCustomInputViewUrl) {
        return {
            restrict: 'E',
            scope: {
                field:              '=',
                model:              '=',
                errors:             '=',
                show_validation:    '=showValidation',
                config:             '=',
                style_config:       '=styleConfig',
                onChange:           '&',
                onBlur:             '&'
            },
            controller: 'DynamicFormFieldsetCtrl as ctrl',
            replace: true,
            link: function(scope) {//}, element) {

                // add class
                //element.addClass('dynamic-form-fieldset');

                // set input view template
                scope.input_view_template = 'angular-dynamic-form/views/inputs/' + scope.field.type + '.html';

                if (_.isUndefined($templateCache.get(scope.input_view_template))) {
                    scope.input_view_template = AngularDynamicFormCustomInputViewUrl + scope.field.type + '.html';
                }
            },
            templateUrl: 'angular-dynamic-form/views/dynamic-form-fieldset.html'
        };
    };

    dynamicFormFieldset.$inject = ['$templateCache', 'AngularDynamicFormCustomInputViewUrl'];

    angular.module('AngularDynamicForm')
        .directive('dynamicFormFieldset', dynamicFormFieldset);

})();
