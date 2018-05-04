webWalletApp.controller('listOfCategoriesController', function ($scope, $http, $window) {
    $scope.message = 'List of categories';

    $scope.loadData = $http.get('http://localhost:8080/api/categories').then(function (response) {
        $scope.categories = response.data;
    });

    $scope.sortType = 'name';
    $scope.sortReverse = false;

    $scope.deleteCategory = function (id) {
        $http.delete('http://localhost:8080/api/categories/' + id);
        $window.location.reload();
    };

});