

angular.module('starter', ['ionic','starter.services', 'starter.controllers','ngCordova'])

.run(function($ionicPlatform) {
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('app.inicio', {
      url: '/inicio',
      views: {
        'menuContent': {
          templateUrl: 'templates/inicio.html',
          controller: 'InicioController'
        }
      }
    })
    
     .state('app.assinatura', {
      url: '/assinatura/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/assinatura.html',
          controller: 'AssinaturaController'
        }
      }
    })
  .state('app.entregas', {
    url: '/entregas/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/entregas.html',
        controller: 'EntregasController'
      }
    }
  })
   .state('app.camera', {
      url: '/camera/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/camera.html',
          controller: 'CameraController'
        }
      }
    })
    
    .state('app.qrcode', {
      url: '/qrcode/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/qrcode.html',
          controller: 'QRcodeController'
        }
      }
    })
     .state('app.mapa', {
      url: '/mapa/:id',
       reload:true,
      views: {
        'menuContent': {
          templateUrl: 'templates/mapa.html',
          controller: 'MapaController',
         
        }
      }
    })
  .state('app.capturas', {
    url: '/capturas/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/capturas.html',
        controller: 'CapturasController'
      },
      params: {reload: true},
      cache:false,
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/inicio');
});
