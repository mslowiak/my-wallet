var webWalletApp = angular.module('webWalletApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

webWalletApp.config(function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
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

        .when('/all-expenses/', {
            templateUrl: 'pages/expenses/list_of_expenses.html',
            controller: 'listOfExpensesController'
        })

        .when('/summary/', {
            templateUrl: 'pages/categories/summary.html',
            controller: 'summaryController'
        })

        .when('/import-data', {
            templateUrl: 'pages/import_data.html',
            controller: 'importDataController'
        })

});

webWalletApp.controller('homeController', function ($scope) {
    $scope.message = 'Home';
});

webWalletApp.controller('historyController', function ($scope, $http) {
    $scope.message = 'History';
    var months = [];
    var expensesList = [];
    var incomesList = [];

    $scope.loadData = $http.get('http://localhost:8080/api//transactions/balance-history').then(function (response) {
        $scope.balanceHistory = response.data;
        var length = $scope.balanceHistory.length;
        if (length > 6) {
            length = 6;
        }
        for (var i = length - 1; i >= 0; --i) {
            var actualBalanceHistory = $scope.balanceHistory[i];
            months.push(getMonthName(actualBalanceHistory.month) + " " + actualBalanceHistory.year);
            expensesList.push(actualBalanceHistory.monthlyExpenses);
            incomesList.push(actualBalanceHistory.monthlyIncomes);
        }

        var expensesData = {
            label: 'Expenses',
            data: expensesList,
            backgroundColor: 'rgba(244, 25, 42, 0.8)',
            borderWidth: 0
        };

        var incomesData = {
            label: 'Incomes',
            data: incomesList,
            backgroundColor: 'rgba(54, 161, 0, 0.8)',
            borderWidth: 0
        };

        var monthsData = {
            labels: months,
            datasets: [expensesData, incomesData]
        };

        var chartOptions = {
            scales: {
                xAxes: [{
                    barPercentage: 1,
                    categoryPercentage: 0.6
                }],
                yAxes: [{
                    barPercentage: 1,
                    categoryPercentage: 0.6
                }]
            }
        };

        new Chart(document.getElementById("balance-history-chart"), {
            type: 'bar',
            data: monthsData,
            options: chartOptions
        });
    });
});

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
webWalletApp.controller('listOfExpensesController', function ($scope, $http) {
    $scope.message = 'List of expenses';
    $scope.loadData = $http.get('http://localhost:8080/api/transactions/expenses/').then(function (response) {
        $scope.allExpenses = response.data;
    });
});
webWalletApp.controller('summaryController', function ($scope, $http) {
    $scope.message = 'Summary';
    var categoryLabels = [];
    var totalMoney = [];
    $scope.loadData = $http.get('http://localhost:8080/api/transactions/expenses/last-month').then(function (response) {
        $scope.expenses = response.data;
        var length = $scope.expenses.length;
        for (var i = 0; i < length; ++i) {
            categoryLabels.push($scope.expenses[i].categoryName);
            totalMoney.push(parseFloat($scope.expenses[i].totalMoney));
        }
        new Chart(document.getElementById("pie-chart"), {
            type: 'pie',
            data: {
                labels: categoryLabels,
                datasets: [{
                    label: "Monthly expenses in categories",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: totalMoney
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Monthly expenses in categories',
                    fontSize: 22
                }
            }
        });
    });
});
webWalletApp.controller('importDataController', function ($scope) {
    $scope.message = 'Import Data';
});

function getMonthName(monthNumber) {
    var month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return month[monthNumber - 1]
}

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