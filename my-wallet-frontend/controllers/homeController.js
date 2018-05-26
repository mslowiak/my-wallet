webWalletApp.controller('homeController', function ($scope, $rootScope, $http, $window) {
    $scope.message = 'Home';
    console.log(document.cookie);
    $http.get('http://localhost:8080/api/users/' + getCookie("loggedUserId")).then(function (response) {
        $scope.userInfo = response.data;
    });
    document.getElementById('change-balance-button').addEventListener("click", function () {
        document.getElementById('balance-change').style.display = 'block';
    });

    document.getElementById('discard-changes-button').addEventListener("click", function () {
        document.getElementById('balance-change').style.display = 'none';
    });

    $scope.changeBalance = function () {
        var newBalance = document.getElementById('balance-input').value;
        $http.post('http://localhost:8080/api/users/' + getCookie("loggedUserId") + "?newBalance=" + newBalance);
        document.getElementById('balance-change').style.display = 'none';
        $window.location.reload();
    };
});