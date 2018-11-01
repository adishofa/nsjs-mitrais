var firebase = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
//   databaseURL: "https://test-23cfc.firebaseio.com"
});

// var db = firebase.database();
// var ref = db.ref("restricted_access/secret_document");
// ref.once("value", function(snapshot) {
//   console.log(snapshot.val());
// });

// var usersRef = ref.child("users");
// usersRef.set({
//   alanisawesome: {
//     date_of_birth: "June 23, 1912",
//     full_name: "Alan Turing"
//   },
//   gracehop: {
//     date_of_birth: "December 9, 1906",
//     full_name: "Grace Hopper"
//   }
// });

// var uid = "uvbeamkZ3lXhkAkzh356q65gly02";

// firebase.auth().updateUser(uid, {
//   // email: "modifiedUser@example.com",
//   phoneNumber: "+6283114866558",
//   emailVerified: true,
//   // password: "newPassword",
//   displayName: "Adi Hafiduh",
//   photoURL: "https://firebasestorage.googleapis.com/v0/b/nativescriptjs.appspot.com/o/cars%2FMini%20Cooper%20s.jpg?alt=media&token=9d042865-c6f6-4128-85d7-13f46cb5c6b3",
//   disabled: false
// })
//   .then(function(userRecord) {
//     // See the UserRecord reference doc for the contents of userRecord.
//     console.log("Successfully updated user", userRecord.toJSON());
//   })
//   .catch(function(error) {
//     console.log("Error updating user:", error);
//   });

firebase.auth().createUser({
  // email: "modifiedUser@example.com",
  phoneNumber: "+6283114866558",
  // emailVerified: true,
  // password: "newPassword",
  displayName: "Adi Hafiduh",
  photoURL: "https://firebasestorage.googleapis.com/v0/b/nativescriptjs.appspot.com/o/cars%2FMini%20Cooper%20s.jpg?alt=media&token=9d042865-c6f6-4128-85d7-13f46cb5c6b3",
  disabled: false
})
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully updated user", userRecord.toJSON());
  })
  .catch(function(error) {
    console.log("Error updating user:", error);
  });
