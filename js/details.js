import { UI } from "./ui.js";

export class Details {
    constructor(id) {
        this.ui = new UI();
        this.displayproductDetails(id);

    }
    async displayproductDetails(productid) {
        console.log(productid);
        let moloading = document.querySelector(".moloading");
        moloading.classList.remove("d-none");

        const options = {
            method: 'GET'
        };

        fetch(`https://ecommerce.routemisr.com/api/v1/products/${productid}`, options)
            .then((response) => response.json())
            .then((response) => this.ui.displayproductDetails(response.data))
            .catch((err) => console.error(err))
            .finally(() => {
                moloading.classList.add("d-none");
            });
    }

}