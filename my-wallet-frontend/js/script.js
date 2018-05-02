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

webWalletApp.controller('listOfCategoriesController', function($scope, $http) {
    $scope.message = 'List of categories';

    $scope.loadData = $http.get('http://localhost:8080/api/categories').success(function (response) {
        $scope.categories = response;
    });

    $scope.sortType = 'name';
    $scope.sortReverse = false;
});
webWalletApp.controller('listOfExpensesController',  function($scope, $http) {
    $scope.message = 'List of expenses';
    $scope.loadData = $http.get('http://localhost:8080/api/categories').success(function (response) {
        $scope.expenses = response;
    });
});
webWalletApp.controller('summaryController', function($scope, $http) {
    $scope.message = 'Summary';
    $scope.loadData = $http.get('http://localhost:8080/api/transactions/this-month').success(function (response) {
        $scope.expenses = response;
    });
    
    new Chart(document.getElementById("pie-chart"), {
        type: 'pie',
        data: {
            labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
            datasets: [{
                label: "Population (millions)",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                data: [2478,5267,734,784,433]
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Predicted world population (millions) in 2050'
            }
        }
    });
});
webWalletApp.controller('importDataController', function($scope) {
    $scope.message = 'Import Data';
});

