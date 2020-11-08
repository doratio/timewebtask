<template>
    <v-resource :url="`https://swapi.dev/api/people/${$route.params.id || 1}`" :enableLoading="true" :catch="personCatch">
        <template #default="person">
            <b-container class="person-page">
                <b-row>
                    <b-col>
                        <header>
                            <b-row align-v="center">
                                <b-col>
                                    <h1 class="person-page__title">{{person.name}}</h1>
                                </b-col>
                                <b-col class="text-right">
                                    <b-button
                                            variant="success"
                                            size="sm"
                                            @click="$router.go(-1)"
                                    >Back to List</b-button>
                                </b-col>
                            </b-row>
                        </header>
                    </b-col>
                </b-row>
                <hr>
                <b-row>
                    <b-col md="6">
                        <b-list-group>
                            <b-list-group-item variant="info">
                                Birth Year: <strong>{{person.birth_year}}</strong>
                            </b-list-group-item>
                            <b-list-group-item variant="info">
                                Gender: <strong>{{person.gender}}</strong>
                            </b-list-group-item>
                            <b-list-group-item variant="info">
                                Height: <strong>{{person.height}}</strong>
                            </b-list-group-item>
                            <b-list-group-item variant="info">
                                Mass: <strong>{{person.mass}}</strong>
                            </b-list-group-item>
                            <b-list-group-item variant="info">
                                Hair Color: <strong>{{person.hair_color}}</strong>
                            </b-list-group-item>
                            <b-list-group-item variant="info">
                                Skin Color: <strong>{{person.skin_color}}</strong>
                            </b-list-group-item>
                            <b-list-group-item variant="info">
                                Eye Color: <strong>{{person.eye_color}}</strong>
                            </b-list-group-item>
                        </b-list-group>
                    </b-col>
                    <b-col md="6">
                        <section class="films">
                            <header class="films__header">
                                <h3 class="films__title">Films</h3>
                            </header>
                            <b-list-group class="films__tags">
                                <b-list-group-item class="films__tag" v-for="(filmURL, key) in person.films" :key="key">
                                    <v-resource :url="filmURL" getPath="title">
                                        <template #default="filmName">
                                            <b-badge variant="info">{{filmName}}</b-badge>
                                        </template>
                                    </v-resource>
                                </b-list-group-item>
                            </b-list-group>
                        </section>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </v-resource>
</template>

<script>
  import VResource from '../../../components/VResource'

  export default {
    components: {VResource},
    methods: {
      personCatch () {
        this.$router.push('404')
      }
    }
  }
</script>

<style lang="scss">
    .person-page {
        &__title {
            font-size: 2rem;
        }
    }

    .films {
        &__title {
            font-size: 1.5rem;
        }
        &__tags {
            flex-direction: row;
            flex-wrap: wrap;
        }
        &__tag {
            padding: 0;
            border: none;

            & > * {
                margin: 0 6px 6px 0;
                font-size: 14px !important;
            }
        }
    }
</style>
