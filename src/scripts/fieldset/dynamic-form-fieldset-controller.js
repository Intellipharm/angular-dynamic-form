(function() {
    'use strict';

    //----------------------------------
    // Dynamic Form Fieldset Controller
    //----------------------------------

    var DynamicFormFieldsetCtrl = function($scope) {

        var self = this;

        $scope.dynamic_style_config = {};

        /**
         * onBlur
         */
        this.onBlur = function() {

            // update model
            _.set($scope.model, $scope.field.name, this.field_value);

            // external handler
            if (!_.isUndefined($scope.onBlur)) {
                $scope.onBlur({field: $scope.field});
            }
        };

        /**
         * onKeypress
         */
        this.onKeypress = function($event) {
            if (!_.isUndefined($scope.onKeypress)) {
                $scope.onKeypress({$event: $event, field: $scope.field});
            }
        };

        /**
         * onChange
         */
        this.onChange = function() {

            // update model (map & multi-select)
            if ($scope.field.format === 'map' && $scope.field.type === 'multi_select') {
                _.forEach($scope.field.options, function(option) {
                    _.set($scope.model, option.value, _.indexOf(this.field_value, option.value) >= 0);
                });
            }

            // update model
            _.set($scope.model, $scope.field.name, this.field_value);

            // external handler
            if (!_.isUndefined($scope.onChange)) {
                $scope.onChange({field: $scope.field});
            }
        };

        //----------------------------------
        // init
        //----------------------------------

        if ($scope.field.format === 'map' && $scope.field.type === 'multi_select') {
            this.field_value = [];

            _.forEach($scope.field.options, function(option) {
                if ($scope.model[option.value]) {
                    this.field_value.push(option.value);
                }
            });

            _.set($scope.model, $scope.field.name, this.field_value);
        }

        //----------------------------------
        // watchers
        //----------------------------------

        $scope.$watch( 'value', function( val ) {
            if ( !_.isUndefined( val ) ) {
                self.field_value = val;
            }
        }, true );

        $scope.$watch( 'config.show_labels', function( val ) {
            if ( !_.isUndefined( val ) ) {

                if ( val ) {
                    $scope.dynamic_style_config.input_box_class                  = $scope.style_config.input_box_class;
                    $scope.dynamic_style_config.field_error_message_box_class    = $scope.style_config.field_error_message_box_class;
                    return;
                }

                $scope.dynamic_style_config.input_box_class                 = $scope.style_config.input_box_no_label_class;
                $scope.dynamic_style_config.field_error_message_box_class   = $scope.style_config.field_error_message_box_no_label_class;
            }
        } );
    };

    DynamicFormFieldsetCtrl.$inject = ['$scope'];

    angular.module('AngularDynamicForm').controller('DynamicFormFieldsetCtrl', DynamicFormFieldsetCtrl);
})();
