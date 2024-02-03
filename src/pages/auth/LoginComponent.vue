<template>
    
    <header-level-one :page="`Login`">
        <template #header-level-two>
            <header-level-two page="login"/>
        </template>
    </header-level-one>

    <header-level-three :dont-show-cat-list="true"></header-level-three>

<!--    <bread-crumb :title="`Login`" :bg-img="berries"/>-->
    <!-- Contact Form Begin -->
    <div class="contact-form spad" id="login">
        <div class="container">
            <div class="row">
                <div :class="$store.state.isMobile? 'col-md-12 m-3':'col-4 offset-4'" class="bg-light p-4">
                    <div class="contact__form__title">
                        <h2>Login</h2>
                        <p>To save your purchases and make shopping easier, please log in 😊</p>
                    </div>

                    <form @submit.prevent="login()" id="auth-form">
                        <div class="col-md-12">
                            <input type="text" name="email" placeholder="Your Email" required :value="$store.state.loggedInUser? $store.state.loggedInUser.user.email : ''">
                        </div>
                        <div class="col-md-12">
                            <input type="password" name="password" placeholder="Your Password" required>
                        </div>
                        <div class="col-md-12" style="margin-top:-1rem;">
                            <div class="row">
                                <div class="col-6">
                                    <p><a href="#">Forgot password?</a></p>
                                </div>
                                <div class="col-6 text-right">
                                    <p><a href="/auth/register" @click.prevent="goto('/auth/register')">Create An Account</a></p>
                                </div>
                            </div>
                        </div>
                        <div class="text-center col-md-12" >
                            <button type="submit" class="site-btn w-100">LOGIN</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
<!--        &lt;!&ndash; Contact Form End &ndash;&gt;-->
<!--    <related-products v-if="$store.state.selected_product"/>-->
<!--    &lt;!&ndash; products Section End &ndash;&gt;-->
    <footer-item />

</template>

<script>

import HeaderLevelOne from "../../components/layouts/HeaderLevelOne.vue";
import HeaderLevelTwo from "../../components/layouts/HeaderLevelTwo.vue"
import HeaderLevelThree from "../../components/layouts/HeaderLevelThree.vue"

import cathelper from "../../mixins/cathelper.js";
import helpers from "../../mixins/helpers.js";


import FooterItem from "../../components/layouts/FooterItem.vue";

import request from "../../mixins/request.js";
import config from "@/mixins/config";


export default {
    data() {
        return {

        };
    },

    props: ['product_id'],
    components: {

        FooterItem,

        HeaderLevelOne,
        HeaderLevelTwo,
        HeaderLevelThree,

    },
    mixins: [cathelper,helpers,request],
    methods: {
        login(){
            let form = document.getElementById('auth-form');
            let formData = new FormData(form);

            this.makePostRequest(`${config.admin_url}/api/client/login`,formData,
                (response) => {
                    if(!response.data.errors){
                        this.showSuccessMessage(response.data.message);

                        localStorage.setItem('auth',JSON.stringify({
                                user: response.data.user,
                                token: response.data.token,
                            })
                        )

                        this.$store.dispatch("setLoggedInUser");

                        this.goto('/products/explore');

                    }else{
                        this.showErrorMessage(response.data.errors)
                    }
                }
            )
        }
    },

    async mounted() {

    },

};

</script>
