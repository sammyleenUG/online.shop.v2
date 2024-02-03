<template>
    <!-- Latest products Section Begin -->
    <section class="latest-product spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-6" v-for="some_item in $store.state.itemsUnderType">
                    <div class="latest-product__text">
                        <h4>{{ some_item.title }}</h4>
                        <div class="latest-product__slider owl-carousel">
                            <div class="latest-prdouct__slider__item" v-for="single_item in some_item.item">
                                <Link :href="formatUrl(single_item)" @click.prevent="goto(formatUrl(single_item))" class="latest-product__item">
                                    <div class="latest-product__item__pic">
                                        <img :src="single_item.product_pictures[0].full_image_path" alt="">
                                    </div>
                                    <div class="latest-product__item__text">
                                        <h6>{{ single_item.name }}</h6>
                                        <div class="d-flex">
                                            <div class="mr-2">{{ moneyFormat(single_item.discounted_price) }}</div>
<!--                                            <div class="text-muted" style="text-decoration: line-through">{{ moneyFormat(single_item.original_price) }}</div>-->
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Latest products Section End -->
</template>

<script>

import cathelper from "../../mixins/cathelper.js";
import helpers from "../../mixins/helpers.js";



export default {
    data() {
        return {
            // Your data properties here
        };
    },

    mixins: [cathelper,helpers],
    methods: {
        initiateLatestProductsSlider(){
            /*--------------------------
              Latest products Slider
          ----------------------------*/
            $(".latest-product__slider").owlCarousel({
                loop: true,
                margin: 0,
                items: 1,
                dots: false,
                nav: true,
                navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
                smartSpeed: 1200,
                autoHeight: false,
                autoplay: true
            });
        },
    },

    mounted() {
        this.initiateLatestProductsSlider();
    }
};


</script>

<style scoped>

</style>
