<template>

    <header-level-one :page="`home`">
        <template #header-level-two>
            <header-level-two page="home"/>
        </template>
    </header-level-one>

    <header-level-three :dont-show-cat-list="false">
        <div class="banner__slider owl-carousel">
            <template v-for="(banner,index) in banners" :key="index">
                <div @click.prevent="explore()" class="hero__item set-custom-bg" :data-setbg="banner.promo" :class="$store.state.isMobile? 'mt-4':''" :style="$store.state.isMobile? 'margin-bottom:-10rem':''">
                    <!--            <div class="hero__text card p-4 text-center">-->
                    <!--                <span>High Quality</span>-->
                    <!--                <h2>Electronics</h2>-->
                    <!--&lt;!&ndash;                <p>With pay on delivery</p>&ndash;&gt;-->
                    <!--                <Link href="/shop" class="primary-btn">SHOP NOW</Link>-->
                    <!--            </div>-->
                </div>
            </template>
        </div>
    </header-level-three>

    <div :style="$store.state.isMobile? 'margin-top:-4rem;':'margin-top:2rem;'" >
        <categories />
    </div>

    <!--    <featured />-->
    <template v-if="$store.state.featured_items.length > 0">
        <!-- Featured Section Begin -->
        <section class="featured spad" :style="$store.state.isMobile? 'margin-top:-8rem;':''">
            <div v-for="(item,index) in $store.state.featured_items" :key="index">
                <category-highlight :category="item.category" :discount="item.highest_discount" :products="item.products"/>
            </div>
        </section>
    </template>
    <template v-else>
        <div class="row m-4">
            <div class="col-12">

            </div>
        </div>
    </template>

    <!--    <large-banner />-->

    <div class="mb-4"></div>
    <!--    <l-t-r-items />-->

    <footer-item />


</template>

<script>


import Categories from "../../components/widgets/CategoriesWg.vue"
import CategoryHighlight from "../../components/widgets/CategoryHighlightWg.vue";

import HeaderLevelOne from "../../components/layouts/HeaderLevelOne.vue";
import HeaderLevelTwo from "../../components/layouts/HeaderLevelTwo.vue"
import HeaderLevelThree from "../../components/layouts/HeaderLevelThree.vue"

import FooterItem from "../../components/layouts/FooterItem.vue";

import promo1 from "../../assets/banner/promo-1.jpg"
import promo2 from "../../assets/banner/promo-2.jpg"
import promo3 from "../../assets/banner/promo-3.jpg"
import promo4 from "../../assets/banner/promo-4.jpg"
import promo5 from "../../assets/banner/promo-5.jpg"

import request from "../../mixins/request.js";
import config from "../../mixins/config.js";
import helpers from "../../mixins/helpers.js";


export default {
    mixins: [request,helpers],
    components:{
        Categories,

        HeaderLevelOne,
        HeaderLevelTwo,
        HeaderLevelThree,

        FooterItem,


        CategoryHighlight
    },
    data(){
        return {
            banners:[
                {
                    'promo': promo1,
                },
                {
                    'promo': promo2,
                },
                {
                    'promo': promo3,
                },
                {
                    'promo':promo4,
                },
                {
                    'promo': promo5,
                }
            ],
        }
    },
    mounted() {

        this.fetchItems()

        $('.set-custom-bg').each(function () {
            const bg = $(this).data('setbg');
            $(this).css('background-image', 'url(' + bg + ')');
        });

        this.initiateBannerSlider()
    },
    methods: {
        async fetchItems() {
            await this.makeGetRequest(`${config.admin_url}/api/home`,
                (response) => {
                    this.$store.commit('setLatestItems', response.data.latest);
                    this.$store.commit('setFeaturedItems', response.data.featured);
                    this.$store.commit('setTopRatedItems', response.data.top_rated);
                }
            )

        },

        initiateBannerSlider(){
            /*-----------------------
                Categories Slider
            ------------------------*/
            $(".banner__slider").owlCarousel({
                loop: true,
                margin: 0,
                items: 1,
                dots: false,
                nav: false,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                smartSpeed: 2000,
                autoHeight: false,
                autoplay: true,
            })
        },

        explore(){
           this.goto('/products/explore');
        },

    },

}

</script>


