# Mobile Mapper!

This is a highly repurposable jQuery Mobile + PhoneGap app that lets you take photos and upload them into Couch and then explore them on a map. Much of the UI is based on [OpenElm](https://github.com/andrewgleave/OpenElm) by Andrew Gleave of [Red Robot Studios](http://www.redrobotstudios.com/). Hire him!

## Installing

To install PhoneGap and mobile-mapper:

1. [Download](http://developer.apple.com/devcenter/ios) and install XCode4 with the iOS (this takes a while... sorry)
2. Build and install the latest PhoneGap (v0.9.6 at the time of this writing) - instructions [here](https://github.com/phonegap/phonegap-iphone)
3. Make a new PhoneGap project in XCode. Hit "Build and Run" and make sure it launches the iOS Simulator. It will complain about some missing files.
4. Replace all the files in the `www` folder in the new project folder with the contents of `www` from this repository.
5. Drag and drop the two files inside `Plugins` from Finder onto the `Plugins` folder inside your project in the XCode file browser pane.
6. Ensure your new project's `PhoneGap.plist` matches the one in this repo (hint: You will probably have to add the `CouchDBAttachmentUploader` and `MapKitView` properties).
7. Add the MapKit framework from the 'Link Binary With Libraries' section