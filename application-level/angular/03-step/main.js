angular.module('MyModule', [])
.controller('MainCtrl', function ($scope) {
  $scope.name2 = "and MJ";
  
  $scope.categories = ["One", "Two", "Tree"];  
  $scope.items = [{"id": 1, "name": "item1", "category": "One"}, {"id": 2, "name": "item2", "category": "Two"}];
  
  $scope.st = "mystyle";
  
  $scope.currentCategory = null;
  $scope.setCurrentCategory = setCurrentCategory;
  
  function setCurrentCategory(currentCategory) {
    console.log(currentCategory);
    $scope.currentCategory = currentCategory;
  }
})