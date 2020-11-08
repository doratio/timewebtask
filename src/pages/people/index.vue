<template>
    <v-resource :url="`https://swapi.dev/api/people/?page=${$route.query.page || 1}`" :enableLoading="true" :catch="peopleCatch">
        <template #default="{results: people, count}">
            <b-container v-if="people" class="people-page">
                <b-row>
                    <b-col class="people-page-box" sm="6" v-for="(person, key) in people" :key="key">
                        <person-card class="people-page-box__content" :person="person"/>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <b-pagination-nav
                                class="people-page-pagination"
                                :link-gen="linkGen"
                                :number-of-pages="Math.ceil(count / 10)"
                                :limit="10"
                                prev-text="Previous"
                                next-text="Next"
                                hide-goto-end-buttons
                                hide-goto-start-buttons
                                use-router
                        />
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </v-resource>
</template>

<script>
  import PersonCard from '../../components/PersonCard'
  import VResource from '../../components/VResource'

  export default {
    components: {VResource, PersonCard},
    methods: {
      linkGen (pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
      peopleCatch () {
        this.$router.push('404')
      }
    }
  }
</script>

<style lang="scss">
    .people-page-box {
        margin-bottom: 15px;

        &__content {
            height: 100%;
        }
    }

    .people-page-pagination {
        margin: 1rem 0;
    }
</style>
