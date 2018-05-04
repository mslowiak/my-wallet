webWalletApp.controller('listOfExpensesController', function ($scope, $http) {
    $scope.message = 'List of expenses';
    $scope.loadData = $http.get('http://localhost:8080/api/transactions/expenses/').then(function (response) {
        $scope.allExpenses = response.data;
    });
});