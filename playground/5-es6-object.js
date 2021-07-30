const name = 'Talip';

const age = 27;

const user = {
	name,
	age,
	location: 'Colmar',
};

console.log(user);

const product = {
	label: 'iPhone',
	price: 699,
	stock: 10,
	salePrice: 4.2,
	rating: 4.2,
};

// const label = product.label;
// const stock = product.stock;

const { label: productLabel, price, rating = 5 } = product;

// console.log(productLabel);
// console.log(rating);
const transaction = (type, { label, stock }) => {
	console.log(type, label, stock);
};

transaction('order', product);
