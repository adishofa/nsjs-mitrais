const catchError = require("rxjs/operators").catchError;
const Observable = require("rxjs").Observable;
const throwError = require("rxjs").throwError;
const firebase = require("nativescript-plugin-firebase/app");
const firebaseNative = require("nativescript-plugin-firebase");

const Car = require("./car-model");

const editableProperties = [
    "doors",
    "imageUrl",
    "luggage",
    "name",
    "price",
    "seats",
    "transmission",
    "class"
];

const addedProperties = [
    "doors",
    "imageStoragePath",
    "id",
    "hasAC",
    "imageUrl",
    "luggage",
    "name",
    "price",
    "seats",
    "transmission",
    "class"
];

function carService() {
    if (carService._instance) {
        throw new Error("Use .getInstance() instead of new");
    }

    this._cars = [];
    carService._instance = this;

    this.load = function () {
        return new Observable((subscriber) => {
            const carsCollection = firebase.firestore().collection("cars");
            carsCollection.onSnapshot((snapshot) => {
                const res = this._handleSnapshot(snapshot);
                subscriber.next(res);
            })
        }).pipe(catchError(this._handleErrors));
    }

    this.add = function (carModel) {
        const addedModel = cloneAddedModel(carModel);
        const carsCollection = firebase.firestore().collection("cars");

        return carsCollection.doc(carModel.id).set(addedModel)
        .then(() => {
            console.log(`cars ${carModel.id} is added`);
        });
    };

    this.update = function (carModel) {
        const updateModel = cloneUpdateModel(carModel);
        const carsDoc = firebase.firestore().collection("cars").doc(carModel.id);

        return carsDoc.update(updateModel)
        .then(() => {
            console.log(`cars ${carModel.id} is updates`);
        });
    };

    this.delete = function (carModel) {
        const carDoc = firebase.firestore().collection("cars").doc(carModel.id);

        return carDoc.delete()
            .then(() => {
                console.log(`cars ${carModel.id} is deleted`);
            })
    }

    this.uploadImage = function (remoteFullPath, localFullPath) {
        return firebaseNative.storage.uploadFile({
            localFullPath,
            remoteFullPath,
            onProgress: null
        });
    };

    this.getUploadUrl = function (remoteFullPath, bucket) {
        return firebaseNative.storage.getDownloadUrl({
            bucket,
            remoteFullPath
        });
    };

    this._handleSnapshot = function (data) {
        this._cars = [];
        
        data.forEach(docSnap => this._cars.push(new Car(docSnap.data())));

        return this._cars;
    };

    this._handleErrors = function (error) {
        return throwError(error);
    };
}

carService.getInstance = function () {
    return carService._instance;
}

carService._instance = new carService();

function cloneUpdateModel(car) {
    return editableProperties.reduce((prev, current) => (prev[current] = car[current], prev), {});
}

function cloneAddedModel(car) {
    return addedProperties.reduce((prev, current) => (prev[current] = car[current], prev), {});
}

module.exports = carService;
