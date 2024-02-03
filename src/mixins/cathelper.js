import sweetalert from "./notify.js";
import axios from "axios";
import config from "./config.js";
import request from "./request.js";
import $ from 'jquery';


export default {
    mixins: [sweetalert,request],
    data() {
        return {

        };
    },
    methods: {
        updateCat(product, index) {
            if(!this.$store.state.loggedInUser)
                this.goto('/auth/login');

            if (this.isItemInCat(product)) {
                $(`.cat_icon_${index}`).removeClass('animate__animated animate__heartBeat');
                $(`.cat_icon_${index}`).addClass('animate__animated animate__wobble');
                this.showErrorMessage("Item already in cart!")
            } else {

                $(`.cat_${index}`).addClass('animate__animated animate__heartBeat');

                let formData = new FormData();
                formData.append('productID',product.id);
                formData.append('quantity',this.$store.state.selected_product_quantity);
                formData.append('type','cart');

                this.makePostRequest(`${config.admin_url}/api/cart`, formData,
                    () =>   {
                            this.$store.commit('updateItemsInCat', product);
                            this.showSuccessMessage("Added to cart!")
                        },
                    () => {
                        this.showErrorMessage("Something happened, try again later!");
                    });
            }
        },

        updateWishList(product,index){
            if(!this.$store.state.loggedInUser)
                this.goto('/auth/login');

            if(this.isItemInWishList(product)){
                $(`.wish_icon_${index}`).removeClass('animate__animated animate__heartBeat');
                $(`.wish_icon_${index}`).addClass('animate__animated animate__wobble');
                this.showErrorMessage("Item already in wish list!")
            }else{
                $(`.wish_${index}`).addClass('animate__animated animate__heartBeat');

                let formData = new FormData();
                formData.append('productID',product.id);
                formData.append('type','wishList');

                this.makePostRequest(`${config.admin_url}/api/cart`, formData,
                    () => {
                        this.$store.commit('updateWishlist',product);
                        this.showSuccessMessage("Added to wish list!")
                    },
                    () => {
                        this.showErrorMessage("Something happened, try again later!");
                    });
            }

        },

        removeItemFromCart(item,index){
            axios.delete(`${config.admin_url}/api/cart/` + item.id, {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.loggedInUser? this.$store.state.loggedInUser.token:null}`,
                    }
                }).then(() => {
                    this.$store.state.itemsInCat.splice(index,1)
                    this.showSuccessMessage('Item removed from your cart!');
                })
        },

        isItemInCat(itemToCheck) {
            return this.$store.state.itemsInCat.some(item => item['product_id'] === itemToCheck['id']);
        },

        isItemInWishList(itemToCheck) {
            return this.$store.state.wishlist.some(item => item['product_id'] === itemToCheck['id']);
        },
    },
};
