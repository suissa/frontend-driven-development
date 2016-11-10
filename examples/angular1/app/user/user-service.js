(function() {

angular.module('app.user-service', [])
  .factory('user', ['$q', userService]);

function userService($q) {
  return {
    fields: [
      {
        key: 'id',
        type: 'number',
        title: 'ID',
        required: true
      },
      {
        key: 'nome',
        type: 'text',
        title: 'Nome',
        required: true
      },
      {
        key: 'apelido',
        type: 'text',
        title: 'Apelido',
        required: true
      },
      {
        key: 'cpf',
        type: 'text',
        title: 'Nome',
        required: true
      }
    ],
    query: function (params) {
      var deferer = $q.defer();
      var data = [];
      var page = parseInt(params.page) || 0;
      var limit = parseInt(params.limit) || 10;
      var offset = page * limit;

      for (var i = offset; i < offset + limit; i++) {
        data.push({
          id: (Math.round(Math.random() * 10000)).toString(32),
          'nome': 'Colaborador',
          'apelido': 'Apelido'
        });
      }

      deferer.resolve(data);

      return deferer.promise;
    },
    get: function (id) {
      var deferer = $q.defer();

      if (!id) {
        deferer.reject('no id');
      }

      deferer.resolve({
        id: id,
        'nome': 'Colaborador',
        'apelido': 'Apelido'
      });

      return deferer.promise;
    },
    save: function (data) {
      var deferer = $q.defer();
      var id = data.id || (Date.now()).toString(34);

      deferer.resolve({
        id: id,
        'nome': 'Colaborador ' + id,
        'apelido': 'Apelido ' + id
      });

      return deferer.promise;
    },
    remove: function (item) {
      var deferer = $q.defer();

      deferer.resolve({ ok: true, message: 'removido com sucesso' });

      return deferer.promise;
    }
  };
}

})();
