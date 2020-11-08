<template>
    <b-card class="person-card">
        <template #header>
            <h2 class="person-card__title">
                {{person.name}}
            </h2>
        </template>
        <template>
            <b-row>
                <b-col>
                    <b-list-group>
                        <b-list-group-item>
                            Gender: <strong>{{person.gender}}</strong>
                        </b-list-group-item>
                        <b-list-group-item>
                            Height: <strong>{{person.height}}</strong>
                        </b-list-group-item>
                        <b-list-group-item>
                            Mass: <strong>{{person.mass}}</strong>
                        </b-list-group-item>
                    </b-list-group>
                </b-col>
                <b-col>
                    <strong>Starships:</strong>
                    <b-list-group>
                        <template v-if="starships && starships.length">
                            <b-list-group-item v-for="(starship, key) in starships" :key="key">
                                <b-badge>{{starship}}</b-badge>
                            </b-list-group-item>
                        </template>
                        <template v-else>
                            <b-list-group-item>
                                <b-badge>I haven't starship (</b-badge>
                            </b-list-group-item>
                        </template>
                    </b-list-group>
                </b-col>
            </b-row>
        </template>
        <template #footer>
            <hr>
            <div>
                <b-button tag="a" :to="`/person/${person.url.split('/')[5]}`">
                    See more info Person
                </b-button>
            </div>
        </template>
    </b-card>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'PersonCard',
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

<style scoped>

</style>
