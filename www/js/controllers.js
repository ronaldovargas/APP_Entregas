angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {


  })

  .controller('InicioController', function ($scope, EntregasServices) {
    $scope.lista = EntregasServices.list();
    console.log($scope.lista);

  })


  .controller('AssinaturaController', function ($scope, EntregasServices, AssinaturaService, $stateParams, $state) {

    var id = $stateParams.id;
    var canvas = document.getElementById('assinaturaCanvas');
    var assinaturaCanvas = new SignaturePad(canvas);

    $scope.limpar = function () {
      assinaturaCanvas.clear();
    }

    $scope.salvar = function () {
      var sigImg = assinaturaCanvas.toDataURL();
      $scope.assinatura = sigImg;
      var assinatura = [{ idEntrega: id, assinatura: sigImg }];
      AssinaturaService.create(assinatura);
    }
    $scope.voltar = function () {

      $state.transitionTo('app.capturas', {}, { reload: true, inherit: true, notify: true });//reload
    }

  })


  .controller('CameraController', function ($scope, EntregasServices, FotoServices, $stateParams, $cordovaCamera) {

    var id = $stateParams.id;

    $scope.tirarFoto = function () {
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.imgURI = "data:image/jpeg;base64," + imageData;

        var foto = [{ idEntrega: id, foto: $scope.imgURI }];
        FotoService.create(foto);

      }, function (err) {
      });
    }

    $scope.trocarFoto = function () {
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
      }, function (err) {
      });
    }

  })

  .controller('EntregasController', function ($scope, $stateParams, NaoEntregaService, EntregasServices, $state, $ionicPopup, $cordovaSms) {

    var id = $stateParams.id;
    $scope.mostraItens = 0;
    $scope.tituloBotao = 'Mostra Itens';
    $scope.lista = EntregasServices.get(id);

    $scope.mostraListaItens = function () {
      if ($scope.mostraItens == 1) {
        $scope.mostraItens = 0;
        $scope.tituloBotao = 'Mostra Itens';
      }
      else {
        $scope.mostraItens = 1;
        $scope.tituloBotao = 'Esconde Itens';
      }
    }

    $scope.showCapturas = function () {
      $state.go('app.capturas', { id: id });
    }

    $scope.InformarEntrega = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: '',
        template: 'Deseja informar a entrega?',
        cancelText: 'Não',
        okText: 'Sim'
      }).then(function (res) {
        if (res) {
          //enviar sms da entrega
          document.addEventListener("deviceready", function () {
            $cordovaSms
              .send('41997816440', 'Sua entrega para ' + $scope.lista.NomePessoa + 'foi realizada com sucesso!', options)
              .then(function () {
                var confirmPopup = $ionicPopup.confirm({
                  title: 'Envio de SMS',
                  template: 'Seu SMS foi enviada com sucesso!'
                });
              }, function (error) {
              });
          });

        }
      });

    }

    $scope.InformarNaoEntrega = function () {

      $scope.lstMotivosNaoEntrega = [
        { id: 1, nome: 'Destinatário ausente' },
        { id: 2, nome: 'Endereço Incorreto' },
        { id: 3, nome: 'Recusa do destinatario' },
        { id: 4, nome: 'Veiculo quebrado' },
        { id: 5, nome: 'Mau tempo' },
        { id: 6, nome: 'Avaria' },
        { id: 7, nome: 'Extravio' },
        { id: 8, nome: 'Outros' }];

      var select = '<select ng-model="MotivosNaoEntrega" ng-options=" motivo.nome for motivo in lstMotivosNaoEntrega" ng-change="ListaMotivos(MotivosNaoEntrega)">';

      var myPopup = $ionicPopup.show({
        template: select,
        title: 'Entrega não realizada!',
        subTitle: 'Informe o motivo.',
        scope: $scope,
        buttons: [
          { text: 'Cancelar' },
          {
            text: '<b>Salvar</b>',
            type: 'button-positive',
            onTap: function (e) {
              if ($scope.MotivoNaoEntrega) {
                console.log($scope.MotivoNaoEntrega);
                var MotivoNaoEntrega = [{ idEntrega: id, motivo: $scope.MotivoNaoEntrega }];
                NaoEntregaService.create(MotivoNaoEntrega);

                //enviar sms
                document.addEventListener("deviceready", function () {
                  $cordovaSms
                    .send('41997816440', 'Sua entrega para ' + $scope.lista.NomePessoa + 'foi não foi realizada pelo motivo ' + $scope.MotivoNaoEntrega, options)
                    .then(function () {
                      var confirmPopup = $ionicPopup.confirm({
                        title: 'Envio de SMS',
                        template: 'Seu SMS foi enviada com sucesso!'
                      });
                    }, function (error) {
                    });
                });

              } else {
                e.preventDefault();
              }
            }
          }
        ]
      });

      $scope.ListaMotivos = function (motivo) {
        $scope.MotivoNaoEntrega = motivo.nome;
        console.log(motivo);
      }
    }

    $scope.MostrarRota = function () {
      $state.go('app.mapa', { id: id });
    }


    $scope.voltar = function () {
      $state.go('app.inicio');
    }


  })

  .controller('QRcodeController', function ($scope, $stateParams, QRcodeServices, $state, $cordovaBarcodeScanner) {
    var id = $stateParams.id;
    $scope.scanBarcode = function () {
      $cordovaBarcodeScanner.scan().then(function (imageData) {
        //alert(imageData.text);
        //console.log("Barcode Format -> " + imageData.format);
        //console.log("Cancelled -> " + imageData.cancelled);

        var foto = [{ idEntrega: id, qrcode: imageData.text }];
        QRcodeServices.create(foto);


      }, function (error) {
        //console.log("error");
      });
    };

  })

  .controller('MapaController', function ($scope, $stateParams, $state, $cordovaGeolocation, EntregasServices) {
//  $state.reload($state.current.name);

    var id = $stateParams.id;
    $scope.lista = EntregasServices.get(id);

    console.log($scope.lista);

    var map;
    var enderecoPartida;
    var enderecoChegada;
    var directionsDisplay; // Instanciaremos ele mais tarde, que será o nosso google.maps.DirectionsRenderer
    var directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer(); // Instanciando...

    var options = { timeout: 10000, enableHighAccuracy: true };

    var latlng = new google.maps.LatLng(-25.410603, -49.3324067);

    var mapOptions = {
      center: latlng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    directionsDisplay.setMap(map);


    if (navigator.geolocation) { 
      navigator.geolocation.getCurrentPosition(function (position) {

        pontoPadrao = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); // Com a latitude e longitude que retornam do Geolocation, criamos um LatLng
        map.setCenter(pontoPadrao);

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ // Usando nosso velho amigo geocoder, passamos a latitude e longitude do geolocation, para pegarmos o endereço em formato de string
          "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        },
          function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              // $("#txtEnderecoPartida").val(results[0].formatted_address);
              enderecoPartida = results[0].formatted_address;

              console.log(results[0].formatted_address);
              enderecoChegada = $scope.lista.Endereco + ',' + $scope.lista.Bairro + ',' + $scope.lista.Cidade;

              var request = { // Novo objeto google.maps.DirectionsRequest, contendo:
                origin: enderecoPartida, // origem
                destination: enderecoChegada, // destino
                travelMode: google.maps.TravelMode.DRIVING // meio de transporte, nesse caso, de carro
              };

              directionsService.route(request, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) { // Se deu tudo certo
                  directionsDisplay.setDirections(result); // Renderizamos no mapa o resultado
                }
              });
            }
          });
      });
    } //--fim Geolocation

    // $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
      // handle event
      console.log("State Params: ", data.stateParams);

    });

    $scope.$on("$ionicView.enter", function (event, data) {
      // handle event
      console.log("State Params: ", data.stateParams);

    });

    $scope.$on("$ionicView.afterEnter", function (event, data) {
     
      // handle event
      console.log("State Params: ", data.stateParams);


    });



    $scope.voltar = function () {
      $state.go('app.inicio');
    }

  })


  .controller('CapturasController', function ($scope, $state, EntregasServices, FotoServices, QRcodeServices, $stateParams, AssinaturaService) {
    $state.reload();

    $scope.possuiAssinatura = 0;
    $scope.possuiQrCode = 0;
    $scope.possuiFoto = 0;
    var assinaturas = 0;

    var id = $stateParams.id;
    $scope.lista = EntregasServices.get(id);
    $scope.data = {};


    $scope.changeNames = function (nome) {
      $scope.nomereceptor = $scope.data.inputNomeReceptor;
      $scope.quemrecebeu = nome;
    }

    $scope.AdicionaAssinatura = function () {
      $state.go('app.assinatura', { id: id });
    }

    $scope.AdicionaFoto = function () {
      $state.go('app.camera', { id: id });
    }


    if (AssinaturaService.count(id) == 1) {
      $scope.possuiAssinatura = 1;
    }

    if (QRcodeServices.count(id) == 1) {
      $scope.possuiQrCode = 1;
    }

    if (FotoServices.count(id) == 1) {
      $scope.possuiFoto = 1;
    }



  });
