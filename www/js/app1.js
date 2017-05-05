// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('ImageCtrl', function ($scope, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $ionicPopup, $cordovaActionSheet) {
  $scope.image = null;
  $scope.temp=null;
  $scope.entry1=[];
 
  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };
 
 // The rest of the app comes in here
$scope.loadImage = function() {
  var options = {
    title: 'Select Image Source',
    buttonLabels: [ 'Front Camera', 'Rear Camera'],
    addCancelButtonWithLabel: 'Cancel',
    androidEnableCancelButton : true,
  };
  $cordovaActionSheet.show(options).then(function(btnIndex) {
    var type = null;
    if (btnIndex === 1) 
    {
      type = Camera.PictureSourceType.CAMERA;
    } else if (btnIndex === 2) {
      type = Camera.PictureSourceType.CAMERA;
    }
    if (type !== null) {
      $scope.selectPicture1(type);
    }
  });
};


$scope.selectPicture1 = function(sourceType) {
  var options = {
    quality: 15,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    cameraDirection  : 1
  };
 
  $cordovaCamera.getPicture(options).then(function(imagePath) 
  {
    // Grab the file name of the photo in the temporary directory
    var currentName = imagePath.replace(/^.*[\\\/]/, '');
 
    //Create a new name for the photo
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
 
    // If you are trying to load image from the gallery on Android we need special treatment!
    if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
      window.FilePath.resolveNativePath(imagePath, function(entry) {
        window.resolveLocalFileSystemURL(entry, success, fail);
        function fail(e) {
          console.error('Error: ', e);
        }
 
        function success(fileEntry) {
          var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
          // Only copy because of access rights
          $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
            $scope.image = newFileName;
          }, function(error){
            $scope.showAlert('Error', error.exception);
          });
        };
      }
    );
    } else {
      var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      // Move the file to permanent storage
    
      alert(namePath+','+ currentName+','+ cordova.file.externalRootDirectory+','+ newFileName);
      //extra
    /* $cordovaFile.copyFile(namePath, fileEntry.name, 'file:///storage/sdcard0/Others/', newFileName).then(function(success){
        $scope.image = newFileName;
      }, function(error){
        $scope.showAlert('Error', error.exception);
      });*/ 
      $cordovaFile.moveFile(namePath, currentName, cordova.file.externalRootDirectory, newFileName).then(function(success){
        $scope.image = newFileName;
      }, function(error){
        $scope.showAlert('Error', error.exception);
      });
    

      /*$cordovaFile.copyFile(cordova.file.dataDirectory, newFileName, 'file:///storage/sdcard0/Others/', newFileName).then(function(success){
        $scope.image = newFileName;
      }, function(error){
        $scope.showAlert('Error', error.exception);
      });*/
      
    }

    
    
  },
  function(err){
    // Not always an error, maybe cancel was pressed...
  })
};

$scope.pathForImage = function(image) {
  if (image === null) {
    return '';
  } else {
    return cordova.file.externalRootDirectory + image;
  }
};

function listDirectory() {

window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dirEntry) {
var directoryReader = dirEntry.createReader();
directoryReader.readEntries(dirSuccess,dirFail);
});
}

function dirSuccess(entries) {
alert("INFO: Listing entries");
var i;
var j=0;
for (i=0; i<entries.length; i++) 
{
    
    if(entries[i].name.split('.').pop()=='jpg' && entries[i]!=='null')
    {
        $scope.entry1[j]='/storage/sdcard0/Others/'+entries[i].name;
        //alert(entries[i].name);
       $scope.downloadImage(entries[i].name);
       j=j+1;
    }

}
}

function dirFail(error) {
alert("Failed to list directory contents: " + error.code);
} 

$scope.uploadImage = function() {
  //listDirectory()   
  // Destination URL
  var url = "http://172.27.22.233/upload2.php";
 
  // File for Upload
  var targetPath = $scope.pathForImage($scope.image);
 
  // File name only
  var filename = $scope.image;
 
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };
 
  $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
    $scope.showAlert('Success', 'Image upload finished.');
  });


   alert(cordova.file.externalRootDirectory+','+ $scope.image+','+ '/storage/sdcard0/Others/'+','+'test.jpg');
    /*$cordovaFile.moveFile(cordova.file.externalRootDirectory, $scope.Image, cordova.file.externalRootDirectory+'/Others/',$scope.Image).then(function(success){
        //$scope.image = newFileName;
      }, function(error){
        $scope.showAlert('Error', error.exception);
      });*/
};

$scope.downloadImage = function(str) {
    var url = "http://172.27.22.233/uploads/"+str;
      // alert(url);
        var filename = 'testIm.jpg';
        //alert(fiename);
    targetPath = '/storage/sdcard0/Others/'+str ;
        var options = {};
        var trustHosts = true;

    $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
      .then(
        function(result) {
          alert('Download success');
          refreshMedia.refresh(targetPath);
        },
        function(err) {
          alert('Error: ' + JSON.stringify(err));
        },
        function(progress) {
          // progressing download...
        }
      );
      $scope.temp = targetPath;
  };



$scope.downloadList = function() 
{
     listDirectory();
  }



});
