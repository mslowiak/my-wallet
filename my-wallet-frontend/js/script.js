var webWalletApp = angular.module('webWalletApp', ['ngRoute']);

// webWalletApp.config(function($routeProvider) {
//     $routeProvider
//
//         .when('/', {
//             templateUrl : 'pages/home.html',
//             controller  : 'mainController'
//         })
//
//         .when('/history', {
//             templateUrl : 'pages/history.html',
//             controller  : 'historyController'
//         })
//
//         .when('/categories', {
//             templateUrl : 'pages/list_of_categories.html',
//             controller  : 'contactController'
//         })
//
//         .when('/list-of-expenses', {
//             templateUrl : 'pages/list_of_expenses.html',
//             controller  : 'contactController'
//         })
//
//         .when('/search-in-expenses', {
//             templateUrl : 'pages/summary.html',
//             controller  : 'contactController'
//         })
//
//         .when('/import-data', {
//             templateUrl : 'pages/import_data.html',
//             controller  : 'importDataController'
//         });
// });
webWalletApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/home.html'
        })

        .when('/home', {
            templateUrl : 'pages/home.html'
        })

        .when('/history', {
            templateUrl : 'pages/expenses/history.html'
        })

        .when('/all-categories', {
            templateUrl : 'pages/categories/list_of_categories.html'
        })

        .when('/all-expenses', {
            templateUrl : 'pages/expenses/list_of_expenses.html'
        })

        .when('/summary', {
            templateUrl : 'pages/categories/summary.html'
        })

        .when('/import-data', {
            templateUrl : 'pages/import_data.html'
        });
});
