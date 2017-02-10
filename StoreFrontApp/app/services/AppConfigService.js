'use strict';

angular.module('StoreFrontApp.AppConfigService', [])
.service('AppConfigService', function($http) {
    /*
        config
        =================================================
        A JSON object containing configuration details
        for the app.
    */

    /*
        Pizza Config
    */
    // this.config = {
    //     "site_title": "Pizza Palace",
    //     "logo_url": "images/logo.png",
    //     "theme_color": "rgb(210, 176, 82)",
    //     "theme_button_color1": "#b83333",
    //     "theme_button_color2": "#882626",
    //     "theme_button_colorborder": "#802424",
    //     "api_url": "http://localhost:3000/",
    //     "api_item_route": "items",
    //     "sales_tax": 0.0875
    // };

    /*
        IceCream Config
    */
    this.config = {
        "site_title": "Cone - Gourmet Ice Cream",
        "logo_url": "images/logo_icecream.png",
        "theme_color": "rgb(173, 93, 137)",
        "theme_button_color1": "#9fb769",
        "theme_button_color2": "#798e49",
        "theme_button_colorborder": "#80905c",
        "api_url": "http://localhost:3000/",
        "api_item_route": "items",
        "sales_tax": 0.0875
    };
});
