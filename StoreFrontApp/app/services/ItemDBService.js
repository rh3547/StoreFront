'use strict';

angular.module('StoreFrontApp.ItemDBService', [])
.service('ItemDBService', function($http, AppConfigService) {
    var appConfig = AppConfigService.config;
    var dbURL = appConfig.api_url + appConfig.api_item_route;

    /*
        getItemTypes
        =================================================
        HTTP GET request.
        Queries the database for all ItemType records.

        @return array (of JSON objects)
    */
    this.getItemTypes = function() {
        return $http({
            method: 'GET',
            url: dbURL + '/types'
        })
        .then(function successCallback(res) {
            return res.data;
        }, function errorCallback(res) {
            console.log(res);
            return [];
        });
    };

    /*
        getSizesByTypeId
        =================================================
        HTTP GET request.
        Queries the database for all ItemSize records
        with the given ItemTypeId.

        @param itemId: the id of the ItemType record to get
        the sizes for

        @return array (of JSON objects)
    */
    this.getSizesByItemId = function(itemId) {
        return $http({
            method: 'GET',
            url: dbURL + '/sizes/' + itemId
        })
        .then(function successCallback(res) {
            return res.data;
        }, function errorCallback(res) {
            console.log(res);
            return [];
        });
    };

    /*
        getOptionGroupsByItemId
        =================================================
        HTTP GET request.
        Queries the database for all ItemOptionGroup
        records with the given ItemTypeId.

        @param itemId: the id of the ItemType record to get
        the option groups for

        @return array (of JSON objects)
    */
    this.getOptionGroupsByItemId = function(itemId) {
        return $http({
            method: 'GET',
            url: dbURL + '/optiongroups/' + itemId
        })
        .then(function successCallback(res) {
            return res.data;
        }, function errorCallback(res) {
            console.log(res);
            return [];
        });
    };

    /*
        getOptionsByOptionGroupId
        =================================================
        HTTP GET request.
        Queries the database for all ItemOption records
        with the given ItemOptionGroupId.

        @param groupId: the id of the ItemOptionGroup
        record to get the options for

        @return array (of JSON objects)
    */
    this.getOptionsByOptionGroupId = function(groupId) {
        return $http({
            method: 'GET',
            url: dbURL + '/options/' + groupId
        })
        .then(function successCallback(res) {
            return res.data;
        }, function errorCallback(res) {
            console.log(res);
            return [];
        });
    };
});
