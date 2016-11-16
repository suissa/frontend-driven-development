(function () {
  angular.module('app.user-ctrl', [])
    .controller('UserController', UserController);

  UserController.$inject = ['$scope', 'user'];

  function UserController($scope, user) {
    $scope.columns = user.fields;

    $scope.visibleColumns = ['id', 'nome', 'apelido'];
    $scope.visibleFields = ['nome', 'apelido'];

    $scope.columnFilter = (item) => {
      return $scope.visibleColumns.indexOf(item.key) !== -1;
    };

    $scope.formFilter = (item) => {
      return $scope.visibleFields.indexOf(item.key) !== -1;
    }

    $scope.stateParams = {};

    this.refresh = () => {
      return user.get($scope.stateParams.id)
        .then(function (data) {
          $scope.displayName = data.nome;
          return $scope.item = data;
        })
        .catch(function (err) {
          // error message
          return [];
        });
    };

    this.refreshList = () => {
      return user.query($scope.stateParams)
        .then((data) => {
          $scope.list = data;
          return data;
        })
        .catch(function (err) {
          // error message
          return [];
        });
    };

    this.save = () => {
      return user.save($scope.item)
        .then((data) => {
          return $scope.item = data;
        })
        .catch((err) => {
          // error message
          return [];
        });
    }

    this.remove = (item) => {
      const result = window.confirm('Deseja realmente remover a empresa?');

      if (result) {
        user.remove(item)
          .then((data) => {
            // success message
            $scope.list = $scope.list.filter((newItem) => newItem.id !== item.id);
          })
          .catch((err) => {
            // error message
            return [];
          });
      }
    };

  };
})();
