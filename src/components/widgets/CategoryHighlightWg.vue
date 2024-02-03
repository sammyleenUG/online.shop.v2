<template>

        <div class="container">
            <div class="row mb-3" style="background: orange;padding-top:1rem; padding-bottom: 1rem;">
                <div class="col-9">
                    <!--                    <div class="section-title">-->
                    <h6><b>{{ category }} </b><span v-if="discount > 0" class="text-white"> | Upto {{ discount}}% discount</span></h6>
                    <!--                    </div>-->
                    <!--                    <div class="featured__controls">-->
                    <!--                        <ul>-->
                    <!--                            <li class="active" data-filter="*">All</li>-->
                    <!--                            <li v-for="item in $store.state.items" :data-filter="`.item${item.categoryID}`">{{ item.category }}</li>-->
                    <!--                        </ul>-->
                    <!--                    </div>-->
                </div>
                <div class="col-3 text-right text-muted">
                    <h6 class="text-white"><a :href="`/products/explore/${findCategory().link}`" @click.prevent="goto(`/products/explore/${findCategory().link}`)">View All <i class="fa fa-arrow-right"></i></a></h6>
                </div>
            </div>
            <div class="featured__filter owl-carousel">
                <template v-for="(item,index) in products" :key="index">
<!--                    <div :class="$store.state.isMobile? `col-6 mix item${item.categoryID}`:`col-md-4 col-sm-6 col-lg-3 mix item${item.categoryID}`">-->
                        <div class="featured__item text-center">
                            <div class="featured__item__pic set-bg bg-light" :data-setbg="item.product_pictures[0].full_image_path" :class="$store.state.isMobile? 'mobileImage':''">
                                <ul class="featured__item__pic__hover">
                                    <li :class="`wish_${index}`"><a href="#" @click.prevent="updateWishList(item,index)"><i :class="`fa fa-heart wish_icon_${index}`"></i></a></li>
                                    <li :class="`cat_${index}`"><a href="#" @click.prevent="updateCat(item,index)"><i :class="`fa fa-shopping-cart cat_icon_${index}`"></i></a></li>
                                </ul>
                            </div>
                            <div class="featured__item__text">
                                <h6><a :href="formatUrl(item)" @click.prevent="goto(formatUrl(item))">{{ formatSentence(item.name,$store.state.isMobile? 13:25) }}</a></h6>
                                <h5>{{ moneyFormat(item.discounted_price) }}
<!--                                    <span class="text-muted" style="text-decoration: line-through">{{ moneyFormat(item.original_price) }}</span>-->
                                </h5>
                            </div>
                        </div>
<!--                    </div>-->
                </template>
            </div>
        </div>
    <!-- Featured Section End -->
</template>

<script>


import cathelper from "../../mixins/cathelper.js";
import helpers from "../../mixins/helpers.js";

export default {
    props:['category','discount','products'],
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

        initiateProductSlider(){
            /*-----------------------------
                 products  Slider
             -------------------------------*/
            $(".featured__filter").owlCarousel({
                loop: false,
                margin: 5,
                items: 3,
                dots: false,
                smartSpeed: 500,
                autoHeight: false,
                autoplay: false,
                responsive: {

                    320: {
                        items: 3,
                    },

                    480: {
                        items: 3,
                    },

                    768: {
                        items: 5,
                    },

                    992: {
                        items: 5,
                    }
                }
            });
        },

        findCategory() {
            return this.$store.state.categories.find((category) => category.name === this.$props.category);
        }

    },

    mounted() {
        this.setBg();
        this.initiateProductSlider();
    },

};
</script>

<style scoped>

.spad{
    margin-top: -3rem;
}
</style>
