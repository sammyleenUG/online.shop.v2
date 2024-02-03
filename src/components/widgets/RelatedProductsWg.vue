<template>
    <!-- Related products Section Begin -->
    <section class="related-product">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-title related__product__title">
                        <h2>Related Product</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <template v-if="products.length > 0">
                    <div class="col-12 col-lg-3 col-md-4 col-sm-6" v-for="(item,index) in products.slice(0,3)" :key="index">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" :data-setbg="item.product_pictures[0].full_image_path">
                                <ul class="product__item__pic__hover">
                                    <li :class="`wish_${index}`"><a href="#" @click.prevent="updateWishList(item,index)"><i :class="`fa fa-heart wish_icon_${index}`"></i></a></li>
                                    <li :class="`cat_${index}`"><a href="#" @click.prevent="updateCat(item,index)"><i :class="`fa fa-shopping-cart cat_icon_${index}`"></i></a></li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6><a :href="formatUrl(item)" @click.prevent="goto(formatUrl(item))">{{ item.name }}</a></h6>
                                <h5>{{ moneyFormat(item.original_price) }}</h5>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="col-12 text-center">
                        <p>No products found!</p>
                    </div>
                </template>
            </div>
        </div>
    </section>
    <!-- Related products Section End -->
</template>

<script>

import cathelper from "../../mixins/cathelper.js";
import helpers from "../../mixins/helpers.js";
import request from "../../mixins/request.js";
import config from "../../mixins/config.js";

export default {
    data() {
        return {
            // Your data properties here
            products: [],
        };
    },

    mixins: [cathelper,helpers,request],
    methods: {
        setBG() {
            // Your setBg logic here
            $('.set-bg').each(function () {
                var bg = $(this).data('setbg');
                console.log(bg)
                $(this).css('background-image', 'url(' + bg + ')');
            });
        },
        initiateNiceSelect(){
            $("select").niceSelect();
        },

        async getRelatedProducts() {
            await this.makeGetRequest(`${config.admin_url}/api/products/${this.$store.state.selected_product.category.toLowerCase()}`,
                (response) => {
                    this.products = response.data.explore.filter((item) => {
                        return item.id !== this.$store.state.selected_product.id
                    })
                },
                () => {

                }
            )
        }
    },

    async mounted() {
        await this.getRelatedProducts()
        this.setBG();
        this.initiateNiceSelect();
    }
};
</script>
