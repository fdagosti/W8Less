(function(){

    angular.module("w8lessApp", ["ngRoute"]);

    function config ($routeProvider, $locationProvider,$httpProvider) {
        $httpProvider.useLegacyPromiseExtensions(false);

        
        $routeProvider
            .when("/", {
                templateUrl: "src/app/landing/landing.template.html",
                 controller: "landingCtrl",
                 controllerAs: "vm"
            })
            .otherwise({redirectTo: "/"});

        $locationProvider.html5Mode(true);
    }

    angular
        .module("w8lessApp")
        .config(["$routeProvider", "$locationProvider","$httpProvider", config]);

})();