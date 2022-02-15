"use strict"
let inCart = JSON.parse(localStorage.getItem('inCart'));
	
	
	window.onload = updateCartCount();
	
	function updateCartCount() {
	const cartCount = document.getElementById('cart-count');
	
	const inCart = JSON.parse(localStorage.getItem('inCart'));
	
	let productCount = 0;
	for (let product in inCart) {
	productCount += inCart[product];
	}
	}
	
	function addToCart(product) {
	product = JSON.stringify(product);
	
	if (inCart === null) {
	inCart = {};
	inCart[product] = 1;
	}
	else {
	if (inCart[product]) {
	inCart[product]++;
	}
	else {
	inCart[product] = 1;
	}
	}
	
	localStorage.setItem('inCart', JSON.stringify(inCart));
	
	updateCartCount();
	}
	
	function removeFromCart(product) {
	product = JSON.stringify(product);
	
	if (inCart[product] > 0) {
	inCart[product]--;
	}
	
	if (inCart[product] === 0) {
	delete inCart[product];
	}
	
	localStorage.setItem('inCart', JSON.stringify(inCart));
	
	updateCartCount();
	}
	
	function clearCart() {
	inCart = {};
	localStorage.setItem('inCart', JSON.stringify(inCart));
	document.getElementById('products-box').innerHTML = '';
	document.getElementById("empty-cart").hidden = false;
	document.getElementById("full-cart").hidden = true;
	updateCartCount();
	}



    