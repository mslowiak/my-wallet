webWalletApp.controller('loginController', function ($rootScope, $scope, $http) {
    document.getElementById("sidebar").style.display = 'none';
    webWalletApp.value('loggedIn', true);
    document.getElementById('login-button').addEventListener("click", function () {
        // post request
    });
    document.getElementById('register-button').addEventListener("click", function () {
        console.log("XDD");
        document.getElementById('sign-up-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'block';
    });
    document.getElementById('sign-up-button').addEventListener("click", function () {
        document.getElementById('sign-up-form').style.display = 'block';
        document.getElementById('register-form').style.display = 'none';
    });
    document.getElementById('register-now-button').addEventListener("click", function () {
        // post request
    });
});