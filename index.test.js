import { Room, Booking } from "./index";

const mockRoom = {
    name: 'Mock Room',
    rate: 200,
    discount: 10
}

const mockRoom2 = {
    name: 'Mock Room 2',
    rate: 250,
    discount: 50
}

const mockBooking = {
    name: 'Mock Booking',
    email: 'booking@fake.com',
    checkin: new Date('08/26/2024'),
    checkout: new Date('09/26/2024'),
    discount: 10,
}

const mockBooking2 = {
    name: 'Mock Booking 2',
    email: 'booking2@fake.com',
    checkin: new Date('08/24/2024'),
    checkout: new Date('10/26/2024'),
    discount: 30,
}

const mockBooking3 = {
    name: 'Mock Booking 3',
    email: 'booking3@fake.com',
    checkin: new Date('08/26/2024'),
    checkout: new Date('08/27/2024'),
    discount: 50,
}

describe('Room tests', () => {
    test('check for invalid data', () => {
        expect(new Room('potato').result).toBe('Invalid data');
        expect(new Room(123).result).toBe('Invalid data');
        expect(new Room(true).result).toBe('Invalid data');
        expect(new Room(true, true, true, true).result).toBe('Invalid data');
        expect(new Room('potato', [], true, false).result).toBe('Invalid data');
    });

    test('check for valid data', () => {
        const booking = new Booking(mockBooking.name, mockBooking.email, mockBooking.checkin, mockBooking.checkout, mockBooking.discount, mockRoom);
        const booking2 = new Booking(mockBooking2.name, mockBooking2.email, mockBooking2.checkin, mockBooking2.checkout, mockBooking2.discount, mockRoom);
        const booking3 = new Booking(mockBooking3.name, mockBooking3.email, mockBooking3.checkin, mockBooking3.checkout, mockBooking3.discount, mockRoom);
        const room = new Room(mockRoom.name, [booking, booking2, booking3], mockRoom.rate, mockRoom.discount);
        expect(room.name).toBe('Mock Room');
        expect(room.rate).toBe(20000);
        expect(room.discount).toBe(10);
        expect(room.bookings).toHaveLength(3);
    });

    test('check for is occupied function', () => {
        const booking = new Booking(mockBooking.name, mockBooking.email, mockBooking.checkin, mockBooking.checkout, mockBooking.discount, mockRoom);
        const booking2 = new Booking(mockBooking2.name, mockBooking2.email, mockBooking2.checkin, mockBooking2.checkout, mockBooking2.discount, mockRoom);
        const booking3 = new Booking(mockBooking3.name, mockBooking3.email, mockBooking3.checkin, mockBooking3.checkout, mockBooking3.discount, mockRoom);
        const room = new Room(mockRoom.name, [booking, booking2, booking3], mockRoom.rate, mockRoom.discount);
        expect(room.isOccupied(true)).toBe('Invalid data');
        expect(room.isOccupied('hello')).toBe('Invalid data');
        expect(room.isOccupied([])).toBe('Invalid data');
        expect(room.isOccupied(new Date('potato'))).toBe('Invalid data');
    });

    test('check if is occupied function actually works', () => {
        const booking = new Booking(mockBooking.name, mockBooking.email, mockBooking.checkin, mockBooking.checkout, mockBooking.discount, mockRoom);
        const booking2 = new Booking(mockBooking2.name, mockBooking2.email, mockBooking2.checkin, mockBooking2.checkout, mockBooking2.discount, mockRoom);
        const booking3 = new Booking(mockBooking3.name, mockBooking3.email, mockBooking3.checkin, mockBooking3.checkout, mockBooking3.discount, mockRoom);
        const room = new Room(mockRoom.name, [booking, booking2, booking3], mockRoom.rate, mockRoom.discount);
        expect(room.isOccupied(new Date('08/26/2024'))).toBe(true);
        expect(room.isOccupied(new Date('08/26/2025'))).toBe(false);
    });

    test('check for occupancy percentage function', () => {
        const booking = new Booking(mockBooking.name, mockBooking.email, mockBooking.checkin, mockBooking.checkout, mockBooking.discount, mockRoom);
        const booking2 = new Booking(mockBooking2.name, mockBooking2.email, mockBooking2.checkin, mockBooking2.checkout, mockBooking2.discount, mockRoom);
        const booking3 = new Booking(mockBooking3.name, mockBooking3.email, mockBooking3.checkin, mockBooking3.checkout, mockBooking3.discount, mockRoom);
        const room = new Room(mockRoom.name, [booking, booking2, booking3], mockRoom.rate, mockRoom.discount);
        expect(room.occupancyPercentage(true)).toBe('Invalid data');
        expect(room.occupancyPercentage('hello')).toBe('Invalid data');
        expect(room.occupancyPercentage('hello', 'barbie')).toBe('Invalid data');
        expect(room.occupancyPercentage(true, false)).toBe('Invalid data');
        expect(room.occupancyPercentage([])).toBe('Invalid data');
        expect(room.occupancyPercentage(new Date('potato'))).toBe('Invalid data');
        expect(room.occupancyPercentage(new Date('potato'), new Date('tomato'))).toBe('Invalid data');
    });

    test('check if occupancy percentage function actually works', () => {
        const booking = new Booking(mockBooking.name, mockBooking.email, mockBooking.checkin, mockBooking.checkout, mockBooking.discount, mockRoom);
        const booking2 = new Booking(mockBooking2.name, mockBooking2.email, mockBooking2.checkin, mockBooking2.checkout, mockBooking2.discount, mockRoom);
        const booking3 = new Booking(mockBooking3.name, mockBooking3.email, mockBooking3.checkin, mockBooking3.checkout, mockBooking3.discount, mockRoom);
        const room = new Room(mockRoom.name, [booking, booking2, booking3], mockRoom.rate, mockRoom.discount);
        expect(room.occupancyPercentage(new Date('08/26/2024'), new Date('08/28/2024'))).toBe(100);
        expect(room.occupancyPercentage(new Date('08/25/2024'), new Date('08/26/2024'))).toBe((1/3)*100);
        expect(room.occupancyPercentage(new Date('08/26/2030'), new Date('08/28/2030'))).toBe(0);
    });

    test('check for static occupancy percentage function', () => {
        const booking = new Booking(mockBooking.name, mockBooking.email, mockBooking.checkin, mockBooking.checkout, mockBooking.discount, mockRoom);
        const booking2 = new Booking(mockBooking2.name, mockBooking2.email, mockBooking2.checkin, mockBooking2.checkout, mockBooking2.discount, mockRoom);
        const booking3 = new Booking(mockBooking3.name, mockBooking3.email, mockBooking3.checkin, mockBooking3.checkout, mockBooking3.discount, mockRoom);
        const room = new Room(mockRoom.name, [booking, booking2, booking3], mockRoom.rate, mockRoom.discount);
        const booking4 = new Booking(mockBooking.name, mockBooking.email, mockBooking.checkin, mockBooking.checkout, mockBooking.discount, mockRoom);
        const booking5 = new Booking(mockBooking2.name, mockBooking2.email, mockBooking2.checkin, mockBooking2.checkout, mockBooking2.discount, mockRoom);
        const room2 = new Room(mockRoom2.name, [booking4, booking5], mockRoom2.rate, mockRoom2.discount);
        const roomList = [room, room2];
        expect(Room.totalOccupancyPercentage(true)).toBe('Invalid data');
        expect(Room.totalOccupancyPercentage('hello')).toBe('Invalid data');
        expect(Room.totalOccupancyPercentage('hello', 'barbie', 'letsgo party')).toBe('Invalid data');
        expect(Room.totalOccupancyPercentage(true, false, true)).toBe('Invalid data');
        expect(Room.totalOccupancyPercentage([])).toBe('Invalid data');
        expect(Room.totalOccupancyPercentage(new Date('potato'))).toBe('Invalid data');
        expect(Room.totalOccupancyPercentage([], new Date('potato'), new Date('tomato'))).toBe('Invalid data');
    });

    test('check if static occupancy percentage function actually works', () => {
        const booking = new Booking(mockBooking.name, mockBooking.email, mockBooking.checkin, mockBooking.checkout, mockBooking.discount, mockRoom);
        const booking2 = new Booking(mockBooking2.name, mockBooking2.email, mockBooking2.checkin, mockBooking2.checkout, mockBooking2.discount, mockRoom);
        const booking3 = new Booking(mockBooking3.name, mockBooking3.email, mockBooking3.checkin, mockBooking3.checkout, mockBooking3.discount, mockRoom);
        const room = new Room(mockRoom.name, [booking, booking2, booking3], mockRoom.rate, mockRoom.discount);
        const booking4 = new Booking(mockBooking.name, mockBooking.email, mockBooking.checkin, mockBooking.checkout, mockBooking.discount, mockRoom);
        const booking5 = new Booking(mockBooking2.name, mockBooking2.email, mockBooking2.checkin, mockBooking2.checkout, mockBooking2.discount, mockRoom);
        const room2 = new Room(mockRoom2.name, [booking4, booking5], mockRoom2.rate, mockRoom2.discount);
        const roomList = [room, room2];
        expect(Room.totalOccupancyPercentage(roomList, new Date('08/26/2024'), new Date('08/28/2024'))).toBe(100);
        expect(Room.totalOccupancyPercentage(roomList, new Date('08/26/2030'), new Date('08/28/2030'))).toBe(0);
    });

    test('check for static available rooms function', () => {
        const booking = new Booking(mockBooking.name, mockBooking.email, mockBooking.checkin, mockBooking.checkout, mockBooking.discount, mockRoom);
        const booking2 = new Booking(mockBooking2.name, mockBooking2.email, mockBooking2.checkin, mockBooking2.checkout, mockBooking2.discount, mockRoom);
        const booking3 = new Booking(mockBooking3.name, mockBooking3.email, mockBooking3.checkin, mockBooking3.checkout, mockBooking3.discount, mockRoom);
        const room = new Room(mockRoom.name, [booking, booking2, booking3], mockRoom.rate, mockRoom.discount);
        const booking4 = new Booking(mockBooking.name, mockBooking.email, mockBooking.checkin, mockBooking.checkout, mockBooking.discount, mockRoom);
        const booking5 = new Booking(mockBooking2.name, mockBooking2.email, mockBooking2.checkin, mockBooking2.checkout, mockBooking2.discount, mockRoom);
        const room2 = new Room(mockRoom2.name, [booking4, booking5], mockRoom2.rate, mockRoom2.discount);
        const roomList = [room, room2];
        expect(Room.availableRooms(true)).toBe('Invalid data');
        expect(Room.availableRooms('hello')).toBe('Invalid data');
        expect(Room.availableRooms('hello', 'barbie', 'letsgo party')).toBe('Invalid data');
        expect(Room.availableRooms(true, false, true)).toBe('Invalid data');
        expect(Room.availableRooms([])).toBe('Invalid data');
        expect(Room.availableRooms(new Date('potato'))).toBe('Invalid data');
        expect(Room.availableRooms([], new Date('potato'), new Date('tomato'))).toBe('Invalid data');
    });

    test('check if static occupancy percentage function actually works', () => {
        const booking = new Booking(mockBooking.name, mockBooking.email, mockBooking.checkin, mockBooking.checkout, mockBooking.discount, mockRoom);
        const booking2 = new Booking(mockBooking2.name, mockBooking2.email, mockBooking2.checkin, mockBooking2.checkout, mockBooking2.discount, mockRoom);
        const booking3 = new Booking(mockBooking3.name, mockBooking3.email, mockBooking3.checkin, mockBooking3.checkout, mockBooking3.discount, mockRoom);
        const room = new Room(mockRoom.name, [booking, booking2, booking3], mockRoom.rate, mockRoom.discount);
        const booking4 = new Booking(mockBooking.name, mockBooking.email, mockBooking.checkin, mockBooking.checkout, mockBooking.discount, mockRoom);
        const booking5 = new Booking(mockBooking2.name, mockBooking2.email, mockBooking2.checkin, mockBooking2.checkout, mockBooking2.discount, mockRoom);
        const room2 = new Room(mockRoom2.name, [booking4, booking5], mockRoom2.rate, mockRoom2.discount);
        const roomList = [room, room2];
        expect(Room.availableRooms(roomList, new Date('08/26/2024'), new Date('08/28/2024'))).toHaveLength(0);
        expect(Room.availableRooms(roomList, new Date('08/26/2030'), new Date('08/28/2030'))).toHaveLength(2);
    });
});

describe('Booking tests', () => {
    test('check for invalid data', () => {
        expect(new Booking('potato').result).toBe('Invalid data');
        expect(new Booking(123).result).toBe('Invalid data');
        expect(new Booking(true).result).toBe('Invalid data');
        expect(new Booking(true, true, true, true).result).toBe('Invalid data');
        expect(new Booking('tomato', 'potato', [], true, false).result).toBe('Invalid data');
    });

    test('check for valid data', () => {
        const booking = new Booking(mockBooking.name, mockBooking.email, mockBooking.checkin, mockBooking.checkout, mockBooking.discount, mockRoom);
        expect(booking.name).toBe('Mock Booking');
        expect(booking.email).toBe('booking@fake.com');
        expect(booking.checkin.getTime()).toBe(new Date('08/26/2024').getTime());
        expect(booking.checkout.getTime()).toBe(new Date('09/26/2024').getTime());
        expect(booking.discount).toBe(10);
        expect(booking.room).toBe(mockRoom);
    });

    test('check for fee function', () => {
        const booking = new Booking(mockBooking.name, mockBooking.email, mockBooking.checkin, mockBooking.checkout, mockBooking.discount, mockRoom);
        const booking2 = new Booking(mockBooking2.name, mockBooking2.email, mockBooking2.checkin, mockBooking2.checkout, mockBooking2.discount, mockRoom);
        expect(booking.fee()).toBe(162);
        expect(booking2.fee()).toBe(126);
    });
});