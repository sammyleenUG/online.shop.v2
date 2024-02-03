<template>
    <!-- Banner Begin -->
    <div class="banner">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="banner__pic">
                        <img :src="banner1" alt="">
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="banner__pic">
                        <img :src="banner2" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Banner End -->
</template>


<script setup>

import banner1 from "../../assets/banner/banner-1.jpg"
import banner2 from "../../assets/banner/banner-2.jpg"

</script>
