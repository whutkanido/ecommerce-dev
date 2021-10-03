// cache editable dom zone

const productsList = document.querySelector('.products-center');

// getting products from pedals.json
class Products{
 async getProducts(){
     try {
        let result = await fetch('pedals.json');
        let data = await result.json();
        let products = data.items;
        products = products.map(item => {
            const {title,price} = item.fields;
            const {id} = item.sys;
            const image = item.fields.image.fields.file.url;
            return {title,price,id,image}
        })
        return products
     } catch (error) {
        console.log(error)
     }
  
 }
}

// render products
class Render{
    displayProducts(products){
        let result = '';
        products.forEach(product =>{
            result +=`
            
            <article class="product">
                <div class="img-container">
                    <img src="${product.image}" class="product-img">
                    <button class="bag-btn" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i>
                        add to cart
                    </button>
                </div>
                <h3>${product.title}</h3>
                <h4>$${product.price}</h4>
            </article>
            
            `;
        });
        productsList.innerHTML = result;
    }

}



document.addEventListener("DOMContentLoaded",()=>{
const ui = new Render();
const products = new Products();

// get the products
products.getProducts().then(products => ui.displayProducts(products));
})
