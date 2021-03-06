'use strict';

angular.module('sampleDTOApp').controller('LabelDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Label', 'Operation',
        function($scope, $stateParams, $modalInstance, entity, Label, Operation) {

        $scope.label = entity;
        $scope.operations = Operation.query();
        $scope.load = function(id) {
            Label.get({id : id}, function(result) {
                $scope.label = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('sampleDTOApp:labelUpdate', result);
            $modalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.label.id != null) {
                Label.update($scope.label, onSaveSuccess, onSaveError);
            } else {
                Label.save($scope.label, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
