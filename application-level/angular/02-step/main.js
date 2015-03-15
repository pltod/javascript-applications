angular.module('MyModule', [])
.controller('MainCtrl', function ($scope) {
  $scope.name2 = "and MJ";
  
  $scope.items = [{"id": 1, "name": "item1"}, {"id": 2, "name": "item2"}]
})