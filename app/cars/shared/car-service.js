const catchError = require("rxjs/operators").catchError;
const Observable = require("rxjs").Observable;
const throwError = require("rxjs").throwError;
const firebase = require("nativescript-plugin-firebase/app");

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

function carService() {
    if (carService._instance) {
        throw new Error("Use .getInstance() instead of new");
    }

    this._car = [];
    carService._instance = this;

    this.load = function () {
        return new Observable((subscriber) => {
            const carsCollection = firebase.firestore().collection("cars");
            console.log(carsCollection);
            carsCollection.onSnapshot((snapshot) => {
                const res = this._handleSnapshot(snapshot);
                subscriber.next(res);
            })
        }).pipe(catchError(this._handleErrors));
    }

    this.add = function (carModel) {
        const addedModel = cloneUpdateModel(carModel);
        const carsCollection = firebase.firestore().collection("cars");

        return carsCollection.doc(carModel.id).set(addedModel);
    };

    this.update = function (carModel) {
        const updateModel = cloneUpdateModel(carModel);
        const carsDoc = firebase.firestore().collection("cars").doc(carModel.id);

        return carsDoc.update(updateModel)
        .then(() => {
            console.log(`cars ${carModel.id} is updates`);
        });
    };

    this.uploadImage = function (remoteFullPath, localFullPath) {
        return firebase.storage.uploadFile({
            localFullPath,
            remoteFullPath,
            onProgress: null
        });
    };

    this._handleSnapshot = function (data) {
        this._cars = [];

        if (data) {
            for (const id in data) {
                if (data.hasOwnProperty(id)) {
                    this._cars.push(new Car(data[id]));
                }
            }
        }

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
    return editableProperties.reduce((prev, current) => (prev[current] = car[current], prev), {}) 
}

module.exports = carService;
