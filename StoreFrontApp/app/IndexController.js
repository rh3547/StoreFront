'use strict';

angular.module('StoreFrontApp.IndexController', [])
.controller('IndexController', [
    '$scope',
    'AppConfigService',
function($scope, AppConfigService) {
    var appConfig = AppConfigService.config;
    $scope.config = appConfig;

    // Apply the theme styles
    var themeStyles = "";
    themeStyles += "<style type='text/css'>";
    themeStyles += ".theme-color { background-color: " + appConfig.theme_color + "; }";
    themeStyles += ".theme-button { background-image: linear-gradient(to bottom, " + appConfig.theme_button_color1 + " 0, " + appConfig.theme_button_color2 + " 100%) !important; border-color: " + appConfig.theme_button_colorborder + " !important; }";
    themeStyles += ".theme-button:hover { background-color: " + appConfig.theme_button_color2 + " !important; background-position: 0 -15px; }";
    themeStyles += ".theme-button:focus { background-color: " + appConfig.theme_button_color2 + " !important; background-position: 0 -15px; }";
    themeStyles += "</style>";
    $(themeStyles).appendTo("head");
}]);
