myApp.config(['$routeProvider', function ($routeProvider) {
    
    //Las rutas son desde el index.html

    $routeProvider.when('/usuario/list', {
    // Este path "/usuario/list" es un alias que me lo invento yo y que aparecerá en la barra de direcciones del navegador
        templateUrl: "usuario/usuario-list.html",
        controller: "UsuarioListController"
    })
    .when('/usuario/insert', {
        templateUrl: "usuario/usuario-form.html",
        controller: "UsuarioInsertController"
    })
    .when("/usuario/update/:idUsuario", {
        templateUrl: "usuario/usuario-form.html",
        controller: "UsuarioUpdateController"
    })
    .otherwise({
        redirectTo : "/"
    });

}]);


