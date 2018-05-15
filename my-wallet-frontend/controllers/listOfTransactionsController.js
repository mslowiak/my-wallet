webWalletApp.controller('listOfTransactionsController', function ($scope, $http) {
    $scope.message = 'List of transactions';
    $scope.loadData = $http.get('http://localhost:8080/api/transactions/').then(function (response) {
        $scope.allTransactions = response.data;
    });
    $scope.selectedAll = false;
    $scope.selection = [];

    $scope.toggleSelection = function toggleSelection(id) {
        var idx = $scope.selection.indexOf(id);
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }else {
            $scope.selection.push(id);
        }
    };

    $scope.selectAll = function selectAll() {
        $scope.selection = [];
        if(!$scope.selectedAll){
            for (var i = 0; i< $scope.allTransactions.length; ++i){
                $scope.selection.push($scope.allTransactions[i].transactionId)
            }
        }
        $scope.selectedAll = !$scope.selectedAll;
    };

    $scope.deleteCheckedTransactions = function deleteCheckedTransactions() {
        console.log($scope.selection.length);
        var toDelete = "ids=";
        for (var i = 0; i< $scope.selection.length; ++i){
            toDelete = toDelete + $scope.selection[i] + ",";
        }
        toDelete = toDelete.slice(0,-1);
        console.log(toDelete);
        $http.delete('http://localhost:8080/api/transactions/' + toDelete).then(function (response) {
            console.log(response);
            window.location.reload();
        });
    }
});