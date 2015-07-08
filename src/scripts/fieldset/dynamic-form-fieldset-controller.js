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

            // update model
            _.set($scope.model, $scope.field.name, $scope.value);

            // external handler
            if (!_.isUndefined($scope.onBlur)) {
                $scope.onBlur({field: $scope.field});
            }
        };

        /**
         * onChange
         */
        this.onChange = function() {

            // update model (map & multi-select)
            if ($scope.field.format === 'map' && $scope.field.type === 'multi_select') {
                _.forEach($scope.field.options, function(option) {
                    _.set($scope.model, option.value, _.indexOf($scope.value, option.value) >= 0);
                });
            }

            // update model
            _.set($scope.model, $scope.field.name, $scope.value);

            // external handler
            if (!_.isUndefined($scope.onChange)) {
                $scope.onChange({field: $scope.field});
            }
        };

        this.inputBoxClass = function() {
            if ($scope.field.label === '' || !$scope.config.show_labels) {
                return $scope.style_config.input_box_no_label_class;
            }

            return $scope.style_config.input_box_class;
        };

        //----------------------------------
        // init
        //----------------------------------

        if ($scope.field.format === 'map' && $scope.field.type === 'multi_select') {
            $scope.value = [];

            _.forEach($scope.field.options, function(option) {
                if ($scope.model[option.value]) {
                    $scope.value.push(option.value);
                }
            });

            _.set($scope.model, $scope.field.name, $scope.value);
        }
    };

    DynamicFormFieldsetCtrl.$inject = ['$scope'];

    angular.module('AngularDynamicForm').controller('DynamicFormFieldsetCtrl', DynamicFormFieldsetCtrl);
})();
