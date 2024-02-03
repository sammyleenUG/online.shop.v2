<template>
    <!-- Breadcrumb Section Begin -->
    <section class="breadcrumb-section set-bg">
        <div class="container p-3" style="background-color: orange">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <div class="breadcrumb__text">
                        <h2 class="text-white" v-html="title"></h2>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>


<script>


export default {
  props:['bgImg','title'],
  mounted(){
    this.setBG();
  },

  methods:{
    setBG (){
      $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
      });
    }
  }

}
</script>
