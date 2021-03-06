(function() {
    'use strict';

    var dynamicForm = function() {

        return {
            restrict: 'E',
            scope: {
                api:                '=?',
                model:              '=?',
                errors:             '=?',
                fields:             '=?',
                auto_init:          '=?autoInit',
                form_config:        '=?config',
                form_field_config:  '=?fieldConfig',
                form_style_config:  '=?styleConfig',
                groups_config:      '=?groupsConfig',
                submit_steps:       '=?submitSteps',
                onSubmitComplete:   '&?',
                onCancel:           '&?',
                onClear:            '&?',
                onAfterSave:        '&?',
                onAfterValidate :   '&?',
                onError:            '&?',
                onKeypress:         '&?',
                onChange:           '&?',
                onBlur:             '&?',
                onInit:             '&?'
            },
            controller: 'DynamicFormCtrl as DynamicForm',
            templateUrl: 'angular-dynamic-form/views/dynamic-form.html',
            link: function(scope, element) {

                element.addClass('dynamic-form');

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
