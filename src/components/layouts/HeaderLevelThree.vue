<template>
    <section :class="`hero ${dontShowCatList || $store.state.isMobile? 'hero-normal':''}`" style="margin-top: -10px;">
        <div class="container">
            <div class="row">
                <div class="col-lg-3">
                    <div class="hero__categories">
                        <div class="hero__categories__all" >
                            <i class="fa fa-bars"></i>
                            <span>Categories</span>
                        </div>
                        <ul>
                            <li v-for="(category,index) in $store.state.categories" :key="index" :class="(index === ($store.state.categories.length - 1))? 'mb-5':''">
                                <a :href="`/products/explore/${category.link}`" @click.prevent="goto(`/products/explore/${category.link}`)" class="text-left">
                                    <div class="row">
                                        <div class="col-2 text-center"> <i :class="category.icon"></i></div>
                                        <div class="col-10" style="margin-left:-13px;">{{ category.name }}</div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-9">
                    <div class="hero__search">
                        <template v-if="$store.state.isMobile">
                            <div class="hero__search__form">
                                <form @submit.prevent="searchProduct()" >
                                    <div style="display: flex; align-items: first;">
                                        <span style="cursor: pointer;padding:0.4rem;margin-left: 10px;" @click.prevent="handleIconClick()">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="orange" class="bi bi-camera" viewBox="0 0 24 24">
                                                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z"/>
                                                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                                            </svg>
                                        </span>
                                        <input type="text" v-model="search_query" placeholder="Search for products" required>
                                        <button type="submit" class="site-btn"> <i class="fa fa-search"></i></button>
                                    </div>
                                </form>
                            </div>
                        </template>
                        <template v-else>
                            <div class="hero__search__form">
                                <form @submit.prevent="searchProduct()" >
                                    <div style="display: flex; align-items: center;">
                                        <i class="fa fa-search" style="margin-left: 10px;"></i>
                                        <input type="text" v-model="search_query" placeholder="Search for products" required>
                                        <button type="submit" class="site-btn">SEARCH</button>
                                    </div>
                                </form>
                            </div>
                        </template>
                        <div class="hero__search__phone">
                            <div class="hero__search__phone__icon">
                                <i class="fa fa-phone"></i>
                            </div>
                            <div class="hero__search__phone__text" >
                                <h5>{{ $store.state.support.phone }}</h5>
                                <span>support 24/7 time</span>
                            </div>
                        </div>
                    </div>
                    <slot></slot>
                </div>
            </div>
        </div>
    </section>
</template>


<script>

import notify from "../../mixins/notify.js";
import helpers from "../../mixins/helpers.js";
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

export default {
    props: ['dontShowCatList','q'],

    mixins:[notify,helpers],

    data(){
        return {
            search_query: this.q || null,
        }
    },

    async mounted() {
        this.listenToCategoryMenuClick();
        window.addEventListener('resize', this.updateScreenSize);
    },

    methods: {
        listenToCategoryMenuClick(){
            $('.hero__categories__all').on('click', function(){
                $('.hero__categories ul').slideToggle(400);
            });
        },

        updateScreenSize() {
            this.$store.state.isMobile = window.innerWidth < 768;
        },

        searchProduct(){
            return window.location.href = `/products/search/q/${this.search_query}`
        },

        handleIconClick() {
            // Check if the user is on a laptop/desktop or a mobile device
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*'; // Allow only image files

            if(this.$store.state.isMobile)
                fileInput.capture = 'camera'

            fileInput.addEventListener('change', async (event) => {

                this.createBlur();


                const file = event.target.files[0];

                try {
                    const predictions = await this.loadAndPredict(file);

                    if(predictions){
                        const namesArray = predictions.map(item => item.class);
                        this.search_query = namesArray.join(',');
                        // return router.get(`/search?q=${namesArray.join(',')}`);
                    }else{
                        this.showErrorMessage("Failed to read image!")
                    }
                } catch (error) {
                    console.error('Error during object detection:', error);
                    this.showErrorMessage("Can't process image right now!")
                }finally {
                    this.destroyBlur();
                }

                // Handle the selected file
                // const selectedFile = event.target.files[0];
                //
                // let formData = new FormData()
                // formData.append('image',selectedFile,'image')
                //
                // axios.post(`${config.ai_platform_url}/api/visual-search`,formData).then((result) => {
                //     let predictions = JSON.parse(result.data.found);
                //
                //     this.destroyBlur();
                //
                //     if(predictions.length > 0){
                //         const namesArray = predictions.map(item => item.name);
                //         return router.get(`/search?q=${namesArray.join(',')}`);
                //     }else{
                //         this.showErrorMessage("Failed to read image!")
                //     }
                // });

            });

            // Trigger a click event on the file input
            fileInput.click();
        },


        async loadAndPredict(file) {
            // Load the model
            const model = await cocoSsd.load();

            let predictions = null

            // Load the image and perform object detection
            await this.loadImage(file).then(async (image) => {
                predictions =  await model.detect(image);
            });


            return predictions;
        },


        loadImage(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = (event) => {
                    const image = new Image();
                    image.onload = () => resolve(tf.browser.fromPixels(image));
                    image.onerror = (error) => reject(error);
                    image.src = event.target.result;
                };

                reader.readAsDataURL(file);
            });
        },


        // Function to check if the user is on a mobile device
        isMobileDevice() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
    },

    created() {
        this.updateScreenSize();
    },

    beforeUnmount() {
        // Remove the window resize event listener to prevent memory leaks
        window.removeEventListener('resize', this.updateScreenSize);
    },


}

</script>
