<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <router-link to="/starnews/matchs/matchsDetail/1"><img src="/src/assets/img/3.jpg" alt="" /></router-link>
            </div>
            <div class="swiper-slide">
                <router-link to="/starnews/matchs/matchsDetail/2"><img src="/src/assets/img/1.png" alt="" /></router-link>
            </div>
            <div class="swiper-slide">
                <router-link to="/starnews/matchs/matchsDetail/3"><img src="/src/assets/img/2.png" alt="" /></router-link>
            </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
    import "./carousel.scss"
</script>