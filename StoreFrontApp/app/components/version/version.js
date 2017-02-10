'use strict';

angular.module('StoreFrontApp.version', [
  'StoreFrontApp.version.interpolate-filter',
  'StoreFrontApp.version.version-directive'
])

.value('version', '0.1');
