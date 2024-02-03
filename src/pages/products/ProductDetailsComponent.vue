<template>

    <header-level-one :page="`shop`">
        <template #header-level-two>
            <header-level-two page="shop"/>
        </template>
    </header-level-one>

    <header-level-three :dont-show-cat-list="true"></header-level-three>

    <template v-if="$store.state.selected_product">
        <template v-if="$store.state.isMobile">
            <div style="margin-top:-4rem;"></div>
        </template>
        <template v-else>
            <bread-crumb :title="$store.state.selected_product.name" :bg-img="berries"/>
        </template>
        <!-- products Details Section Begin -->
        <section class="product-details spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-6">
                        <div class="product__details__pic">
                            <div class="product__details__pic__item" :class="loaded? '':'loading-bg'">
                                <img class="product__details__pic__item--large"
                                     :src="$store.state.selected_product.product_pictures[0].full_image_path" alt="">
                            </div>
                            <div class="product__details__pic__slider owl-carousel">
                                <div v-for="(img,index) in $store.state.selected_product.product_pictures" :key="index" class="picture_box">
                                    <img :data-imgbigurl="img.full_image_path" :src="img.full_image_path" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6" :style="$store.state.isMobile? 'margin-top: -5rem':''">
                        <div class="product__details__text">
                            <h3>{{ $store.state.selected_product.name }}</h3>
                            <div class="product__details__rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star-half-o"></i>
<!--                                <span>(18 reviews)</span>-->
                            </div>
                            <div class="product__details__price">
                                {{ moneyFormat($store.state.selected_product.discounted_price) }}
                                <span class="text-muted" style="text-decoration: line-through">{{ moneyFormat($store.state.selected_product.original_price) }}</span>
                            </div>
<!--                            <p v-html="$store.state.selected_product.description"></p>-->
                            <div class="product__details__quantity">
                                <div class="quantity">
                                    <div class="pro-qty">
                                        <input type="text" value="1">
                                    </div>
                                </div>
                            </div>
                            <a href="#" class="primary-btn" @click.prevent="updateCat($store.state.selected_product,0)">ADD TO CARD</a>
                            <a href="#" class="heart-icon" @click.prevent="updateWishList($store.state.selected_product,0)"><span class="icon_heart_alt"></span></a>
                            <ul>
                                <li><b>Availability</b> <span>{{ $store.state.selected_product.in_stock > 0? 'In stock':'Out of stock' }}</span></li>
                                <li><b>Delivery</b> <span>0 - 3 days. <samp></samp></span></li>
                                <li><b>Share on</b>
                                    <div class="share">
                                        <a :href="`https://www.facebook.com/sharer/sharer.php?u=${shareUrl($store.state.selected_product)}`" target="_blank" rel="noopener noreferrer"><i class="fa fa-facebook"></i></a>

                                        <a :href="`https://twitter.com/intent/tweet?url=${shareUrl($store.state.selected_product)}`" target="_blank" rel="noopener noreferrer"><i class="fa fa-twitter"></i></a>

                                        <a :href="`https://api.whatsapp.com/send?text=${shareUrl($store.state.selected_product)}`" target="_blank" rel="noopener noreferrer"><i class="fa fa-whatsapp"></i></a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-12" :style="$store.state.isMobile? '':'margin-top: -10rem'">
                        <div class="product__details__tab">
                            <ul class="nav nav-tabs" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab"
                                       aria-selected="true">Description</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab"
                                       aria-selected="false">Specifications</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab"
                                       aria-selected="false">Reviews <span>(0)</span></a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane active" id="tabs-1" role="tabpanel">
                                    <div class="product__details__tab__desc">
                                        <h6>Products Description</h6>
                                        <p v-html="$store.state.selected_product.description"></p>
                                    </div>
                                </div>
                                <div class="tab-pane" id="tabs-2" role="tabpanel">
                                    <div class="product__details__tab__desc">
                                        <h6>Products Specification</h6>
                                        <template v-if="$store.state.selected_product.product_properties.length > 0">
                                            <ul class="text-muted m-2">
                                                <li class="" v-for="(property,index) in $store.state.selected_product.product_properties" :key="index">
                                                    <span v-if="property.property === 'color'">
                                                        <b>{{ property.property }}</b> : <input type="color" class="border-0" :value="property.value" disabled>
                                                    </span>
                                                    <span v-else>
                                                        <b>{{ property.property }}</b> : {{ property.value }}
                                                    </span>
                                                </li>
                                            </ul>
                                        </template>
                                        <template v-else>
                                            <p>The seller did not indicate any specifications for this product</p>
                                        </template>
                                    </div>
                                </div>
                                <div class="tab-pane" id="tabs-3" role="tabpanel">
                                    <div class="product__details__tab__desc">
                                        <h6>Products Reviews</h6>
                                        <p>This product has no reviews yet!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- products Details Section End -->
    </template>

    <related-products v-if="$store.state.selected_product"/>
    <!-- products Section End -->
    <footer-item />

</template>

<script>

import BreadCrumb from "../../components/widgets/BreadCrumbWg.vue"
import HeaderLevelOne from "../../components/layouts/HeaderLevelOne.vue";
import HeaderLevelTwo from "../../components/layouts/HeaderLevelTwo.vue"
import HeaderLevelThree from "../../components/layouts/HeaderLevelThree.vue"
import RelatedProducts from "../../components/widgets/RelatedProductsWg.vue";

import cathelper from "../../mixins/cathelper.js";
import helpers from "../../mixins/helpers.js";


import FooterItem from "../../components/layouts/FooterItem.vue";

import config from "../../mixins/config.js";
import request from "../../mixins/request.js";

export default {
    data() {
        return {
            berries:null,
            quantity: 1,

            loaded: false,
        };
    },

    props: ['product_id'],
    components: {

        RelatedProducts,
        FooterItem,

        HeaderLevelOne,
        HeaderLevelTwo,
        HeaderLevelThree,
        BreadCrumb,
    },
    mixins: [cathelper,helpers,request],
    methods: {
        initiateExtraImgSlider(){
            /*------------------
            Single products
        --------------------*/
            $('.product__details__pic__slider img').on('click', function () {

                var imgurl = $(this).data('imgbigurl');
                var bigImg = $('.product__details__pic__item--large').attr('src');
                if (imgurl != bigImg) {
                    $('.product__details__pic__item--large').attr({
                        src: imgurl
                    });
                }
            });

            /*---------------------------------
               products Details Pic Slider
           ----------------------------------*/
            $(".product__details__pic__slider").owlCarousel({
                loop: false,
                margin: 20,
                items: 3,
                dots: true,
                smartSpeed: 1200,
                autoHeight: false,
                autoplay: true,
                // responsive:{
                //     0:{
                //         items: 3,
                //         // Set width and height for small screens
                //         width: 200, // Set your desired width
                //         height: 400, // Set your desired height
                //     },
                //     600:{
                //         items: 4,
                //         // Set width and height for medium screens
                //         width: 400, // Set your desired width
                //         height: 400, // Set your desired height
                //     },
                //     1000:{
                //         items: 5,
                //         // Set width and height for large screens
                //         width: 400, // Set your desired width
                //         height: 400, // Set your desired height
                //     }
                // }
            });
        },

        listenToQuantityChange(){

            let app = this;
            /*-------------------
              Quantity change
          --------------------- */
            const proQty = $('.pro-qty');
            proQty.prepend('<span class="dec qtybtn">-</span>');
            proQty.append('<span class="inc qtybtn">+</span>');
            proQty.on('click', '.qtybtn', function () {
                let newVal;
                const $button = $(this);
                const oldValue = $button.parent().find('input').val();
                if ($button.hasClass('inc')) {
                    newVal = parseFloat(oldValue) + 1;
                } else {
                    // Don't allow decrementing below zero
                    if (oldValue > 0) {
                        newVal = parseFloat(oldValue) - 1;
                    } else {
                        newVal = 0;
                    }
                }

                app.$store.commit('updateSelectedProductQuantity', newVal);

                $button.parent().find('input').val(newVal);
            });
        },

        async getProductInfo(){
            await this.makeGetRequest(`${config.admin_url}/api/product/${this.$props.product_id}`,
                (response) => {
                    this.$store.commit('updateSelectedProduct', response.data.product);
                    this.loaded = true;
                    // Loop through each element with the specified class
                }
            )
        },

        shareUrl(product){
            return config.platform_url + this.formatUrl(product);
        }
    },

    async mounted() {
        await this.getProductInfo();
        this.initiateExtraImgSlider();
        this.listenToQuantityChange();
    },

    watch: {
        product_id(){
            this.$router.go();
        },
    },

    // watch: {
    //     quantity: {
    //         handler: function(newValue, oldValue) {
    //             this.$store.commit('updateSelectedProductQuantity', newValue);
    //         },
    //         immediate: true,
    //     },
    // },

};

</script>


<style scoped>
.product__details__pic__item {
    width: 100%;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}


.product__details__pic__item  .loading-bg{
    background-color: #cccccc;
}


.product__details__pic__item img.product__details__pic__item--large, .product__details__pic__slider img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.product__details__pic__slider{
    width: 200px; /* Set your desired fixed width */
    height: 200px; /* Set your desired fixed height */
}

.picture_box{

}

</style>
