<template>
    <b-container>
        <div class="not-found--page text-center">
            <h1 class="not-found--page__title text-danger">
                404
            </h1>
            <p class="not-found--page__text">
                    Page is not found
            </p>
            <b-link class="not-found--page__link" to="/people">Go to main page</b-link>
        </div>
    </b-container>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
    .not-found--page {
        margin: 50px 0;

        &__title {
            font-weight: bolder;
            font-size: 120px;
            line-height: 180px;
            margin: 0;
        }

        &__text {
            font-weight: bolder;
            font-size: 25px;
            margin-bottom: 0.55rem;
        }
    }
</style>
