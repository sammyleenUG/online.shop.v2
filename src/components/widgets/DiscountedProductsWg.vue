<template>
    <div class="product__discount__slider owl-carousel">
        <div class="col-lg-4" v-for="(item,index) in $store.state.sale_off_items" :key="index">
            <div class="product__discount__item">
                <div class="product__discount__item__pic set-bg bg-light"
                     :data-setbg="item.product_pictures[0].full_image_path">
                    <div class="product__discount__percent">-{{ calculateDiscount(item.original_price,item.discounted_price) }}%</div>
                    <ul class="product__item__pic__hover">
                        <li :class="`wish_${index}`"><a href="#" @click.prevent="updateWishList(item,index)"><i :class="`fa fa-heart wish_icon_${index}`"></i></a></li>
                        <li :class="`cat_${index}`"><a href="#" @click.prevent="updateCat(item,index)"><i :class="`fa fa-shopping-cart cat_icon_${index}`"></i></a></li>
                    </ul>
                </div>
                <div class="product__discount__item__text">
                    <span>{{ item.category }}</span>
                    <h5><a :href="formatUrl(item)" @click.prevent="goto(formatUrl(item))">{{ item.name }}</a></h5>
                    <div class="product__item__price">{{ moneyFormat(item.discounted_price) }}<span>{{ moneyFormat(item.original_price) }}</span></div>
                </div>
            </div>
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
        setBG() {
            // Your setBg logic here
            $('.set-bg').each(function () {
                var bg = $(this).data('setbg');
                $(this).css('background-image', 'url(' + bg + ')');
            });
        },
        initiateProductDiscountSlider(){
            /*-----------------------------
                 products Discount Slider
             -------------------------------*/
            $(".product__discount__slider").owlCarousel({
                loop: true,
                margin: 0,
                items: 3,
                dots: false,
                smartSpeed: 500,
                autoHeight: false,
                autoplay: true,
                responsive: {

                    320: {
                        items: 1,
                    },

                    480: {
                        items: 2,
                    },

                    768: {
                        items: 3,
                    },

                    992: {
                        items: 3,
                    }
                }
            });

        },
        calculateDiscount(original,discounted){
            if(original === discounted || original < discounted)
                return 0;

            return Math.round(((original - discounted)/original) * 100);
        }
    },

    mounted() {
        this.setBG();
        this.initiateProductDiscountSlider();
    }
};

</script>
