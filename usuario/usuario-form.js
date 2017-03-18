myApp.controller("UsuarioInsertController", ["$scope", "$http", "$location", function ($scope, $http, $location) {

    $scope.user = {};
    $scope.buttonInsertVisibility = true;
    $scope.buttonGenerateVisibility = true;

    $scope.loadingStyle = {
        "margin-top": "2em",
        "width": "60px"
    };


    $scope.generateNewUser = function(){
        $scope.hideForm = true;
        $scope.showLoading = true;
        $http({
            method: "GET",
            url: "persistencia/usuario/usuario-find-last-user.php"
        }).success(function(response){
            $scope.showLoading = false;
            $scope.hideForm = false;
            $scope.lastUser = response[0];
            var nextId = parseInt($scope.lastUser.telefonoUsuario.substr(7)) + 1;
            $scope.user = {
                "rolUsuario":"usuario",
                "nombreUsuario":"Usuario" + nextId,
                "apellido1Usuario":"A1u" + nextId,
                "apellido2Usuario":"A2u" + nextId,
                "dniUsuario":"00000000T",
                "telefonoUsuario":"9600000" + nextId,
                "emailUsuario":"mail" + nextId + "@usuario.com",
                "loginUsuario":"u" + nextId,
                "passwordUsuario":"p" + nextId
            };
        }).error(function(response, status){
            alert("Error status: " + status + ". No se ha podido realizar la operación");
        });
    };


    $scope.userInsert = function(){

        // console.log($scope.user);

        $http({
            method: "POST",
            url: "persistencia/usuario/usuario-insert.php",
            data: $scope.user
        }).success(function(response){
            $scope.user = response[0];
            alert("El usuario " + $scope.user.nombreUsuario + " ha sido creado correctamente");
            $location.path("/usuario/list");
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
    
    $scope.hideForm = true;
    $scope.user = {};
    $scope.buttonUpdateVisibility = true;

    $scope.userSelectedId = $routeParams.idUsuario;
    // console.log($scope.userSelectedId);

    $scope.loadingStyle = {
        "margin-top": "2em",
        "width": "60px"
    };


    $scope.getSelectedUser = function(){
        $scope.showLoading = true;
        $http({
            method: "GET",
            url: "persistencia/usuario/usuario-get.php?user=" + $scope.userSelectedId
            // Pasar parámetros vía URL --> nombrePhp.php?saludo=hola&texto=Esto es una variable texto
        }).success(function(response){
            $scope.showLoading = false;
            $scope.showForm = true;
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
            alert("El usuario '" + $scope.user.nombreUsuario + "' ha sido actualizado con éxito.");
            $location.path("/usuario/list");
        }).error(function(response, status){
            alert("Error status: " + status + ". No se ha podido realizar la operación");
        });
    };


    $scope.cancel = function(){
        $location.path("/usuario/list");
    };

}]);


myApp.controller("UsuarioDeleteController", ["$scope", "$http", "$routeParams", "$location", function ($scope, $http, $routeParams, $location) {
    
    $scope.user = {};
    $scope.userSelectedId = $routeParams.idUsuario;
    // console.log($scope.userSelectedId);

    $scope.loadingStyle = {
        "width": "1.7em"
    };
    
    $scope.showLoading = true;


    $scope.userDelete = function(){
        $http({
            method: "POST",
            url: "persistencia/usuario/usuario-delete.php?user=" + $scope.userSelectedId
            }).success(function(response){
                alert("El usuario " + $scope.user.nombreUsuario + " ha sido borrado con éxito.\n¡¡ ELIMINADO !! Jajajajajajajajajaja");
                $scope.user = {};
                $location.path("/usuario/list");
            }).error(function(response, status){
                alert("Error status: " + status + ". No se ha podido realizar la operación");
        });
    };

    $scope.getSelectedUser = function(){
        $http({
            method: "GET",
            url: "persistencia/usuario/usuario-get.php?user=" + $scope.userSelectedId
            // Pasar parámetros vía URL --> nombrePhp.php?saludo=hola&texto=Esto es una variable texto
        }).success(function(response){
            $scope.showLoading = false;
            $scope.user = response[0];
            $scope.confirmMessage = "¿Estás seguro de eliminar el usuario '" + $scope.user.nombreUsuario + "'?";
            // $scope.userDelete();
        }).error(function(response, status){
            alert("Error status: " + status + ". No se ha podido realizar la operación");
        });
    };
    $scope.getSelectedUser();

    $scope.cancel = function(){
        $location.path("/usuario/list");
    };


}]);


