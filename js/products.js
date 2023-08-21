import { Details } from "./details.js";
import { UI } from "./ui.js";


export class Products {
    constructor() {
        this.getproducts("All");
        this.getAllCategories();
        document.querySelector("#btncart").addEventListener("click", (e) => {
          this.ui.displaycart();
        });
        document.querySelectorAll(".nav-item a").forEach((link) => {
            link.addEventListener("click", (e) => {
                document.querySelector(".menu .active").classList.remove("active");
                e.target.classList.add("active");
                if (e.target.dataset.category == "All")
                    this.getproducts("All");
            })
        });
        this.ui = new UI;
        this.ui.loadcart();
        this.ui.getcart();
    }
    async getAllCategories() {
        let moloading = document.querySelector(".moloading");
        moloading.classList.remove("d-none");

        const options = {
            method: 'GET',
        };

        let apifetch = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`, options);
        let response = await apifetch.json();
        console.log(response)
        this.ui.displaycategoriesData(response.data);
        this.categorycardclick()
        moloading.classList.add("d-none");
    }

    async getproducts(categoryID) {
        let moloading = document.querySelector(".moloading");
        moloading.classList.remove("d-none");

        const options = {
            method: 'GET',
        };
        let apifetch = await fetch(categoryID == null || categoryID == '' || categoryID == 'All' ? `https://ecommerce.routemisr.com/api/v1/products` : `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryID}`, options);
        let response = await apifetch.json();
        this.ui.displayproductData(response.data);
        this.productcardclick();
        this.ui.loadcartbtn();
        moloading.classList.add("d-none");
    }

    categorycardclick() {
        document.querySelectorAll(".catcard").forEach((item) => {
            item.addEventListener("click", () => {
                const id = item.dataset.categoryid;
                this.getproducts(id);
            });
        });
    }
    productcardclick() {
        document.querySelectorAll(".card-body").forEach((item) => {
            item.addEventListener("click", () => {
                const id = item.dataset.id;
                this.showDetails(id);
            });
        });
    }

    showDetails(idProduct) {
        const details = new Details(idProduct);
        document.querySelector(".products").classList.add("d-none");
        document.querySelector(".moproductdetailes").classList.remove("d-none");
    }


}
