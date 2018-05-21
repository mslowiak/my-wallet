webWalletApp.controller('loginController', function ($rootScope, $location, $scope, $http) {
    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('login-button').addEventListener("click", function () {
        var login = document.getElementById('username-input').value;
        var password = CryptoJS.SHA256(document.getElementById('password-input').value).toString();
        var errorLabel = document.getElementById('error-login-label');
        var post = $http({
            method: "POST",
            url: "http://localhost:8080/api/login",
            data: {login: login, password: password}
        }).then(function (response) {
            console.log("then");
            $rootScope.isLogged = true;
            $rootScope.loggedUserId = response.data.userId;
            errorLabel.style.display = 'none';
            document.getElementById("sidebar").style.display = 'block';
            $location.path('/home/');
        }, function (error) {
            console.log("catch");
            errorLabel.innerHTML = error.data.result;
            errorLabel.style.display = 'block';
        });
    });
    document.getElementById('register-button').addEventListener("click", function () {
        document.getElementById('sign-up-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'block';
        document.getElementById('error-login-label').style.display = 'none';
    });
    document.getElementById('sign-up-button').addEventListener("click", function () {
        document.getElementById('sign-up-form').style.display = 'block';
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('error-login-label').style.display = 'none';
    });
    document.getElementById('register-now-button').addEventListener("click", function () {
        // post request
    });
});