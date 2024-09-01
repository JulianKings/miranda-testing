"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = exports.Room = void 0;
var Room = /** @class */ (function () {
    function Room(name, bookings, rate, discount) {
        var error = false;
        if (!(typeof name === "string")) {
            this.result = 'Invalid data';
            error = true;
        }
        if (!(Array.isArray(bookings))) {
            this.result = 'Invalid data';
            error = true;
        }
        if (!(typeof (rate) === "number")) {
            this.result = 'Invalid data';
            error = true;
        }
        if (!(typeof (discount) === "number")) {
            this.result = 'Invalid data';
            error = true;
        }
        if (!error) {
            this.name = name;
            this.bookings = bookings;
            this.rate = rate * 100;
            this.discount = discount;
        }
    }
    Room.prototype.isOccupied = function (date) {
        if (!isValidDate(date)) {
            return 'Invalid data';
        }
        for (var _i = 0, _a = this.bookings; _i < _a.length; _i++) {
            var booking = _a[_i];
            var dateTime = date.getTime();
            var startBook = booking.checkin.getTime();
            var endBook = booking.checkout.getTime();
            if (dateTime > startBook && dateTime < endBook || dateTime == startBook || dateTime == endBook) {
                return true;
            }
        }
        return false;
    };
    Room.prototype.occupancyPercentage = function (startDate, endDate) {
        if (!isValidDate(startDate)) {
            return 'Invalid data';
        }
        if (!isValidDate(endDate)) {
            return 'Invalid data';
        }
        var availableAmount = 0;
        for (var _i = 0, _a = this.bookings; _i < _a.length; _i++) {
            var booking = _a[_i];
            var startTime = startDate.getTime();
            var endTime = endDate.getTime();
            var startBook = booking.checkin.getTime();
            var endBook = booking.checkout.getTime();
            if (startTime >= startBook && endTime <= endBook || startTime == startBook || endTime == endBook) {
                availableAmount += 1;
            }
        }
        return (((availableAmount) / this.bookings.length) * 100);
    };
    Room.totalOccupancyPercentage = function (roomList, startDate, endDate) {
        if (!(Array.isArray(roomList))) {
            return 'Invalid data';
        }
        if (!isValidDate(startDate)) {
            return 'Invalid data';
        }
        if (!isValidDate(endDate)) {
            return 'Invalid data';
        }
        var percentageSum = 0;
        for (var _i = 0, roomList_1 = roomList; _i < roomList_1.length; _i++) {
            var room = roomList_1[_i];
            percentageSum += room.occupancyPercentage(startDate, endDate);
        }
        return (percentageSum / roomList.length);
    };
    Room.availableRooms = function (roomList, startDate, endDate) {
        if (!(Array.isArray(roomList))) {
            return 'Invalid data';
        }
        if (!isValidDate(startDate)) {
            return 'Invalid data';
        }
        if (!isValidDate(endDate)) {
            return 'Invalid data';
        }
        var occupiedList = [];
        for (var _i = 0, roomList_2 = roomList; _i < roomList_2.length; _i++) {
            var room = roomList_2[_i];
            if (room.occupancyPercentage(startDate, endDate) < 100) {
                occupiedList.push(room);
            }
        }
        return (occupiedList);
    };
    return Room;
}());
exports.Room = Room;
function isValidDate(date) {
    return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
}
var Booking = /** @class */ (function () {
    function Booking(name, email, checkin, checkout, discount, room) {
        var error = false;
        if (!(typeof name === "string")) {
            this.result = 'Invalid data';
            error = true;
        }
        if (!(typeof email === "string")) {
            this.result = 'Invalid data';
            error = true;
        }
        if (!(isValidDate(checkin))) {
            this.result = 'Invalid data';
            error = true;
        }
        if (!(isValidDate(checkout))) {
            this.result = 'Invalid data';
            error = true;
        }
        if (!(typeof discount === "number")) {
            this.result = 'Invalid data';
            error = true;
        }
        if (!(typeof room === "object")) {
            this.result = 'Invalid data';
            error = true;
        }
        if (!error) {
            this.name = name;
            this.email = email;
            this.checkin = checkin;
            this.checkout = checkout;
            this.discount = discount;
            this.room = room;
        }
    }
    Booking.prototype.fee = function () {
        if (!this.discount) {
            return 'Invalid booking discount data';
        }
        if (!this.room) {
            return 'Invalid room data';
        }
        if (!this.room.discount) {
            return 'Invalid room discount data';
        }
        var roomFee = (this.room.rate - (this.room.rate * (this.room.discount / 100)));
        return (roomFee - (roomFee * (this.discount / 100)));
    };
    return Booking;
}());
exports.Booking = Booking;
