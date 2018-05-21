var webWalletApp = angular.module('webWalletApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

webWalletApp.config(function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/', {
            templateUrl: 'pages/login.html',
            controller: 'loginController'
        })

        .when('/home/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })

        .when('/history/', {
            templateUrl: 'pages/expenses/history.html',
            controller: 'historyController'
        })

        .when('/all-categories/', {
            templateUrl: 'pages/categories/list_of_categories.html',
            controller: 'listOfCategoriesController'
        })

        .when('/all-transactions/', {
            templateUrl: 'pages/expenses/list_of_transactions.html',
            controller: 'listOfTransactionsController'
        })

        .when('/expenses-by-category/', {
            templateUrl: 'pages/categories/expenses-summary.html',
            controller: 'expensesSummaryController'
        })

        .when('/import-data', {
            templateUrl: 'pages/import_data.html',
            controller: 'importDataController'
        })

        .when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'loginController'
        })
});

webWalletApp.run(function ($rootScope) {
    $rootScope.isLogged = false;
    $rootScope.loggedUserId = null;
});

webWalletApp.directive('ngConfirmClick', [
    function () {
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click', function (event) {
                    if (window.confirm(msg)) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }]);