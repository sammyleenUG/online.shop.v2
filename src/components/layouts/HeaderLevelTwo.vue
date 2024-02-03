<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-3">
                <div class="header__logo">
                    <div class="row">
                        <div class="col-7">
                            <a href="/" @click.prevent="goto('/')"><img :src="logo" alt="Logo" style="width: 80px;"></a>
                        </div>
                        <div class="col-5 mt-3 d-flex" v-if="$store.state.isMobile">
                            <div class="position-relative">
                                <a class="mr-2" href="/shopping-cart" @click.prevent="goto('/shopping-cart')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-bag-heart-fill" viewBox="0 0 16 16">
                                    <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
                                    </svg>
                                    <span>{{ $store.state.wishlist.length }}</span>
                                </a>
                                <a href="/shopping-cart" @click.prevent="goto('/shopping-cart')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-cart4" viewBox="0 0 16 16">
                                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                                    </svg>
                                    <span>{{ $store.state.itemsInCat.length }}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <nav class="header__menu">
                    <ul>
                        <li :class="`${page === 'home'? 'active':''}`"><a href="/" @click.prevent="goto('/')">Home</a></li>
                        <li :class="`${page === 'shop'? 'active':''}`"><a href="/products/explore" @click.prevent="goto('/products/explore')">Explore</a></li>
                        <li :class="`${page === 'account'? 'active':''}`"><a href="#">Your Account</a>
                            <ul class="header__menu__dropdown">
                                <li><a href="/" @click.prevent="goto('/')">Orders</a></li>
                                <li><a href="/shopping-cart" @click.prevent="goto('/shopping-cart')">Shopping Cart</a></li>
                                <li><a href="/" @click.prevent="goto('/shopping-cart')">Your favourite items</a></li>
                            </ul>
                        </li>
                        <li :class="`${page === 'help'? 'active':''}`"><a href="#">Help</a>
                            <ul class="header__menu__dropdown">
                                <li><a href="/help?how-to=place-an-order" @click.prevent="goto('/help/how-to=place-an-order')">How to place an order</a></li>
                                <li><a href="/help?how-to=refund-request" @click.prevent="goto('/help/how-to=refund-request')">How to request for a refund</a></li>
                                <li><a href="/help?how-to=order-cancellation" @click.prevent="goto('/help/how-to=order-cancellation')">How to cancel your order</a></li>
                                <li><a href="/help?how-to=order-tracking" @click.prevent="goto('/help/how-to=order-tracking')">How to track your order</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="col-lg-3">
                <div class="header__cart">
                    <template v-if="!$store.state.isMobile">
                        <ul>
                            <li>
                                <a href="/shopping-cart" @click.prevent="goto('/shopping-cart')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-bag-heart-fill" viewBox="0 0 16 16">
                                    <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
                                    </svg>
                                    <span>{{ $store.state.wishlist.length }}</span>
                                </a>
                            </li>
                            <li>
                                <a href="/shopping-cart" @click.prevent="goto('/shopping-cart')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-cart4" viewBox="0 0 16 16">
                                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                                    </svg>
                                    <span>{{ $store.state.itemsInCat.length }}</span>
                                </a>
                            </li>
                        </ul>
                    </template>
                </div>
            </div>
        </div>
        <div class="humberger__open" @click="open_menu">
            <i class="fa fa-bars"></i>
        </div>
    </div>
</template>

<script>


import logo from "../../assets/logo.png"

import helpers from "../../mixins/helpers.js";

export default {
    props: ['page'],

    mixins:[helpers],
    data(){
        return {
            logo:logo,
        }
    },
    methods: {
        open_menu(){
            $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
            $(".humberger__menu__overlay").addClass("active");
            $("body").addClass("over_hid");
        },
    }
}


</script>
