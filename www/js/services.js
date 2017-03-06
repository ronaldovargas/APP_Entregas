angular.module('starter.services', [])


    .service('LoginService', function ($q) {
        return {
            loginUser: function (login, senha) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                if (login == 'admin' && senha == 'senha') {
                    deferred.resolve('Bem Vindo ' + name + '!');
                } else {
                    deferred.reject('Login inválido!');
                }
                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                }
                promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
                }
                return promise;
            }
        }
    })


    .service('AssinaturaService', function () {
        var assinatura = [];
        var lista = angular.fromJson(window.localStorage['assinatura'] || '[]');
        return {
            list: function () {
                return lista;
            },

            get: function (idEntrega) {
                for (var i = 0; i < lista.length; i++) {
                    if (lista[i].idEntrega === idEntrega) {
                        return lista[i];
                    }
                }
                return undefined;
            },
            create: function (assinatura) {
                window.localStorage['assinatura'] = angular.toJson(assinatura);
            },
            count: function (idEntrega) {
                var count =0;
                for (var i = 0; i < lista.length; i++) {
                    if (lista[i].idEntrega === idEntrega) {
                        return 1;
                    }
                }
                return 0;
            },

        }
    })
    
    .service('NaoEntregaService', function () {
        var assinatura = [];
        var lista = angular.fromJson(window.localStorage['naoentrega'] || '[]');
        return {
            list: function () {
                return lista;
            },

            get: function (idEntrega) {
                for (var i = 0; i < lista.length; i++) {
                    if (lista[i].idEntrega === idEntrega) {
                        return lista[i];
                    }
                }
                return undefined;
            },
            create: function (naoentrega) {
                window.localStorage['naoentrega'] = angular.toJson(naoentrega);
            },
            count: function (idEntrega) {
                var count =0;
                for (var i = 0; i < lista.length; i++) {
                    if (lista[i].idEntrega === idEntrega) {
                        return 1;
                    }
                }
                return 0;
            },

        }
    })


    .service('FotoServices', function () {
        var assinatura = [];
        var lista = angular.fromJson(window.localStorage['foto'] || '[]');
        return {
            list: function () {
                return lista;
            },

            get: function (idEntrega) {
                for (var i = 0; i < lista.length; i++) {
                    if (lista[i].idEntrega === idEntrega) {
                        return lista[i];
                    }
                }
                return undefined;
            },
            create: function (foto) {
                window.localStorage['foto'] = angular.toJson(foto);
            },
            count: function (idEntrega) {
                var count =0;
                for (var i = 0; i < lista.length; i++) {
                    if (lista[i].idEntrega === idEntrega) {
                        return 1;
                    }
                }
                return 0;
            },

        }
    })


 .service('QRcodeServices', function () {
        var assinatura = [];
        var lista = angular.fromJson(window.localStorage['qrcode'] || '[]');
        return {
            list: function () {
                return lista;
            },

            get: function (idEntrega) {
                for (var i = 0; i < lista.length; i++) {
                    if (lista[i].idEntrega === idEntrega) {
                        return lista[i];
                    }
                }
                return undefined;
            },
            create: function (foto) {
                window.localStorage['qrcode'] = angular.toJson(foto);
            },
            count: function (idEntrega) {
                var count =0;
                for (var i = 0; i < lista.length; i++) {
                    if (lista[i].idEntrega === idEntrega) {
                        return 1;
                    }
                }
                return 0;
            },

        }
    })

    .service('EntregasServices', function ($q) {

        var lista = angular.fromJson(window.localStorage['lista'] || '[]');

        if (lista.length < 1) {
            lista = [
                { id: 1, tipo: 'Entrega', NomePessoa: 'Steve Jobs', Endereco: 'Rua XV de Novembro Nº 179', Bairro: 'Alto da VX', Cidade: 'Curitiba', Estado: 'PR', itens: [{ nomeproduto: 'Iphone 5', valor: 'R$2000,00' }, { nomeproduto: 'CD Windows XP', valor: 'R$100,00' }], pontoreferencia: 'Próximo ao banco Santander', responsavel: ' Spider Man' },
                { id: 2, tipo: 'Coleta', NomePessoa: 'Bill Gates', Endereco: 'Avenida do Batel Nº 12', Bairro: 'Batel', Cidade: 'Curitiba', Estado: 'PR', itens: [{ nomeproduto: 'Macbook Pro', valor: 'R$15000,00' }], pontoreferencia: 'Próximo a PIB', responsavel: ' Ayrton Senna' },
                { id: 3, tipo: 'Coleta', NomePessoa: 'Linus Torvalds', Endereco: 'Rua Marechal Deodoro Nº 1110', Bairro: 'Centro', Cidade: 'Curitiba', Estado: 'PR', itens: [{ nomeproduto: 'CD Ubuntu', valor: 'R$0,00' }], pontoreferencia: 'Próximo ao restaurante Sabbor do Céu', responsavel: ' Mauricio de Souza' },
                { id: 4, tipo: 'Entrega', NomePessoa: 'Paul Allen', Endereco: 'Rua Padre Anchieta Nº 179', Bairro: 'Bigorrilho', Cidade: 'Curitiba', Estado: 'PR', itens: [{ nomeproduto: 'Livro Nabucodonossor', valor: 'R$100,00' }], pontoreferencia: 'Próximo a academia Sport Center', responsavel: ' Pablo Escobar' }]

            window.localStorage['lista'] = angular.toJson(lista);

        }
        function persist() {

        }

        return {
            list: function () {
                return lista;
            },

            get: function (id) {
                for (var i = 0; i < lista.length; i++) {
                    if (lista[i].id == id) {
                        return lista[i];
                    }
                }
                return undefined;
            },

            create: function (lista) {
                lista.push(lista);
                persist();
            },

            update: function (lista) {
                for (var i = 0; i < lista.length; i++) {
                    if (lista[i].id == lista.id) {
                        lista[i] = lista;
                        persist();
                    }
                }
            },

            move: function (user, fromIndex, toIndex) {
                users.splice(fromIndex, 1);
                users.splice(toIndex, 0, user);
                persist();
            },

            remove: function (userId) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].id == userId) {
                        users.splice(i, 1);
                        persist();
                        return;
                    }
                }
            }



        };


    });


