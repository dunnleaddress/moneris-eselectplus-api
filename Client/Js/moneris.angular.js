//Define an angular module for our app
var app = angular.module('myApp', []);

app.controller('monerisController', function ($scope, $http) {

    getTask(); // Load all available tasks

    function getTask() {
        $http.post("server/service/getTask.php").success(function (data) {
            $scope.tasks = data;
        });
    };

    $scope.addTask = function (task) {
        $http.post("../server/service/addTask.php?task=" + task).success(function (data) {
            getTask();
            $scope.taskInput = "";
        });
    };

    $scope.deleteTask = function (task) {
        if (confirm("Are you sure to delete this line?")) {
            $http.post("../server/service/deleteTask.php?taskID=" + task).success(function (data) {
                getTask();
            });
        }
    };

    $scope.toggleStatus = function (item, status, task) {
        if (status == '2') {
            status = '0';
        } else {
            status = '2';
        }
        $http.post("../server/service/updateTask.php?taskID=" + item + "&status=" + status).success(function (data) {
            getTask();
        });
    };

    /****************************/

    $scope.doMonerisSubmit = function ($scope) {
        alert("before");
        var monFrameRef = document.getElementById('monerisFrame').contentWindow;
        alert(monFrameRef);
        monFrameRef.postMessage('', 'https://esqa.moneris.com/HPPtoken/index.php');
        // change link according to table above
        return false;
    }

    $scope.respMsg = function (e) {
        var respData = eval("(" + e.data + ")");
        /*document.getElementById("monerisResponse").innerHTML = e.origin + " SENTer " + " -responseCode- " +
         respData.responseCode + " -dataKey- " + respData.dataKey + " -errorMessage- " + respData.errorMessage;*/
        document.getElementById("monerisResponse").innerHTML = e.origin + " SENT " + " | Response Code: " +
            respData.responseCode + " | Temporary Token: " + respData.dataKey + " | Error Message: " + respData.errorMessage + " | Visa Debit: " + respData.visaDebit;
        document.getElementById("monerisFrame").style.display = 'none';
    }

    // <div ng-init="windowOnload()"> https://stackoverflow.com/questions/40934712/how-to-use-window-onload-in-angular-js-controller
    $scope.windowOnload = function () {
        if (window.addEventListener) {
            window.addEventListener("message", respMsg, false);
        }
        else {
            if (window.attachEvent) {
                window.attachEvent("onmessage", respMsg);
            }
        }
    }

    $scope.getTask2 = function () {
        $http.get("../server/footer.php").success(function (data) {
            //$scope.tasks2 = data;
        });
    };

});