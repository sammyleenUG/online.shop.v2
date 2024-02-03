<template>

    <header-level-one :page="`shop`">
        <template #header-level-two>
            <header-level-two page="shop"/>
        </template>
    </header-level-one>

    <header-level-three :dont-show-cat-list="true"></header-level-three>

    <bread-crumb :title="title_text" :bg-img="berries"/>


    <!-- products Section Begin -->
    <section class="product spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-5">
                    <div class="sidebar">
                        <div class="sidebar__item" v-if="!$store.state.isMobile">
                            <h4>Categories</h4>
                            <ul>
                                <li v-for="category in $store.state.categories" :key="category.id">
                                    <a :href="`/products/explore/${category.link}`" @click.prevent="goto(`/products/explore/${category.link}`)">{{ category.name }}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="sidebar__item" v-if="!$store.state.isMobile">
                            <h4>Price</h4>
                            <price-ranger></price-ranger>
                        </div>

                        <div class="sidebar__item">
                            <div class="latest-product__text">
                                <h4>Latest Products</h4>
                                <latest-products v-if="$store.state.latest_items"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9 col-md-7">
                    <div class="product__discount" v-if="$store.state.sale_off_items && $store.state.sale_off_items.length > 3">
                        <div class="section-title product__discount__title">
                            <h2>Sale Off</h2>
                        </div>
                        <div class="row">
                            <discounted-products />
                        </div>
                    </div>
                    <template v-if="$store.state.explore_items && loaded">
                        <items-layout :products="$store.state.explore_items"></items-layout>
                    </template>
                </div>
            </div>
        </div>
    </section>
    <!-- products Section End -->
    <footer-item />

    <!-- <template v-if="$store.state.isMobile">
        <div class="row">
            <div class="col-6">
                <div class="filter__sort">
                    <span>Filter By</span>
                    <select>
                        <option value="popularity">Popularity</option>
                        <option value="latest-arrivals">Latest Arrivals</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                    </select>
                </div>
            </div> -->
            <!-- <div class="col-6">
                <price-ranger></price-ranger>
            </div> -->
        <!-- </div>
    </template> -->

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


import config from "../../mixins/config.js";

import request from "../../mixins/request.js";
import helpers from "../../mixins/helpers.js";

export default {
    props: ['category'],
    data(){
        return {
            title_text: "Explore Egwelet. <br> <p>Loads of products at your finget tips",
            berries:null,
            loaded: false,
        }
    },

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

    mixins: [request,helpers],

    async mounted() {
        await this.fetchItems();
    },

    methods:{
        async fetchItems() {
            let url = `${config.admin_url}/api/explore`;

            if(this.$route.params.category){
                let category = this.$store.state.categories.find(category => category.link === this.$route.params.category);

                if(category){
                    this.title_text = category.name
                    url = `${config.admin_url}/api/products/` + category.name;
                }
            }


            await this.makeGetRequest(url,
                (response) => {
                    this.$store.commit('setSaleOffItems', response.data.sale_off);
                    this.$store.commit('setExploreItems', response.data.explore);
                    this.$store.commit('setLatestItems', response.data.latest);
                    this.loaded = true;
                }
            )

        }
    },

    watch: {
        '$route.params.category': {
            handler(newVal, oldVal) {
                this.$router.go();
            },
        }
    }


}



</script>
