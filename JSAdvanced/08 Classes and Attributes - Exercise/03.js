

function solve(input, criteria) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }
     const sortBy = {
        destination: (array) => array.sort((a, b) =>a.destination.localeCompare(b.destination)),
        price: (array) => array.sort((a, b) => a.price - b.price),
        status: (array) => array.sort((a, b) => a.status.localeCompare(b.status)),
    }
    let arr = [];
    input.forEach(line => {
        [dest, price, status] = line.split('|');
        arr.push(new Ticket(dest, Number(price), status))
    });
    let sorted =sortBy[criteria](arr);

    return (sorted);
}

console.log(solve(['Philadelphia|194.20|available',
'New York City|95.99|available',
'New York City|95.99|sold',
'Boston|126.20|departed'],
'destination'));