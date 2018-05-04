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
