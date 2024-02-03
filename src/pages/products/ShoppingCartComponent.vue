<template>
    <Head title="Shopping Cart" />

    <header-level-one :page="`shop`">
        <template #header-level-two>
            <header-level-two page="shop"/>
        </template>
    </header-level-one>

    <header-level-three :dont-show-cat-list="true"></header-level-three>

    <bread-crumb :title="`Shopping Cart`" :bg-img="berries"/>

    <!-- Shoping Cart Section Begin -->
    <section class="shoping-cart spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <template v-if="$store.state.isMobile && $store.state.itemsInCat.length > 0">
                        <div  v-for="(item,index) in $store.state.itemsInCat" :key="index">
                            <div class="row">
                                <div class="col-4 bg-light">
                                    <a :href="formatUrl(item.product)" @click.prevent="goto(formatUrl(item.product))">
                                        <template v-if="item.product">
                                            <img :src="item.product.product_pictures[0].full_image_path" alt="" style="width: 100%;">
                                        </template>
                                    </a>
                                </div>
                                <div class="col-6">
                                    <a :href="formatUrl(item.product)" @click.prevent="goto(formatUrl(item.product))">
                                        <h5>{{ item.product.name }}</h5>
                                        {{ moneyFormat(item.product.discounted_price) }}
                                        <span class="text-muted" style="text-decoration: line-through">{{ moneyFormat(item.product.original_price)}}</span><br>
                                    </a>
                                </div>
                                <div class="col-2">
                                    <div class="shoping__cart__item__close">
                                        <button class="btn btn-outline-danger" @click.prevent="removeItemFromCart(item,index)"><i class="fa fa-trash"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-7 p-3">
                                    <b>Subtotal </b>
                                    <br> {{ moneyFormat(item.product.discounted_price * item.quantity) }}
                                </div>
                                <div class="col-3 p-3">
                                    <div class="pro-qty">
                                        <span class="dec qtybtn" @click.prevent="decrementQuantity(item,index)">-</span>
                                        <input type="text" :value="item.quantity">
                                        <span class="inc qtybtn" @click.prevent="incrementQuantity(item,index)">+</span>
                                    </div>
                                </div>
                            </div>
                            <hr>
                        </div>
                    </template>
                    <template v-else>
                        <div class="shoping__cart__table">
                            <table>
                                <thead>
                                <tr>
                                    <th class="shoping__product">Products</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody v-if="$store.state.itemsInCat.length > 0">
                                <tr v-for="(item,index) in $store.state.itemsInCat" :key="index">
                                    <template v-if="item.product">
                                        <td class="shoping__cart__item">
                                            <a :href="formatUrl(item.product)" @click.prevent="goto(formatUrl(item.product))">
                                                <div class="row">
                                                    <div class="col-2">
                                                        <img :src="item.product.product_pictures[0].full_image_path" alt="" style="width: 100px;">
                                                    </div>
                                                    <div class="col-10" style="padding-right: 4rem;">
                                                        <h5>{{ item.product.name }}</h5>
                                                    </div>
                                                </div>
                                            </a>
                                        </td>
                                        <td class="shoping__cart__price">
                                            {{ moneyFormat(item.product.discounted_price) }}
                                        </td>
                                        <td class="shoping__cart__quantity">
                                            <div class="quantity">
                                                <div class="pro-qty">
                                                    <span class="dec qtybtn" @click.prevent="decrementQuantity(item,index)">-</span>
                                                    <input type="text" :value="item.quantity">
                                                    <span class="inc qtybtn" @click.prevent="incrementQuantity(item,index)">+</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="shoping__cart__total">
                                            {{ moneyFormat(item.product.discounted_price * item.quantity) }}
                                        </td>
                                        <td class="shoping__cart__item__close">
                                            <span class="icon_close" @click.prevent="removeItemFromCart(item,index)"></span>
                                        </td>
                                    </template>
                                </tr>
                                </tbody>
                                <tbody v-else>
                                <tr>
                                    <td colspan="5">You currently have no items in your cart</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </template>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="shoping__cart__btns">
                        <a href="/products/explore" @click.prevent="goto('/products/explore')" class="primary-btn cart-btn">CONTINUE SHOPPING</a>
<!--                        <a href="#" class="primary-btn cart-btn cart-btn-right"><span class="icon_loading"></span>-->
<!--                            Upadate Cart</a>-->
                    </div>
                </div>
                <template v-if="$store.state.itemsInCat.length > 0">
                    <div class="col-lg-6">
                        <div class="shoping__continue">
                            <div class="shoping__discount">
                                <h5>Discount Codes</h5>
                                <form action="#">
                                    <input type="text" placeholder="Enter your coupon code">
                                    <button type="submit" class="site-btn" @click.prevent="showErrorMessage('Invalid Code')">APPLY COUPON</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="shoping__checkout">
                            <h5>Cart Total</h5>
                            <ul>
                                <li>Subtotal <span>{{ moneyFormat($store.state.subTotal) }}</span></li>
                                <li>Discount <span>{{ moneyFormat($store.state.discount) }}</span></li>
                                <li>Total <span>{{ moneyFormat($store.state.total) }}</span></li>
                            </ul>
                            <span v-if="$store.state.loggedInUser">
                                <a :href="checkout" class="primary-btn" target="_child">
                                    PROCEED TO CHECKOUT
                                </a>
                            </span>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </section>
    <!-- Shoping Cart Section End -->


    <footer-item />

</template>

<script>


import BreadCrumb from "../../components/widgets/BreadCrumbWg.vue"
import HeaderLevelOne from "../../components/layouts/HeaderLevelOne.vue";
import HeaderLevelTwo from "../../components/layouts/HeaderLevelTwo.vue"
import HeaderLevelThree from "../../components/layouts/HeaderLevelThree.vue"

import cathelper from "../../mixins/cathelper.js";
import helpers from "../../mixins/helpers.js";

import FooterItem from "../../components/layouts/FooterItem.vue";

import axios from "axios";

import config from "../../mixins/config.js";

export default {
    data() {
        return {
            berries:null,
        };
    },
    components: {
        FooterItem,
        HeaderLevelOne,
        HeaderLevelTwo,
        HeaderLevelThree,
        BreadCrumb,
    },
    mixins: [cathelper,helpers],

    computed:{
        checkout(){
            if(this.$store.state.loggedInUser)
                return `${config.checkout_url}/cl/${this.$store.state.loggedInUser.token}`
        }
    },

    methods: {
        incrementQuantity(item){
            let qty = ++item.quantity;
            this.update(item.id,qty);

        },

        decrementQuantity(item){
            let qty = item.quantity > 1? --item.quantity:1
            this.update(item.id,qty);
        },

        update(id,qty){
            let formData = new FormData();
            formData.append('quantity',qty);

            axios.post(`${config.admin_url}/api/cart/update/` + id, formData, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.loggedInUser? this.$store.state.loggedInUser.token:null}`,
                }
            });
        },
    },

    created() {
        // this.watchedProperty = this.$store.state.itemsInCat;

        // Watch the state property with deep option
        this.$watch(
            () => this.$store.state.itemsInCat,
            () => {
                this.$store.commit('updateTotal');
            },
            { deep: true }
        );
    }

};

</script>
