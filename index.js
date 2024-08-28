class Room
{
    constructor(name, bookings, rate, discount)
    {
        let error = false;
        if(!(typeof name === "string"))
        {
            this.result = 'Invalid data';
            error = true;
        }

        if(!(Array.isArray(bookings)))
        {
            this.result = 'Invalid data';
            error = true;
        }

        if(!(typeof (rate) === "number"))
        {
            this.result = 'Invalid data';
            error = true;
        }

        if(!(typeof (discount) === "number"))
        {
            this.result = 'Invalid data';
            error = true;
        }

        if(!error)
        {
            this.name = name;
            this.bookings = bookings;
            this.rate = rate*100;
            this.discount = discount;
            this.result = this;
        }
    }

    isOccupied(date)
    {
        if(!isValidDate(date))
        {
            return 'Invalid data';
        }

        for(const booking of this.bookings)
        {
            const dateTime = date.getTime();
            const startBook = booking.checkin.getTime();
            const endBook = booking.checkout.getTime();

            if(dateTime > startBook && dateTime < endBook || dateTime == startBook || dateTime == endBook)
            {
                return true;
            }
        }

        return false;
    }

    occupancyPercentage(startDate, endDate)
    {
        if(!isValidDate(startDate))
        {
            return 'Invalid data';
        }

        if(!isValidDate(endDate))
        {
            return 'Invalid data';
        }

        let availableAmount = 0;

        for(const booking of this.bookings)
        {
            const startTime = startDate.getTime();
            const endTime = endDate.getTime();
            const startBook = booking.checkin.getTime();
            const endBook = booking.checkout.getTime();

            if(startTime >= startBook && endTime <= endBook || startTime == startBook || endTime == endBook)
            {
                availableAmount += 1;
            }
        }

        return (((availableAmount) / this.bookings.length)*100)
    }

    static totalOccupancyPercentage(roomList, startDate, endDate)
    {
        if(!(Array.isArray(roomList)))
        {
            return 'Invalid data';
        }

        if(!isValidDate(startDate))
        {
            return 'Invalid data';
        }

        if(!isValidDate(endDate))
        {
            return 'Invalid data';
        }

        let percentageSum = 0;

        for(const room of roomList)
        {
            percentageSum += room.occupancyPercentage(startDate, endDate);
        }

        return (percentageSum / roomList.length);

    }

    static availableRooms(roomList, startDate, endDate)
    {
        if(!(Array.isArray(roomList)))
        {
            return 'Invalid data';
        }

        if(!isValidDate(startDate))
        {
            return 'Invalid data';
        }

        if(!isValidDate(endDate))
        {
            return 'Invalid data';
        }

        let occupiedList = [];

        for(const room of roomList)
        {
            if(room.occupancyPercentage(startDate, endDate) < 100)
            {
                occupiedList.push(room);
            }
        }

        return (occupiedList);

    }
}

function isValidDate(date) {
    return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
  }

class Booking
{
    constructor(name, email, checkin, checkout, discount, room)
    {
        let error = false;
        if(!(typeof name === "string"))
        {
            this.result = 'Invalid data';
            error = true;
        }

        if(!(typeof email === "string"))
        {
            this.result = 'Invalid data';
            error = true;
        }

        if(!(isValidDate(checkin)))
        {
            this.result = 'Invalid data';
            error = true;
        }

        if(!(isValidDate(checkout)))
        {
            this.result = 'Invalid data';
            error = true;
        }

        if(!(typeof discount === "number"))
        {
            this.result = 'Invalid data';
            error = true;
        }

        if(!(typeof room === "object"))
        {
            this.result = 'Invalid data';
            error = true;
        }

        if(!error)
        {
            this.name = name;
            this.email = email;
            this.checkin = checkin;
            this.checkout = checkout;
            this.discount = discount;
            this.room = room;
        }
    }

    fee()
    {
        const roomFee = (this.room.rate - (this.room.rate * (this.room.discount/100)));
        return (roomFee - (roomFee * (this.discount/100)));
    }
}

export { Room, Booking }