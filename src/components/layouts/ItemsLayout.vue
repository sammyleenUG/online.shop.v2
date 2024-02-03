<template>
    <div class="filter__item">
        <div class="row">
            <div class="col-lg-4 col-md-5">
                <div class="filter__sort">
                    <span>Sort By</span>
                    <select>
                        <option value="popularity">Popularity</option>
                        <option value="latest-arrivals">Latest Arrivals</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                    </select>
                </div>
            </div>
            <div class="col-lg-4 col-md-4">
                <div class="filter__found">
                    <h6><span>{{ products.length }}</span> Products found</h6>
                </div>
            </div>
            <div class="col-lg-4 col-md-3">
                <div class="filter__option">
                    <span class="icon_grid-2x2"></span>
                    <span class="icon_ul"></span>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div :class="$store.state.isMobile? `col-6`:`col-md-4 col-sm-6 col-lg-3`" v-for="(item,index) in products" :key="index">
            <div class="product__item">
                <div class="product__item__pic set-bg bg-light" :data-setbg="item.product_pictures[0].full_image_path" :class="$store.state.isMobile? 'mobileImage':''">
                    <ul class="product__item__pic__hover">
                        <li :class="`wish_${index}`"><a href="#" @click.prevent="updateWishList(item,index)"><i :class="`fa fa-heart wish_icon_${index}`"></i></a></li>
                        <li :class="`cat_${index}`"><a href="#" @click.prevent="updateCat(item,index)"><i :class="`fa fa-shopping-cart cat_icon_${index}`"></i></a></li>
                    </ul>
                </div>
                <div class="product__item__text">
                    <h6><a :href="formatUrl(item)" @click.prevent="goto(formatUrl(item))">{{ item.name }}</a></h6>
                    <h5>{{ moneyFormat(item.discounted_price) }}
<!--                        <span class="text-muted" style="text-decoration: line-through">{{ moneyFormat(item.original_price)}}</span>-->
                    </h5>
                </div>
            </div>
        </div>
    </div>
    <div class="product__pagination">
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#"><i class="fa fa-long-arrow-right"></i></a>
    </div>
</template>

<script>


import cathelper from "../../mixins/cathelper.js";
import helpers from "../../mixins/helpers.js";

export default {
    props: ['products'],
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
        initiateNiceSelect(){
            $("select").niceSelect();
        },
    },

    mounted() {
        this.setBG();
        this.initiateNiceSelect();
    },

    watch: {
        products: function() {
            this.setBG();
            this.initiateNiceSelect();
        },
    },
};

</script>
