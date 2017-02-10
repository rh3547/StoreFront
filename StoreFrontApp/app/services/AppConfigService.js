'use strict';

angular.module('StoreFrontApp.AppConfigService', [])
.service('AppConfigService', function($http) {
    /*
        config
        =================================================
        A JSON object containing configuration details
        for the app.
    */
    this.config = {
        "api_url": "http://localhost:3000/",
        "api_item_route": "items",
        "sales_tax": 0.0875
    };
});
