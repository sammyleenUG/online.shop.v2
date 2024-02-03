<template>
    <!-- Featured Section Begin -->
    <section class="featured spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-title">
                        <h2>Featured Product</h2>
                    </div>
<!--                    <div class="featured__controls">-->
<!--                        <ul>-->
<!--                            <li class="active" data-filter="*">All</li>-->
<!--                            <li v-for="item in $store.state.items" :data-filter="`.item${item.categoryID}`">{{ item.category }}</li>-->
<!--                        </ul>-->
<!--                    </div>-->
                </div>
            </div>
            <div class="row featured__filter">
                <template v-for="(item,index) in $store.state.featured_items">
                    <div :class="$store.state.isMobile? `col-6 mix item${item.categoryID}`:`col-md-4 col-sm-6 col-lg-3 mix item${item.categoryID}`">
                            <div class="featured__item text-center">
                                <div class="featured__item__pic set-bg" :data-setbg="item.product_pictures[0].full_image_path" :class="$store.state.isMobile? 'mobileImage':''">
                                    <ul class="featured__item__pic__hover">
                                        <li :class="`wish_${index}`"><a href="#" @click.prevent="updateWishList(item,index)"><i :class="`fa fa-heart wish_icon_${index}`"></i></a></li>
                                        <li :class="`cat_${index}`"><a href="#" @click.prevent="updateCat(item,index)"><i :class="`fa fa-shopping-cart cat_icon_${index}`"></i></a></li>
                                    </ul>
                                </div>
                                <div class="featured__item__text">
                                    <h6><Link :href="formatUrl(item)" @click.prevent="goto(formatUrl(item))" >{{ item.name }}</Link></h6>
                                    <h5>{{ moneyFormat(item.discounted_price) }} <span class="text-muted" style="text-decoration: line-through">{{ moneyFormat(item.original_price) }}</span></h5>
                                </div>
                            </div>
                        </div>
                </template>
            </div>
        </div>
    </section>
    <!-- Featured Section End -->
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
        setBg() {
            // Your setBg logic here
            $('.set-bg').each(function () {
                var bg = $(this).data('setbg');
                $(this).css('background-image', 'url(' + bg + ')');
            });
        },
        initCategoriesSlider() {
            // Your Categories Slider initialization logic here
            $(".categories__slider").owlCarousel({
                loop: true,
                margin: 0,
                items: 4,
                dots: false,
                nav: true,
                navText: [
                    "<span class='fa fa-angle-left'><span/>",
                    "<span class='fa fa-angle-right'><span/>"
                ],
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                smartSpeed: 1200,
                autoHeight: false,
                autoplay: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 2
                    },
                    768: {
                        items: 3
                    },
                    992: {
                        items: 4
                    }
                }
            });
        },
    },

    mounted() {
        this.setBg();
        this.initCategoriesSlider();
    }
};
</script>
