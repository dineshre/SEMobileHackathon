Setup for the helloWorld Starter App
open a command line and navigate to the directory you'd like your project to be in, then create a new cordova project
    cordova create helloWorld com.se.helloworld HelloWorld

copy all the files from this repos www folder and overwrite all files inside your new project's www folder

open the configFunctions.js file under the services directory and update you app settings accordingly.

change your command line to the new projects directory add the android platform to you project
    cordova platform add android

add the following just before the closing </widget> tag inside your config.xml which is located at the root level of your project

    <preference name="LoadingDialog" value="Schneider Electric"/>
    <preference name="LoadingPageDialog" value=""/>
    <preference name="Orientation" value="portrait" />


from the sdk plugins folder, add the following plugins to your project
    cordova plugin add <yourpath to primer project>\plugins\org.apache.cordova.device

build the project and make sure no errors pop up
    cordova build android

you can also run this in the android emulator, but its better to try on a device.
Kinvey data calls might hang depending on network configurations from the emulator.
    cordova run android

