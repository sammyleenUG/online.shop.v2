<template>
    <div class="price-range-wrap p-2">
        <div class="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
             :data-min="$store.state.min_price" :data-max="$store.state.max_price">
            <div class="ui-slider-range ui-corner-all ui-widget-header"></div>
            <span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default"></span>
            <span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default"></span>
        </div>
        <div class="range-slider">
            <div class="price-input">
                <div class="row">
                    <div class="col-4">
                        <input type="text" id="minamount">
                    </div>
                    <div class="col-2">
                        -
                    </div>
                    <div class="col-4">
                        <input type="text" id="maxamount">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


import helpers from "../../mixins/helpers.js";

export default {
    data() {
        return {
            // Your data properties here
        };
    },

    mixins: [helpers],
    methods: {
        rangeSlider(){
            let app = this;

            let rangeSlider = $(".price-range"),
                minamount = $("#minamount"),
                maxamount = $("#maxamount"),
                minPrice = rangeSlider.data('min'),
                maxPrice = rangeSlider.data('max');
            rangeSlider.slider({
                range: true,
                min: minPrice,
                max: maxPrice,
                values: [minPrice, maxPrice],
                slide: function (event, ui) {
                    minamount.val(app.moneyFormat(ui.values[0]));
                    maxamount.val(app.moneyFormat(ui.values[1]));
                }
            });

            minamount.val(app.moneyFormat(rangeSlider.slider("values", 0)));
            maxamount.val(app.moneyFormat(rangeSlider.slider("values", 1)));
        },
    },

    mounted() {
        this.rangeSlider();
    }
};


</script>
