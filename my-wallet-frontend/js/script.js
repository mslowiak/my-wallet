var webWalletApp = angular.module('webWalletApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

webWalletApp.config(function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController',
            auth: true
        })

        .when('/home/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController',
            auth: true
        })

        .when('/history/', {
            templateUrl: 'pages/expenses/history.html',
            controller: 'historyController',
            auth: true
        })

        .when('/all-categories/', {
            templateUrl: 'pages/categories/list_of_categories.html',
            controller: 'listOfCategoriesController',
            auth: true
        })

        .when('/all-transactions/', {
            templateUrl: 'pages/expenses/list_of_transactions.html',
            controller: 'listOfTransactionsController',
            auth: true
        })

        .when('/expenses-by-category/', {
            templateUrl: 'pages/categories/expenses-summary.html',
            controller: 'expensesSummaryController',
            auth: true
        })

        .when('/import-data/', {
            templateUrl: 'pages/import_data.html',
            controller: 'importDataController',
            auth: true
        })

        .when('/login/', {
            templateUrl: 'pages/login.html',
            controller: 'loginController',
            auth: false
        })

        .otherwise({redirectTo:'/login/'});
});

webWalletApp.run(function ($rootScope, $location, $route) {
    $rootScope.isLogged = false;
    $rootScope.loggedUserId = null;
    $rootScope.$on('$routeChangeStart', function (ev, next, curr) {
        var nextPath = $location.path();
        var nextRoute = $route.routes[nextPath];

        if(nextRoute && nextRoute.auth && !$rootScope.isLogged){
            $location.path("/login/");
        }
    })
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