(function(){
    angular
        .module("w8lessApp")
        .directive("appfooter", footerGeneric);

    function footerGeneric(){
        return {
            restrict: "EA",
            templateUrl: "src/app/common/directives/footer/footer.template.html"
        };
    }
})();