"use strict"
let products = [];

function getProductTemplate(product) {

    const stars = [
        '<div class="bi-star-fill"></div>',
        '<div class="bi-star-fill"></div>',
        '<div class="bi-star-fill"></div>',
        '<div class="bi-star-fill"></div>',
        '<div class="bi-star-fill"></div>'
        ];
    
    let element = `
        <div class="col mb-5">
            <div class="card h-100" id="product-${product.id}">
                <!-- Product image-->
                <img class="card-img-top" src="${product.image}" alt="..." />
                <!-- Product details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder">${product.title}</h5>
                        <!-- Product reviews-->
                        <div class="d-flex justify-content-center small text-warning mb-2">
                        ${stars}
                        </div>
                        <!-- Product price-->
                        $${product.price}
                    </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                        <button class="add-to-cart btn btn-outline-dark mt-auto" href="#" onclick=addToCart(${product.id})>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    return element;
}

async function fetchProducts() {
    let products = localStorage.getItem("products");

    if (products === null) {
        const response = await fetch("https://fakestoreapi.com/products");
        const result = await response.json();

        const products = result.map((product) => {
            return {
                id: product.id,
                title: product.title,
                image: product.image,
                price: product.price,
                stars: Math.round(product.rating.rate),
            };
        });

        localStorage.setItem("products", JSON.stringify(products));
    } else {
        products = JSON.parse(products);
    }

    return products;
}

function getProduct(storageKey ,id){
    let product = JSON.parse(localStorage.getItem(storageKey))
    .filter(product => 
        product.id === id
        )
    return product;
}
async function getFavoriteProducts(product){
    let favoriteItems = [] 
    let favoriteList = localStorage.getItem('favoriteItems')
    
    if(favoriteList)
    favoriteItems.push(...JSON.parse(favoriteList))
        
    favoriteItems.push(product[0])
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems))
    return favoriteList
}
       
function getAllProducts(){
    let allProducts = document.querySelector('[cart-variable]');
    allProducts.innerHTML = JSON.parse(localStorage.getItem('favoriteItems')).length;
}

function addToCart(id){
    let product = getProduct('products', id)
    getFavoriteProducts(product).then(getAllProducts())   
}
function showProducts(){
    const productRow = document.querySelector('[data-products-row]');
    fetchProducts().then((products)=>{

        products.forEach(element => {
        productRow.innerHTML += getProductTemplate(element);
    }
    )})
    getAllProducts()
}

showProducts()

// fetchProducts().then((products) => {
//     const productsRow = document.querySelector('[data-products-row]');

//     products.forEach((product) => {
//         productsRow.innerHTML += getProductTemplate(product);

//         const addToCartButton = productsRow.querySelector(
//             `#product-${product.id} button.add-to-cart`
//         );

//         addToCartButton.addEventListener("click", function() {
//             addToCart(product);
//             });
// });

// });





