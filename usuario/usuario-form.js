myApp.controller("UsuarioInsertController", ["$scope", "$http", "$location", function ($scope, $http, $location) {

    $scope.user = {};
    $scope.buttonInsertVisibility = true;
    
    // $scope.user = {
    //     "rolUsuario":"usuario",
    //     "nombreUsuario":"Usuario1000",
    //     "apellido1Usuario":"A1u1000",
    //     "apellido2Usuario":"A2u1000",
    //     "dniUsuario":"00000000t",
    //     "telefonoUsuario":"960001000",
    //     "emailUsuario":"mail1000@usuario.com",
    //     "loginUsuario":"u1000",
    //     "passwordUsuario":"p1000"
    // };


    $scope.userInsert = function(){

        // console.log($scope.user);

        $http({
            method: "POST",
            url: "persistencia/usuario/usuario-insert.php",
            data: $scope.user
        }).success(function(response){
            $scope.user = response;
        }).error(function(response, status){
            alert("Error status: " + status + ". No se ha podido realizar la operación");
        });
    };

    $scope.cancel = function(){
        $location.path("/usuario/list");
    };




    // // Lo siguente va con el SEGUNDO INTENTO DE MODAL:
    // $scope.modalScope = Items;// Items = $scope enviado desde la vista modal
 
    // $scope.userInsert = function () 
    // {
    //     // console.log($scope.user);

    //     $http({
    //         method: "POST",
    //         url: "persistencia/usuario/usuario-insert.php",
    //         data: $scope.user
    //     }).success(function (data) {
    //         $scope.user = data;
    //     }).error(function(data, status) {
    //         alert("Error status: " + status + ". No se ha podido realizar la operación");
    //     });
    // };
 
    // $scope.cancel = function () 
    // {
    //     $modalInstance.dismiss('cancel');
    // };


}]);


myApp.controller("UsuarioUpdateController", ["$scope", "$http", "$location", "$routeParams", "$timeout", function ($scope, $http, $location, $routeParams, $timeout) {
    
    $scope.user = {};
    $scope.buttonUpdateVisibility = true;

    $scope.userSelectedId = $routeParams.idUsuario;
    // console.log($scope.userSelectedId);

    $scope.getSelectedUser = function(){
        $http({
            method: "GET",
            url: "persistencia/usuario/usuario-get.php?user=" + $scope.userSelectedId
            // Pasar parámetros vía URL --> nombrePhp.php?saludo=hola&texto=Esto es una variable texto
        }).success(function(response){
            $scope.user = response[0];
        }).error(function(response, status){
            alert("Error status: " + status + ". No se ha podido realizar la operación");
        });
    };
    $scope.getSelectedUser();


    $scope.userUpdate = function(){
        $http({
            method: "POST",
            url: "persistencia/usuario/usuario-update.php",
            data: $scope.user
        }).success(function(response){
            $scope.user = response[0];
            $location.path("/usuario/list");
            alert("El usuario '" + $scope.user.nombreUsuario + "' ha sido actualizado con éxito.");
        }).error(function(response, status){
            alert("Error status: " + status + ". No se ha podido realizar la operación");
        });
    };


    $scope.cancel = function(){
        $location.path("/usuario/list");
    };




    // // Lo siguente va con el SEGUNDO INTENTO DE MODAL:
    // $scope.modalScope = Items;// Items = $scope enviado desde la vista modal
 
    // $scope.userInsert = function () 
    // {
    //     // console.log($scope.user);

    //     $http({
    //         method: "POST",
    //         url: "persistencia/usuario/usuario-insert.php",
    //         data: $scope.user
    //     }).success(function (data) {
    //         $scope.user = data;
    //     }).error(function(data, status) {
    //         alert("Error status: " + status + ". No se ha podido realizar la operación");
    //     });
    // };
 
    // $scope.cancel = function () 
    // {
    //     $modalInstance.dismiss('cancel');
    // };


}]);


