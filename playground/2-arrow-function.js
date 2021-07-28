// const square = function (x) {
// 	return x * x;
// };

// const square = (x) => x * x;

// console.log(square(3));

const event = {
	name: 'Birthday',
	guestList: ['John', 'Mary', 'Steve'],
	printGuestList() {
		this.guestList.forEach((guest) => {
			console.log(guest + ' is attending ' + this.name);
		});
	},
};

event.printGuestList();
