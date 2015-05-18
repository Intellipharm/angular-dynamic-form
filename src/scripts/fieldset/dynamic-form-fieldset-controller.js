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

            _.set($scope.model, $scope.field.name, $scope.value);
        };
    };

    DynamicFormFieldsetCtrl.$inject = ['$scope'];

    angular.module('AngularDynamicForm').controller('DynamicFormFieldsetCtrl', DynamicFormFieldsetCtrl);
})();
