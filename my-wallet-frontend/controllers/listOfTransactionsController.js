webWalletApp.controller('listOfTransactionsController', function ($scope, $http) {
    $scope.message = 'List of transactions';
    $scope.loadData = $http.get('http://localhost:8080/api/transactions/').then(function (response) {
        $scope.allTransactions = response.data;
    });
});