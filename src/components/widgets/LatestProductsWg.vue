<template>
    <div class="latest-product__slider owl-carousel">
        <div class="latest-prdouct__slider__item">
            <a :href="formatUrl(item)" @click.prevent="goto(formatUrl(item))" class="latest-product__item" v-for="(item,index) in $store.state.latest_items.slice(0,3)" :key="index">
                <div class="latest-product__item__pic bg-light" style="width: 30%;">
                    <img :src="item.product_pictures[0].full_image_path" alt="">
                </div>
                <div class="latest-product__item__text">
                    <h6>{{  item.name }}</h6>
                    <span>{{ moneyFormat(item.discounted_price) }}</span>
                </div>
            </a>
        </div>
        <div class="latest-prdouct__slider__item">
            <Link :href="formatUrl(item)" @click.prevent="goto(formatUrl(item))" class="latest-product__item" v-for="(item,index) in $store.state.latest_items.slice(3,6)" :key="index">
                <div class="latest-product__item__pic bg-light" style="width: 30%;">
                    <img :src="item.product_pictures[0].full_image_path" alt="">
                </div>
                <div class="latest-product__item__text">
                    <h6>{{  item.name }}</h6>
                    <span>{{ moneyFormat(item.discounted_price) }}</span>
                </div>
            </Link>
        </div>
    </div>
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
                autoplay: true,
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
