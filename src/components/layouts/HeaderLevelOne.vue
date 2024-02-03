<template>
    <!-- Humberger Begin -->
    <div class="humberger__menu__overlay" @click="close_menu"></div>
    <div class="humberger__menu__wrapper">
        <div class="humberger__menu__logo text-center">
            <a href="/" @click.prevent="goto('/')"><img :src="logo" alt="logo" style="width: 60px;"></a>
        </div>
        <div class="humberger__menu__cart text-center">
<!--            <ul>-->
<!--                <li class="pr-4"><a href="/shopping-cart"><i class="fa fa-heart"></i> <span>{{ $store.state.wishlist.length }}</span></a></li>-->
<!--                <li><a href="/shopping-cart"><i class="fa fa-shopping-cart"></i> <span>{{ $store.state.itemsInCat.length }}</span></a></li>-->
<!--            </ul>-->
        </div>
        <div class="humberger__menu__widget">
            <div class="header__top__right__language">
                <img :src="language" alt="">
                <div>English</div>
                <span class="arrow_carrot-down"></span>
                <ul>
                    <li><a href="#">Ateso</a></li>
                    <li><a href="#">English</a></li>
                </ul>
            </div>
            <div class="header__top__right__auth">
                <template v-if="!$store.state.loggedInUser">
                    <a href="/auth/login#login"><i class="fa fa-user"></i> Login/Register</a>
                </template>
                <template v-else>
                    <a href="" @click.prevent="logout()">{{ $store.state.loggedInUser.user.name.substring(0,15) }}...</a>
                </template>
            </div>
        </div>
        <nav class="humberger__menu__nav mobile-menu">
            <ul>
                <li :class="`${page === 'home'? 'active':''}`"><a href="/" @click.prevent="goto('/')">Home</a></li>
                <li :class="`${page === 'shop'? 'active':''}`"><a href="/products/explore" @click.prevent="goto('/products/explore')">Explore</a></li>
                <li :class="`${page === 'account'? 'active':''}`"><a href="#"><b>Your Account</b></a>
                    <ul class="header__menu__dropdown">
                        <li><a href="/shopping-cart" @click.prevent="goto('/shopping-cart')">Orders</a></li>
                        <li><a href="/shopping-cart" @click.prevent="goto('/shopping-cart')">Shopping Cart</a></li>
                        <li><a href="/shopping-cart" @click.prevent="goto('/shopping-cart')">Your favourite items</a></li>
                    </ul>
                </li>
                <li :class="`${page === 'help'? 'active':''}`"><a href="#"><b>Help</b></a>
                    <ul class="header__menu__dropdown">
                        <li><a href="/help?how-to=place-an-order" @click.prevent="goto('/help/how-to=place-an-order')">How to place an order</a></li>
                        <li><a href="/help?how-to=refund-request" @click.prevent="goto('/help/how-to=refund-request')">How to request for a refund</a></li>
                        <li><a href="/help?how-to=order-cancellation" @click.prevent="goto('/help/how-to=order-cancellation')">How to cancel your order</a></li>
                        <li><a href="/help?how-to=order-tracking" @click.prevent="goto('/help/how-to=order-tracking')">How to track your order</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
        <div id="mobile-menu-wrap"></div>

        <div class="humberger__menu__contact text-center">
            <ul>
                <li><i class="fa fa-envelope"></i>{{ $store.state.support.email}}</li>
            </ul>
            <div class="hero__search__phone">
                <div class="hero__search__phone__icon">
                    <i class="fa fa-phone"></i>
                </div>
                <div class="hero__search__phone__text">
                    <h5>{{ $store.state.support.phone }}</h5>
                    <span>support 24/7 time</span>
                </div>
            </div>
        </div>

    </div>
    <!-- Humberger End -->

    <!-- Header Section Begin -->
    <header class="header">
        <div class="header__top">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-6">
                        <div class="header__top__left">
                            <ul>
                                <li><i class="fa fa-envelope"></i> {{ $store.state.support.email }}</li>
                                <li class="text-success">
                                    Follow us on <a :href="$store.state.support.facebook"><i class="fa fa-facebook"></i>acebook</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <div class="header__top__right">
<!--                            <div class="header__top__right__social">-->
<!--                                <div class="position-relative">-->
<!--                                    <a href="#" class="mr-3">-->
<!--                                        <i class="fa fa-heart text-danger"></i>-->
<!--                                        <span class="position-absolute top-0 end-0 badge rounded-pill bg-light text-dark">1</span>-->
<!--                                    </a>-->
<!--                                    <a href="#">-->
<!--                                        <i class="fa fa-shopping-bag text-success"></i>-->
<!--                                        <span class="position-absolute top-0 end-0 badge rounded-pill bg-light text-dark">3</span>-->
<!--                                    </a>-->
<!--                                </div>-->
<!--                            </div>-->
                            <div class="header__top__right__language">
                                <img :src="language" alt="">
                                <div>English</div>
                                <span class="arrow_carrot-down"></span>
                                <ul>
                                    <li><a href="#">Ateso</a></li>
                                    <li><a href="#">English</a></li>
                                </ul>
                            </div>
                            <div class="header__top__right__auth">
                                <template v-if="!$store.state.loggedInUser">
                                    <a href="/auth/login#login"><i class="fa fa-user"></i> Login/Register</a>
                                </template>
                                <template v-else>
                                    <a href="" @click.prevent="logout()">Hello, {{ $store.state.loggedInUser.user.name.substring(0,10) }}...</a>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <slot name="header-level-two"></slot>
    </header>
    <!-- Header Section End -->
</template>


<script>

import 'slicknav/dist/slicknav.css';
import 'slicknav/dist/jquery.slicknav.min.js';
import logo from "../../assets/logo.png"
import language from "../../assets/language.png"

import notify from "../../mixins/notify.js";
import helpers from "../../mixins/helpers.js";
import axios from "axios";
import config from "@/mixins/config";
import request from '@/mixins/request';

export default {
    props:['page'],
    data(){
        return {
            logo:logo,
            language:language,
        }
    },
    mixins: [notify,helpers,config,request],

    mounted() {
        this.mobileMenu();
        this.$store.dispatch('setLoggedInUser');
        this.$store.dispatch('setCartAndWishListItems');
    },

    methods: {
        close_menu(){
            $(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
            $(".humberger__menu__overlay").removeClass("active");
            $("body").removeClass("over_hid");
        },

        mobileMenu() {

            $(".mobile-menu").slicknav({
                prependTo: '#mobile-menu-wrap',
                allowParentLinks: false,
                showChildren:true,
            });
        },

        logout(){
            this.showWarningMessage("Proceeding will log you out of the app, sure to proceed?").then((result) => {
                if(result.isConfirmed){
                    this.makePostRequest(`${config.admin_url}/api/client/logout`,{},
                    () => {
                        localStorage.clear();
                        this.$store.dispatch('setLoggedInUser');
                        this.$router.go();
                    })
                    
                }
            })
        },
    }
}

</script>
