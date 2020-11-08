<template>
    <b-card class="person-card">
        <header class="person-card__header">
            <h2 class="person-card__title">
                {{person.name}}
            </h2>
        </header>
        <b-row class="person-card__body">
            <b-col>
                <b-list-group class="person-card-info">
                    <b-list-group-item class="person-card-info__item" variant="info">
                        Gender: <strong>{{person.gender}}</strong>
                    </b-list-group-item>
                    <b-list-group-item class="person-card-info__item" variant="info">
                        Height: <strong>{{person.height}}</strong>
                    </b-list-group-item>
                    <b-list-group-item class="person-card-info__item" variant="info">
                        Mass: <strong>{{person.mass}}</strong>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col>
                <section class="starships">
                    <strong class="starships__title">Starships:</strong>
                    <b-list-group class="starships__tags">
                        <template v-if="person.starships && person.starships.length">
                            <b-list-group-item class="starships__tag" variant="info" v-for="(starshipURL, key) in person.starships"
                                               :key="key">
                                <v-resource :url="starshipURL" getPath="name">
                                    <template #default="starshipName">
                                        <b-badge variant="info">{{starshipName}}</b-badge>
                                    </template>
                                </v-resource>
                            </b-list-group-item>
                        </template>
                        <template v-else>
                            <b-list-group-item class="starships__tag" variant="info">
                                <b-badge variant="danger">I haven't starship (</b-badge>
                            </b-list-group-item>
                        </template>
                    </b-list-group>
                </section>
            </b-col>
        </b-row>
        <hr class="person-card__divider">
        <footer class="text-right person-card__footer">
            <b-button tag="a" variant="info" size="sm" :to="`/person/${person.url.split('/')[5]}`">
                See more info Person
            </b-button>
        </footer>
    </b-card>
</template>

<script>
  import axios from 'axios'
  import VResource from './VResource'

  export default {
    name: 'PersonCard',
    components: {VResource},
    props: {
      person: {
        type: Object,
        required: true
      }
    },
    data: () => ({
      starships: null
    }),
    watch: {
      'person.starships': {
        immediate: true,
        handler (urls) {
          Promise.all(urls.map(url => axios.get(url)))
            .then(starships => this.starships = starships.map(el => el.data.name))
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    .person-card {
        color: #0c5460;
        background-color: #d1ecf1;
        border-color: #bee5eb;
        padding: .75rem 1.25rem 0.1rem 1.25rem;

        &__title {
            font-size: 24px;
        }

        &__divider {
            border-top-color: #abdde5;
        }

        &__footer {
            margin-top: 1rem;
            margin-bottom: 1rem;
        }

        & > * {
            padding: 0;
        }
    }

    .person-card-info {
        &__item {
            padding: 0;
            border: none;
            background-color: inherit;
        }
    }


    .starships {
        &__tags {
            flex-direction: row;
            flex-wrap: wrap;
        }

        &__tag {
            padding: 0;
            border: none;
            background-color: inherit;

            & > * {
                margin: 0 3px 0px 0;
            }
        }
    }
</style>
