<template>
    <Head title="Shop products" />

    <header-level-one>
        <template #header-level-two>
            <header-level-two page="shop"/>
        </template>
    </header-level-one>

    <header-level-three :dont-show-cat-list="true" :q="title_text"></header-level-three>

    <template v-if="$store.state.isMobile">
        <div style="margin-top:-4rem;"></div>
    </template>
    <template v-else>
        <bread-crumb :title="`Results for: ${title_text}`" :bg-img="berries"/>
    </template>


    <!-- products Section Begin -->
    <section class="product spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-5" v-if="!$store.state.isMobile">
                    <div class="sidebar">
                        <div class="sidebar__item">
                            <h4>Categories</h4>
                            <ul>
                                <li v-for="category in $store.state.categories" :key="category.id">
                                    <a :href="`/products/explore/${category.link}`" @click.prevent="goto(`/products/explore/${category.link}`)">{{ category.name }}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="sidebar__item">
                            <h4>Price</h4>
                            <price-ranger></price-ranger>
                        </div>

                        <div class="sidebar__item" >
                            <div class="latest-product__text">
                                <h4>Latest Products</h4>
                                <latest-products v-if="$store.state.latest_items"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9 col-md-7">
                    <template v-if="!$store.state.isMobile">
                        <div class="product__discount" v-if="$store.state.sale_off_items && $store.state.sale_off_items.length > 3">
                            <div class="section-title product__discount__title">
                                <h2>Sale Off</h2>
                            </div>
                            <div class="row">
                                <discounted-products />
                            </div>
                        </div>
                    </template>

                    <template v-if="$store.state.explore_items && loaded">
                        <items-layout :products="$store.state.explore_items"></items-layout>
                    </template>
                </div>
            </div>
        </div>
    </section>
    <!-- products Section End -->
    <footer-item />

</template>

<script>


import BreadCrumb from "../../components/widgets/BreadCrumbWg.vue"
import HeaderLevelOne from "../../components/layouts/HeaderLevelOne.vue";
import HeaderLevelTwo from "../../components/layouts/HeaderLevelTwo.vue"
import HeaderLevelThree from "../../components/layouts/HeaderLevelThree.vue"
import PriceRanger from "../../components/widgets/PriceRangerWg.vue"
import LatestProducts from "../../components/widgets/LatestProductsWg.vue"
import DiscountedProducts from "../../components/widgets/DiscountedProductsWg.vue"
import ItemsLayout from "../../components/layouts/ItemsLayout.vue"


// import "../../Assets/main.js"
import FooterItem from "../../components/layouts/FooterItem.vue";


import request from "../../mixins/request.js";

import config from "../../mixins/config.js";

export default {
    props: ['search'],
    data(){
        return {
            title_text: this.search,
            berries:null,
            loaded: false,
        }
    },
    mixins:[request],

    components: {

        BreadCrumb,
        HeaderLevelOne,
        HeaderLevelTwo,
        HeaderLevelThree,
        PriceRanger,
        LatestProducts,
        DiscountedProducts,
        ItemsLayout,

        FooterItem,
    },

    async mounted() {
        await this.fetchItems();
    },

    methods:{
        async fetchItems() {

            if(!this.search){
                return this.goto('/products/explore');
            }

            await this.makeGetRequest(`${config.admin_url}/api/search/products?q=${this.search}`,
                (response) => {
                    this.$store.commit('setSaleOffItems', response.data.sale_off);
                    this.$store.commit('setExploreItems', response.data.explore);
                    this.$store.commit('setLatestItems', response.data.latest);
                    this.loaded = true;
                }
            )

        }
    }
}



</script>
