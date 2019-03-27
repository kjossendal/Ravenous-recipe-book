// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBrEiRyjqdeDYUEIS3BAEC-qzR9isB9ABs",
    authDomain: "ravenous-recipes.firebaseapp.com",
    databaseURL: "https://ravenous-recipes.firebaseio.com",
    projectId: "ravenous-recipes",
    storageBucket: "ravenous-recipes.appspot.com",
    messagingSenderId: "671659963137"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
