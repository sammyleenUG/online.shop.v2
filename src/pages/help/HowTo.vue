<template>
    <Head title="Shop products" />

    <header-level-one :page="`shop`">
        <template #header-level-two>
            <header-level-two page="shop"/>
        </template>
    </header-level-one>

    <header-level-three :dont-show-cat-list="true"></header-level-three>

    <!--    <bread-crumb :title="`Login`" :bg-img="berries"/>-->
    <!-- Contact Form Begin -->
    <div class="contact-form spad" id="login">
        <div class="container">
            <div class="row">
                <div :class="$store.state.isMobile? 'col-md-12 m-3':'col-8 offset-2'" class="bg-light p-4">
                    <h4 class="text-center">How to place an order</h4>

                    <div class="mt-4">
                        <h6>Step 1: Sign In or Create an Account</h6>

                        <ol>
                            <li>
                                <strong>Sign In (For Existing Users):</strong>
                                <ul>
                                    <li>Visit our website and click on the "Sign In" button.</li>
                                    <li>Enter your registered email address and password.</li>
                                    <li>Click "Sign In."</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Create an Account (For New Users):</strong>
                                <ul>
                                    <li>Click on the "Sign Up" or "Create an Account" link.</li>
                                    <li>Fill in the required information, including your email address and a secure password.</li>
                                    <li>Complete the registration process.</li>
                                </ul>
                            </li>
                        </ol>

                        <h6>Step 2: Browse the Products</h6>

                        <ol>
                            <li>
                                <strong>Navigate Through Categories:</strong>
                                <ul>
                                    <li>Explore our product categories to find the items you're interested in.</li>
                                    <li>Click on a category to view the available products.</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Use the Search Bar:</strong>
                                <ul>
                                    <li>If you know exactly what you want, use the search bar to find it quickly.</li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Contact Form End -->
    <related-products v-if="$store.state.selected_product"/>
    <!-- products Section End -->
    <footer-item />

</template>

<script>


import HeaderLevelOne from "../../components/layouts/HeaderLevelOne.vue";
import HeaderLevelTwo from "../../components/layouts/HeaderLevelTwo.vue"
import HeaderLevelThree from "../../components/layouts/HeaderLevelThree.vue"
import RelatedProducts from "../../components/widgets/RelatedProductsWg.vue";

import cathelper from "../../mixins/cathelper.js";
import helpers from "../../mixins/helpers.js";


import FooterItem from "../../components/layouts/FooterItem.vue";


import request from "../../mixins/request.js";


export default {
    data() {
        return {
            berries:null,
        };
    },

    props: ['howTo'],
    components: {

        RelatedProducts,
        FooterItem,

        HeaderLevelOne,
        HeaderLevelTwo,
        HeaderLevelThree,

    },
    mixins: [cathelper,helpers,request],
    methods: {

    },

    async mounted() {

    },

};

</script>
