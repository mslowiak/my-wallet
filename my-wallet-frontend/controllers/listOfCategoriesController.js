webWalletApp.controller('listOfCategoriesController', function ($scope, $http, $window) {
    $scope.message = 'List of categories';

    $scope.loadData = $http.get('http://localhost:8080/api/categories').then(function (response) {
        $scope.categories = response.data;
    });

    $scope.sortType = 'name';
    $scope.sortReverse = false;

    $scope.selectedAllCategories = false;
    $scope.categorySelection = [];

    $scope.deleteCategory = function (id) {
        $http.delete('http://localhost:8080/api/categories/' + id);
        $window.location.reload();
    };

    $scope.toggleSelection = function toggleSelection(id) {
        var idx = $scope.categorySelection.indexOf(id);
        if (idx > -1) {
            $scope.categorySelection.splice(idx, 1);
        }else {
            $scope.categorySelection.push(id);
        }
    };

    $scope.selectAll = function selectAll() {
        $scope.categorySelection = [];
        if(!$scope.selectedAllCategories){
            for (var i = 0; i< $scope.categories.length; ++i){
                $scope.categorySelection.push($scope.categories[i].categoryId)
            }
        }
        $scope.selectedAllCategories = !$scope.selectedAllCategories;
    };
});