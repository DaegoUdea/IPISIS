angular.module('ipisis')
.controller('SolicitudInscripcionController', ['$scope','$ngConfirm', 'OfertaService', 'InscripcionService',
function ($scope, $ngConfirm, OfertaService, InscripcionService ) {

  InscripcionService.getAllBySemestre({semestreCodigo: '2017-2'})
  .success(function (resultado) {
    $scope.inscripciones = resultado;
  })
  .error(function (err) {
    console.log(err);
  });

  $scope.seleccionar = function (inscripcion) {
    $scope.inscripcionActual = inscripcion;
    $ngConfirm({
      title: '',
      contentUrl: 'templates/private/jefe/detalle-inscripcion.html',
      backgroundDismiss: true,
      columnClass: 'l',
      scope: $scope,
      buttons: {
        Salir: {
          btnClass: 'btn-default',
          action: function (scope, button) {
            $scope.error = false;
            return true;
          }
        },
        Rechazar: {
          btnClass: 'btn-danger',
          action: function (scope, button) {
            if (!$scope.observacion) {
              $scope.error = true;
              $scope.mensajeError = 'Debe ingresar la observación.';
              return false;
            }

            parametros = {
              accion: 2,
              inscripcionId: $scope.inscripcionActual.id,
              observacion: $scope.observacion
            };

            InscripcionService.gestionarInscripcion(parametros)
            .success(function (resultado) {
              $scope.error = false;
              $scope.observacion = '';
              InscripcionService.getAllBySemestre({semestreCodigo: '2017-2'})
              .success(function (resultado) {
                $scope.inscripciones = resultado;
              })
              .error(function (err) {
                console.log(err);
              });
            })
            .error(function (err) {
              $scope.error = false;
            });
          }
        },
        Aceptar: {
          btnClass: 'btn-success',
          action: function (scope, button) {
            if (!$scope.observacion) {
              $scope.error = true;
              $scope.mensajeError = 'Debe ingresar la observación.';
              return false;
            }

            parametros = {
              accion: 1,
              inscripcionId: $scope.inscripcionActual.id,
              observacion: $scope.observacion
            };

            InscripcionService.gestionarInscripcion(parametros)
            .success(function (resultado) {
              $scope.error = false;
              $scope.observacion = '';
              InscripcionService.getAllBySemestre({semestreCodigo: '2017-2'})
              .success(function (resultado) {
                $scope.inscripciones = resultado;
              })
              .error(function (err) {
                console.log(err);
              });
            })
            .error(function (err) {
              $scope.error = false;
            });
          }
        },
      }
    });
  }
}]);