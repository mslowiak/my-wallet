webWalletApp.controller('historyController', function ($scope, $http) {
    $scope.message = 'History';
    var months = [];
    var expensesList = [];
    var incomesList = [];

    $scope.loadData = $http.get('http://localhost:8080/api/transactions/balance-history/' + getCookie("loggedUserId")).then(function (response) {
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