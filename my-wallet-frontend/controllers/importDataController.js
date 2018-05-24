webWalletApp.controller('importDataController', function ($scope, $http) {
    $scope.message = 'Import Data';

    document.getElementById('upload-button').addEventListener("click", function () {
        console.log("trying");
        var filePath = document.getElementById('file-input').files[0];
        console.log(filePath);
        var formdata = new FormData();
        formdata.append("file", filePath);
        var post = $http({
            method: "POST",
            url: "http://localhost:8080/api/transactions/upload",
            enctype: 'multipart/form-data',
            data: formdata,
            processData: false,
            contentType: false,
            headers : {
                'Content-Type' : undefined
            }
        }).then(function (response) {
            document.getElementById('success-import-file').style.display = 'block';
            document.getElementById('error-import-file').style.display = 'none';
        }, function (error) {
            console.log("catch");
            document.getElementById('success-import-file').style.display = 'none';
            document.getElementById('error-import-file').style.display = 'block';
        });
    });
});