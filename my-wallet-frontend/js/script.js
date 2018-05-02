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

webWalletApp.controller('homeController', ['$scope', '$http', function($scope) {
    $scope.message = 'Home';
}]);

webWalletApp.controller('historyController', function($scope) {
    $scope.message = 'History';
});

webWalletApp.controller('listOfCategoriesController', function($scope) {
    $scope.message = 'List of categories';
});
webWalletApp.controller('listOfExpensesController', ['$scope', '$http', function($scope) {
    $scope.message = 'List of expenses';
}]);
webWalletApp.controller('summaryController', ['$scope', '$http', function($scope) {
    $scope.message = 'Summary';
}]);
webWalletApp.controller('importDataController', ['$scope', '$http', function($scope) {
    $scope.message = 'Import Data';
}]);