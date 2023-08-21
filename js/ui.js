
export class UI {
  allProducts = [];
  displaycategoriesData(response) {
    console.log(response);
    let moloading = document.querySelector(".moloading");
    moloading.classList.remove("d-none");
    let categoriesDataSection = document.querySelector("#categoriesData");
    let categoriesscontainer = "";
    for (let i = 0; i < response.length; i++) {
      categoriesscontainer += `
      <div class="card">
      <img class="rounded-1 catcard" height="150" data-categoryid="${response[i]._id}" src="${response[i].image}" alt="${response[i].name}">
      <h4 class="h6 text-center text-dark">${response[i].name}</h4>
      </div>`;
    }
    categoriesDataSection.innerHTML = categoriesscontainer;
    moloading.classList.add("d-none");
  }

  displayproductData(response) {
    this.allProducts = response;
    console.log(this.allProducts);
    let moloading = document.querySelector(".moloading");
    moloading.classList.remove("d-none");
    let productDataSection = document.querySelector("#productData");
    let productscontainer = "";
    for (let i = 0; i < response.length; i++) {
      productscontainer += `
            <div class="col">
            <div class="card h-100 bg-transparent" role="button" "="">
           <div  data-id="${response[i]._id}" class="card-body">
              <figure class="position-relative">
                <img class="card-img-top object-fit-cover h-100" src="${response[i].imageCover}">
    
              </figure>
    
              <figcaption>
    
                <div class="hstack justify-content-between">
                  <h3 class="h6 small">${response[i].title.split(' ').slice(0, 2).join(' ')}</h3>
                  
                  <span class="badge text-bg-primary p-2 btnaddtocart"  data-productid="${response[i]._id}" >Add To Cart</span>
                </div>
    
                <p class="card-text small text-center opacity-50">
                ${response[i].slug.split(' ').slice(0, 3).join(' ')}
                </p>
    
              </figcaption>
            </div>
    
            <footer class="card-footer small hstack justify-content-between">
    
              <span class="badge badge-color">${response[i].category.name}</span>
              <span class="badge badge-color">${response[i].price} EGP</span>
    
            </footer>
          </div>
        </div>`;
    }
    productDataSection.innerHTML = productscontainer;
    moloading.classList.add("d-none");
  }

  displaycart() {

    $('.rightcenter').show();
    if ($('.rightcenter').css("width") == "0px") {
      $('.rightcenter').show();
      $('.rightcenter').animate({ 'width': '600px' });
      console.log("sdasd1111");
      this.showproductsincart();
    }
    else {
      $('.rightcenter').animate({ 'width': '0px' }, function (param) {
        $('.rightcenter').hide();
      });
      console.log("sdasd555551");
    }
  }
  showproductsincart() {
    let cartproductsdiv = document.querySelector(".cartContent");
    let cartProducts = "";
    let storedCartDataString = localStorage.getItem("cartData");
    let storedCartData = JSON.parse(storedCartDataString);
    console.log(storedCartData);
    for (let i = 0; i < storedCartData.numOfCartItems; i++) {
      cartProducts += `
        <div class="d-flex justify-content-center align-content-center p-2">
        <img src="${storedCartData.data.products[i].product.imageCover}" style="width: 100px; height: 70px;" alt="">
        <p class="px-4 text-center">${storedCartData.data.products[i].product.title.split(' ').slice(0, 2).join(' ')}</p>
        <p class="text-center">Price: ${storedCartData.data.products[i].price} EGP</p>
      </div>`;
    }
    cartproductsdiv.innerHTML = cartProducts;
  }
  displayproductDetails(response) {
    console.log(response);
    let moloading = document.querySelector(".moloading");
    moloading.classList.remove("d-none");

    let moproductdetailes = document.querySelector(".moproductdetailes");
    moproductdetailes.classList.remove("d-none");

    let productdetailscontent = `
      <div class="row container d-flex align-content-center  m-auto position-relative">
      <div class="exitbtn"></div>
            <div class="mt-5 col-sm-12 col-md-4">
              <img src="${response.imageCover}" class="w-100" alt="image details">
            </div>
            <div class="mt-5 col-sm-12 col-md-8">
              <h3>Product Details</h3>
              <h4>Title: ${response.title}</h4>
              <p>Category: <span class="badge text-bg-info"> ${response.category.name}</span> </p>
              <p>Slug: <span class="badge text-bg-info"> ${response.slug}</span> </p>
              <p>Price: <span class="badge text-bg-info"> ${response.price}</span> </p>
              <p>Description: <span class="small"> ${response.description}</span> </p>
              <a class="btn btn-outline-warning btnaddtocart" data-productid="${response._id}" >Add To Cart</a>
            </div>
          </div>`;

    moproductdetailes.innerHTML = productdetailscontent;
    moloading.classList.add("d-none");
    this.exitclick();
  }
  addtocart(product) {
    if (product != null) {
      // Retrieve the stored object from the local storage
      let storedCartDataString = localStorage.getItem("cartData");
      let storedCartData = JSON.parse(storedCartDataString);

      const searchByIdinAllProducts = (productId) => {
        const foundAllProduct = this.allProducts.find((product) => product._id === productId);
        return foundAllProduct || null;
      };

      const foundAllProduct = searchByIdinAllProducts(product);

      const searchByIdinSavedCart = (storedCartData, productId) => {
        const foundProduct = storedCartData.data.products.find((product) => product._id === productId);
        return foundProduct || null;
      }
      const foundProduct = searchByIdinSavedCart(storedCartData, product);

      if (foundProduct !== null) {
        console.log(foundAllProduct);
        // Product already exists in the cart, update count and price
        foundProduct.count += 1;
      } else {
        // Create a new product object
        const newProduct = {
          count: 1,
          _id: foundAllProduct._id,
          product: {
            _id: foundAllProduct._id,
            title: foundAllProduct.title,
            imageCover: foundAllProduct.imageCover
          },
          price: foundAllProduct.price,
        };
        storedCartData.data.products.push(newProduct);

        // Update the numOfCartItems
        storedCartData.numOfCartItems = storedCartData.data.products.length;

      }
      let totalCartPrice = 0;
      storedCartData.data.products.forEach((product) => {
        totalCartPrice += product.price * product.count;
      });
      storedCartData.data.totalCartPrice = totalCartPrice;

      // Convert the updated object to a JSON string
      const updatedCartDataString = JSON.stringify(storedCartData);

      // Store the updated JSON string back in the local storage
      localStorage.setItem("cartData", updatedCartDataString);

      this.getcart();
    }

  }
  getcart() {
    // Retrieve the cart data from the local storage
    const cartDataString = localStorage.getItem("cartData");

    // Parse the JSON string into an object
    const cartData = JSON.parse(cartDataString);

    document.querySelector(".cartnum").innerHTML = cartData.numOfCartItems;
    this.showproductsincart();
  }
  loadcart() {
    const cartDataString = localStorage.getItem("cartData");

    if (!cartDataString) {
      const cartData = {
        numOfCartItems: 0,
        data: {
          products: [

          ], totalCartPrice: 0,
        },
      };

      // Convert the object to a JSON string
      const cartDataString = JSON.stringify(cartData);

      // Store the JSON string in the local storage
      localStorage.setItem("cartData", cartDataString);
    }
  }
  loadcartbtn() {
    document.querySelectorAll(".btnaddtocart").forEach((item) => {
      item.addEventListener("click", () => {
        this.addtocart(item.dataset.productid);
      });
    });
  }
  exitclick() {
    let btnExit = document.querySelector(".exitbtn");
    btnExit.addEventListener("click", () => {
      document.querySelector(".products").classList.remove("d-none");
      document.querySelector(".moproductdetailes").classList.add("d-none");
    });
  }
}
