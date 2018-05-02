var webWalletApp = angular.module('webWalletApp', ['ngRoute']);

webWalletApp.config(function($routeProvider) {
    $routeProvider
        .when('/home/', {
            templateUrl : 'pages/home.html',
            controller  : 'homeController'
        })

        .when('/history/', {
            templateUrl : 'pages/expenses/history.html',
            controller  : 'historyController'
        })

        .when('/all-categories/', {
            templateUrl : 'pages/categories/list_of_categories.html',
            controller  : 'listOfCategoriesController'
        })

        .when('/all-expenses/', {
            templateUrl : 'pages/expenses/list_of_expenses.html',
            controller  : 'listOfExpensesController'
        })

        .when('/summary/', {
            templateUrl : 'pages/categories/summary.html',
            controller  : 'summaryController'
        })

        .when('/import-data/', {
            templateUrl : 'pages/import_data.html',
            controller  : 'importDataController'
        })

});

webWalletApp.controller('homeController', function($scope) {
    $scope.message = 'Home';
});

webWalletApp.controller('historyController', function($scope) {
    $scope.message = 'History';
});

webWalletApp.controller('listOfCategoriesController', function($scope, $http, $log) {
    $scope.loadData = $http.get('http://localhost:8080/api/categories').success(function (response) {
        $scope.categories = response;
    });
    $scope.sortType = 'name';
    $scope.sortReverse = false;

    $scope.TestClick = function(){
        $log.log($scope.sortType);
        $log.log($scope.sortReverse);
    };

    $scope.message = 'List of categories';
});
webWalletApp.controller('listOfExpensesController',  function($scope) {
    $scope.message = 'List of expenses';
});
webWalletApp.controller('summaryController', function($scope) {
    $scope.message = 'Summary';
});
webWalletApp.controller('importDataController', function($scope) {
    $scope.message = 'Import Data';
});

