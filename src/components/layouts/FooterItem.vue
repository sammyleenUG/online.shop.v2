<template>
    <footer class="footer spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="footer__about">
                        <div class="footer__about__logo">
                            <a href="/" ><img :src="logo" style="width:100px;" alt=""></a>
                        </div>
                        <ul>
                            <li>Phone: {{ $store.state.support.phone }}</li>
                            <li>Email: {{ $store.state.support.email }}</li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
                    <div class="footer__widget">
                        <h6>Useful as</h6>
                        <ul>
                            <li><a href="/">Secure Shopping</a></li>
                            <li><a href="/">Delivery information</a></li>
                            <li><a href="/">Privacy Policy</a></li>
                        </ul>
                        <h6>Make money with us</h6>
                        <ul>
                            <li><a href="#">Become a member</a></li>
                            <li><a href="#">Become an affiliate</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-4 col-md-12">
                    <div class="footer__widget">
                        <h6>Join Our Newsletter Now</h6>
                        <p>Get E-mail updates about our latest shop and special offers.</p>
                        <form action="#">
                            <input type="text" placeholder="Enter your mail">
                            <button type="submit" class="site-btn">Subscribe</button>
                        </form>
                        <div class="footer__widget__social">
                            Follow us on <a :href="$store.state.support.facebook" target="_blank"><i class="fa fa-facebook"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="footer__copyright">
                        <div class="footer__copyright__text">
                            <p>Copyright &copy;{{ state.currentYear }} All rights reserved</p>
                        </div>
                        <div class="footer__copyright__payment"><img src="" alt=""></div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import logo from "../../assets/logo.png"
import {reactive} from "vue";

const state = reactive({
    currentYear: new Date().getFullYear(),
})


</script>
