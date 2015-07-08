angular.module('AngularDynamicForm').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('angular-dynamic-form/views/dynamic-form-fieldset.html',
    "<div class=\"dynamic-form-fieldset {{fieldset_class}}\">\n" +
    "\n" +
    "    <label ng-if=\"field.label !== '' && config.show_labels\" for=\"{{field.name}}\" class=\"{{style_config.label_class}}\">{{field.label}}</label>\n" +
    "\n" +
    "    <!-- edit state -->\n" +
    "\n" +
    "    <div ng-class=\"ctrl.inputBoxClass()\">\n" +
    "\n" +
    "        <div ng-include src=\"input_view_template\"></div>\n" +
    "\n" +
    "        <!-- validation feedback -->\n" +
    "        <span ng-show=\"config.has_validation_feedback\" class=\"{{validation_feedback_class}}\"></span>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- indicators -->\n" +
    "    <div ng-show=\"field.required && config.has_required_indicator\" class=\"{{style_config.required_indicator_class}}\">\n" +
    "        <span>*</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"errors.length > 0\" class=\"{{style_config.field_message_error_class}}\">{{errors[0]}}</div>\n" +
    "</div>\n"
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
    "                               on-change=\"ctrl.onFieldChange(field)\"\n" +
    "                               on-blur=\"ctrl.onFieldBlur(field)\"></dynamic-form-fieldset>\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n"
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
    "                       on-change=\"ctrl.onFieldChange(field)\"\n" +
    "                       on-blur=\"ctrl.onFieldBlur(field)\"></dynamic-form-fieldset>\n"
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
    "<form role=\"form\" class=\"{{form_style_config.form_class}}\">\n" +
    "\n" +
    "    <!-- groups or no-groups template -->\n" +
    "    <div ng-include src=\"form_view_template\"></div>\n" +
    "\n" +
    "    <!-- buttons -->\n" +
    "    <div class=\"{{form_style_config.button_box_class}}\" ng-show=\"show_buttons\">\n" +
    "        <button ng-show=\"form_config.show_submit_button\" type=\"submit\"\n" +
    "                class=\"{{form_style_config.submit_button_class}}\"\n" +
    "                ng-click=\"ctrl.onSubmit()\"\n" +
    "                ng-disabled=\"is_submitting\">\n" +
    "                {{form_config.submit_button_label}}\n" +
    "                <i class=\"{{form_style_config.is_submitting_icon}}\" ng-show=\"is_submitting && form_style_config.is_submitting_icon\"></i>\n" +
    "        </button>\n" +
    "\n" +
    "        <button ng-show=\"form_config.show_cancel_button\" type=\"button\"\n" +
    "                class=\"{{form_style_config.cancel_button_class}}\"\n" +
    "                ng-click=\"ctrl.onCancel()\"\n" +
    "                ng-disabled=\"is_submitting\">{{form_config.cancel_button_label}}</button>\n" +
    "\n" +
    "        <button ng-show=\"form_config.show_clear_button\" type=\"button\"\n" +
    "                class=\"{{form_style_config.clear_button_class}}\"\n" +
    "                ng-click=\"ctrl.onClear()\"\n" +
    "                ng-disabled=\"is_submitting\">{{form_config.clear_button_label}}</button>\n" +
    "    </div>\n" +
    "</form><!-- /form -->\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/checkbox.html',
    "<!-- checkbox -->\n" +
    "<input type=\"checkbox\"\n" +
    "       ng-model=\"$parent.value\"\n" +
    "       ng-change=\"ctrl.onChange()\" ng-disabled=\"model.form_field_config[field.name].disabled\">\n" +
    "\n" +
    "<label ng-if=\"field.right_label !== '' && config.show_right_labels\" for=\"{{field.name}}\"\n" +
    "       class=\"{{style_config.right_label_class}}\">{{field.right_label}}</label>\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/currency.html',
    "<!-- currency -->\n" +
    "<div class=\"input-group\">\n" +
    "    <div class=\"input-group-addon\">{{field.symbol}}</div>\n" +
    "    <input type=\"text\" id=\"{{field.name}}\" class=\"form-control\" placeholder=\"{{field.label}}\"\n" +
    "           ng-model=\"$parent.value\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "</div>\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/multi_select.html',
    "<!-- multi_select -->\n" +
    "{{$parent.value}}\n" +
    "<select class=\"form-control\"\n" +
    "        ng-model=\"$parent.value\" multiple size=\"{{field.type.size}}\" ng-options=\"option.value as option.label for option in field.options\"\n" +
    "        ng-change=\"ctrl.onChange()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "</select>\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/number.html',
    "<!-- text -->\n" +
    "<input type=\"number\" id=\"{{field.name}}\" class=\"{{style_config.input_class}}\" placeholder=\"{{field.label}}\"\n" +
    "       ng-model=\"$parent.value\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/password.html',
    "<!-- password -->\n" +
    "<input type=\"password\" id=\"{{field.name}}\" class=\"form-control\" placeholder=\"{{field.label}}\"\n" +
    "           ng-model=\"$parent.value\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/select.html',
    "<!-- select -->\n" +
    "<select class=\"form-control\"\n" +
    "        ng-model=\"$parent.value\" ng-options=\"option.value as option.label for option in field.options\"\n" +
    "        ng-change=\"ctrl.onChange()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "    <option value=\"\" disabled>Please select</option>\n" +
    "</select>\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/text.html',
    "<!-- text -->\n" +
    "<input type=\"text\" id=\"{{field.name}}\" class=\"{{style_config.input_class}}\" placeholder=\"{{field.label}}\"\n" +
    "       ng-model=\"$parent.value\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/textarea.html',
    "<!-- textarea -->\n" +
    "<textarea id=\"{{field.name}}\" class=\"form-control\" placeholder=\"{{field.label}}\"\n" +
    "          ng-model=\"$parent.value\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\"></textarea>\n"
  );

}]);
