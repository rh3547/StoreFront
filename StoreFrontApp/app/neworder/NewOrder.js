'use strict';

angular.module('StoreFrontApp.NewOrder', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/order', {
    templateUrl: 'neworder/NewOrder.html',
    controller: 'NewOrderController'
  });
}])

.controller('NewOrderController', [
    '$scope',
    'ItemDBService',
    'AppConfigService',
function($scope, ItemDBService, AppConfigService) {
    var appConfig = AppConfigService.config;
    var TAX = appConfig.sales_tax; // The sales tax

    $scope.title = "New Order"; // Page title

    // Order vars
    var orderItemNum = 0; // A unique number for order items (used as a temp id)
    var lastTypeClicked = null;
    var order = {
        "order.time": moment(Date.now()).format('MMMM Do YYYY h:mm a'),
        "items": []
    };
    $scope.order = order;

    // Current order prices
    $scope.prices = {
        "subtotal": (0.00).formatMoney(2),
        "tax": (0.00).formatMoney(2),
        "total": (0.00).formatMoney(2)
    };

    // Get all item types for initial list population
    ItemDBService.getItemTypes().then(function(data) {
        $scope.storeItems = data;
    });

    /*
        getItemSizes
        ===================================================
        Called when a store item is clicked. Gets all of the
        sizes associated with this item type and populates
        them into a list for viewing. Only one "size list"
        can be shown at a time to avoid multiple sections
        of the "accordion" from being open simultaneously
        so this function also clears the list of sizes for
        all other item types when a new one is clicked.

        @param itemId: the id of the item type clicked
    */
    $scope.getItemSizes = function(itemId) {
        ItemDBService.getSizesByItemId(itemId).then(function(data) {
            angular.forEach($scope.storeItems, function(item, index) {
                if (lastTypeClicked !== null && item._id == lastTypeClicked) {
                    item.sizes = [];
                }
                else if (item._id == itemId) {
                    item.sizes = data;
                }
            });

            if (lastTypeClicked == itemId)
                lastTypeClicked = null;
            else
                lastTypeClicked = itemId;
        });
    };

    /*
        selectItem
        ===================================================
        Called whenever a specific size for a store item
        is clicked. Shows a modal to allow selection of
        further options for that item.

        @param sizeId: the id of the size clicked
        @param itemId: the id of the item type associated
        with the size clicked
    */
    $scope.selectItem = function(sizeId, itemId) {
        var modal = $('#ItemOptionsModal');
        var selectedItem = null;
        var selectedSize = null;

        // Get the item info
        angular.forEach($scope.storeItems, function(item, index) {
            if (item._id == itemId) {
                selectedItem = item;
            }
        });

        // Look through this item's sizes to get its info
        if (selectedItem !== null) {
            angular.forEach(selectedItem.sizes, function(size, index) {
                if (size._id == sizeId) {
                    selectedSize = size;
                }
            });
        }

        $scope.currentItemType = selectedItem;
        $scope.currentItemSize = selectedSize;

        // Set data relevant to the item clicked
        modal.find('.modal-title').text('Options For: ' + selectedSize.name + ' ' + selectedItem.name);

        $scope.variations = [];
        $scope.addons = [];

        // Get the option groups for the selected item type
        ItemDBService.getOptionGroupsByItemId(itemId).then(function(groupData) {

            // Get the options for and set up each option group
            angular.forEach(groupData, function(group, index) {

                var newGroup = {
                    'name': group.name,
                    'options': []
                };

                // Get all specific options for the option group
                ItemDBService.getOptionsByOptionGroupId(group._id).then(function(optionData) {
                    newGroup.options = optionData;

                    // Format all option prices as money
                    angular.forEach(newGroup.options, function(option, index2) {
                        var floatPrice = parseFloat(option.price);

                        if (floatPrice > 0.0) {
                            option.price = floatPrice.formatMoney(2);
                        }
                        else {
                            option.price = undefined;
                        }
                    });

                    if (group.type == "variation") {
                        $scope.variations.push(newGroup);
                    }
                    else if (group.type == "topping") { // TODO: Change to 'addon' (in db too)
                        $scope.addons.push(newGroup);
                    }
                });

                // If it's the last group, show the modal
                if (index == groupData.length - 1) {
                    modal.modal('show');
                }
            });
        });
    }

    /*
        addToOrderModal
        ===================================================
        Called when the item options modal is "closed"
        (the user is done selecting options). Collects the
        needed components (item options, ids) and calls the
        addToOrder function.
    */
    $scope.addToOrderModal = function() {
        var modal = $('#ItemOptionsModal');

        // This represents the selected options only, not all available ones
        var options = {
            variations: [],
            addons: []
        };

        // Iterate over all variations for this item type
        angular.forEach($scope.variations, function(variation, index) {

            // Check each input to see if it's checked, if so add it to
            // the options.variations array
            $('input[name="' + variation.name + '"]:checked').each(function(i) {
                options.variations.push({
                    'name': variation.name,
                    'choice': $(this).attr('itemName'),
                    'price': $(this).attr('itemPrice')
                });
            });
        });

        // Iterate over all addons for this item type
        angular.forEach($scope.addons, function(addon, index) {

            var newAddon = {
                'name': addon.name,
                'choices': [],
                'prices': []
            };

            // Check each input to see if it's checked, if so add it to
            // the options.addons array
            $('input[name="' + addon.name + '"]:checked').each(function(i) {
                newAddon.choices.push($(this).attr('itemName'));
                newAddon.prices.push($(this).attr('itemPrice'));
            });

            // If an option for the addon was selected, add it to the selected options
            if (newAddon.choices.length > 0) {
                options.addons.push(newAddon);
            }
        });

        modal.modal('hide');

        $scope.addToOrder($scope.currentItemSize._id, $scope.currentItemType._id, options);
    };

    /*
        addToOrder
        ===================================================
        This function takes all of the options and other
        item data given and builds an order item to be added to
        the order pane and calculate the new price.

        @param sizeId: the id of the size being added
        @param itemId: the id of the item type being
        added
        @param options: an array of objects that define
        options for the item being added
    */
    $scope.addToOrder = function(sizeId, itemId, options) {
        var orderItemName = "";
        var currentItem = null;
        var currentSize = null;
        options = options === undefined ? [] : options;

        // Get the item info
        angular.forEach($scope.storeItems, function(item, index) {
            if (item._id == itemId) {
                currentItem = item;
                orderItemName += item.name + " - ";
            }
        });

        // Look through this item's sizes to get its info
        if (currentItem !== null) {
            angular.forEach(currentItem.sizes, function(size, index) {
                if (size._id == sizeId) {
                    currentSize = size;
                    orderItemName += size.name_short + " - $";
                }
            });
        }

        // Build the order item to add to the order pane
        var orderItemDetails =
            currentSize.name_detail + "\n" +
            "$" + currentSize.price;

        var variationCost = 0;
        var addonCost = 0;

        // Add the variation and addon details, also tally up the extra cost
        if (options.variations.length > 0 || options.addons.length > 0) {
            orderItemDetails += "\n";

            // Variations
            angular.forEach(options.variations, function(variation, index) {
                orderItemDetails += "--------------------------------------------------";
                orderItemDetails += "\n" + variation.name + ":\n  " + variation.choice;
                // orderItemDetails += "\n----------------------------\n" + variation.choice;
                if (variation.price > 0)  orderItemDetails += " + $" + variation.price;
                variationCost += variation.price;
            });

            orderItemDetails += "\n";

            // Addons
            angular.forEach(options.addons, function(addon, index) {
                orderItemDetails += "--------------------------------------------------";
                orderItemDetails += "\n" + addon.name + ":";

                angular.forEach(addon.choices, function(choice, index2) {
                    orderItemDetails += "\n  * " + choice;
                    if (addon.prices[index2] > 0) {
                        orderItemDetails += " + $" + addon.prices[index2];
                        addonCost += parseFloat(addon.prices[index2]);
                    }
                });
            });

            var totalItemPrice = parseFloat(parseFloat(currentSize.price) + parseFloat(variationCost) + parseFloat(addonCost)).formatMoney(2);

            orderItemName += totalItemPrice;

            if (variationCost > 0 || addonCost > 0) {
                orderItemDetails += "\n--------------------------------------------------";
                orderItemDetails += "\nTotal: $" + totalItemPrice;
            }
        }

        var orderItem = {
            'id': orderItemNum++,
            'name': orderItemName,
            'details': orderItemDetails,
            'price': currentSize.price,
            'variationCost': parseFloat(variationCost).formatMoney(2),
            'addonCost': parseFloat(addonCost).formatMoney(2)
        }

        // Calculate new prices
        $scope.prices.subtotal = parseFloat(parseFloat($scope.prices.subtotal) + parseFloat(currentSize.price) + parseFloat(variationCost) + parseFloat(addonCost)).formatMoney(2);
        $scope.prices.tax = (parseFloat($scope.prices.subtotal) * TAX).formatMoney(2);
        $scope.prices.total = (parseFloat($scope.prices.subtotal) + parseFloat($scope.prices.tax)).formatMoney(2);

        $scope.order.items.push(orderItem);
    };

    /*
        removeOrderItem
        ===================================================
        Called when the trash icon is clicked for an item in
        the order pane. Removes the item clicked from the
        pane and the list of items. Re-calculates prices.
    */
    $scope.removeOrderItem = function(item) {
        var index = $scope.order.items.indexOf(item);
        if (index > -1) {
            $scope.order.items.splice(index, 1);
        }

        // Re-calculate the price by removing the item's costs
        $scope.prices.subtotal = $scope.prices.subtotal - item.price - item.variationCost - item.addonCost;
        $scope.prices.subtotal = parseFloat($scope.prices.subtotal).formatMoney(2);
        $scope.prices.tax = (parseFloat($scope.prices.subtotal) * TAX).formatMoney(2);
        $scope.prices.total = (parseFloat($scope.prices.subtotal) + parseFloat($scope.prices.tax)).formatMoney(2);
    };

    /*
        editOrderItem
        ===================================================
        Called when the details for an item in the order
        pane are clicked. Brings up the item modal to
        edit the details.
    */
    $scope.editOrderItem = function(item) {
        alert("Edit!");
    };

    /*
        clearOrder
        ===================================================
        Called when the 'Clear Order' button is clicked.
        Removes all items from the order pane, the items
        list, clears the current prices, and re-declares the
        order timestamp.
    */
    $scope.clearOrder = function() {
        angular.forEach($scope.storeItems, function(item, index) {
            item.sizes = [];
        });

        lastTypeClicked = null;
        $scope.order.items = [];
        $scope.prices.subtotal = (0.00).formatMoney(2);
        $scope.prices.tax = (0.00).formatMoney(2);
        $scope.prices.total = (0.00).formatMoney(2);
        order.time = moment(Date.now()).format('MMMM Do YYYY h:mm a');
    };

    /*
        completeOrder
        ===================================================
        Called when either the 'Complete Order' or 'Checkout'
        button is clicked. Begins processing the order to
        be completed and then calls clearOrder to start a
        new one.
    */
    $scope.completeOrder = function() {
        if ($scope.order.items.length > 0) {
            $scope.clearOrder();
            alert("Order Placed!");
        }
    };
}]);
