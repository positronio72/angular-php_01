myApp.controller("UsuarioListController", ["$scope", "$http", function ($scope, $http) {

    $scope.findAll = function () {
    	$http({
    		method: "GET",
            url: "persistencia/usuario/usuario-findAll.php" //Ruta desde el index.html
        })
        .success(function (data, status) {
            // console.log(data + "\nstatus: " + status);
            $scope.users = data;
        })
        .error(function (data, status) {
            // console.log(status);
            alert("Error: no se ha podido realizar la operación");
        });
    };

    $scope.findAll();


    
    // PRIMER INTENTO DE MODAL:
    // $scope.showModal = function(){
    //     $scope.user = {};

    //     var modalInstance = $modal.open({
    //         templateUrl: "usuario-form.html",
    //         controller: "UsuarioFormController"
    //     });
    // };


    // SEGUNDO INTENTO DE MODAL:
    /**
    * abre la modal
    */
    // $scope.showModal = function (size) 
    // {
    //     var modalInstance = $modal.open({
    //         templateUrl: 'usuario-form.html',
    //         controller: 'UsuarioFormController',
    //         size: size, // size = sm, md, lg o xs (clases de Bootstrap)
    //         resolve: {
    //             Items: function() //scope de la vista modal
    //             {
    //                 return "Hola que asé";
    //             }
    //         }
    //     });
    // }
    

}]);


