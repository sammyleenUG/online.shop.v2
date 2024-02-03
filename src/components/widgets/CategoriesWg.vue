<template>
    <!-- Categories Section Begin -->
    <section class="categories">
        <div class="container">
            <div class="row">
                <div class="categories__slider owl-carousel">
                    <div class="col-lg-3" v-for="(category,index) in $store.state.categories" :key="index">
                        <div class="categories__item set-custom-bg" :data-setbg="category.img">
                            <h5><a :href="`/products/explore/${category.link}`" @click.prevent="goto(`/products/explore/${category.link}`)" :style="$store.state.isMobile? 'font-size:0.6rem;margin-top:-8rem;':''">{{ category.name }}</a></h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>


<script>

import helpers from '@/mixins/helpers';


export default {
    mixins:[helpers],

    mounted(){
        this.setBG();
        this.initiateCategoriesSlider();
    },

    methods:{
        setBG(){
            $('.set-custom-bg').each(function () {
                var bg = $(this).data('setbg');
                $(this).css('background-image', 'url(' + bg + ')');
            });
        },

        initiateCategoriesSlider(){
            /*-----------------------
                Categories Slider
            ------------------------*/
            $(".categories__slider").owlCarousel({
                loop: true,
                margin: 0,
                items: 4,
                dots: false,
                nav: !this.$store.state.isMobile,
                navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                smartSpeed: 1200,
                autoHeight: false,
                autoplay: true,
                responsive: {

                    0: {
                        items: 3,
                    },

                    480: {
                        items: 3,
                    },

                    768: {
                        items: 3,
                    },

                    992: {
                        items: 4,
                    }
                }
            })
        }
    }
}

</script>
