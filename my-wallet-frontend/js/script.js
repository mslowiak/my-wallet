var webWalletApp = angular.module('webWalletApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

webWalletApp.config(function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController',
            auth: true
        })

        .when('/home/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController',
            auth: true
        })

        .when('/history/', {
            templateUrl: 'pages/expenses/history.html',
            controller: 'historyController',
            auth: true
        })

        .when('/all-categories/', {
            templateUrl: 'pages/categories/list_of_categories.html',
            controller: 'listOfCategoriesController',
            auth: true
        })

        .when('/all-transactions/', {
            templateUrl: 'pages/expenses/list_of_transactions.html',
            controller: 'listOfTransactionsController',
            auth: true
        })

        .when('/expenses-by-category/', {
            templateUrl: 'pages/categories/expenses-summary.html',
            controller: 'expensesSummaryController',
            auth: true
        })

        .when('/import-data/', {
            templateUrl: 'pages/import_data.html',
            controller: 'importDataController',
            auth: true
        })

        .when('/login/', {
            templateUrl: 'pages/login.html',
            controller: 'loginController',
            auth: false
        })

        .otherwise({redirectTo:'/login/'});
});

webWalletApp.run(function ($rootScope, $location, $route, $window) {
    setCookie("isLogged", "false", 7);
    setCookie("loggedUserId", "null", 7);
    $rootScope.$on('$routeChangeStart', function (ev, next, curr) {
        var nextPath = $location.path();
        var nextRoute = $route.routes[nextPath];

        if(nextRoute && nextRoute.auth && getCookie("isLogged")==="false"){
            $location.path("/login/");
        }
    })
});

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

webWalletApp.controller("logoutController", function ($location, $scope) {
    document.getElementById("logout-button").addEventListener("click", function () {
        setCookie("isLogged", "false", 7);
        setCookie("loggedUserId", "null", 7);
        console.log(document.location.href);
        console.log($location.path());
        $location.path("/login/");
        $scope.$apply();
    });
});

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}