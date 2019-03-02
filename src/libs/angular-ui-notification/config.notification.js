angular.module('app').config(function(NotificationProvider) {
    NotificationProvider.setOptions({
        delay: 10000,
        positionX: 'right',
        positionY: 'bottom',
        maxCount:10
    });
});