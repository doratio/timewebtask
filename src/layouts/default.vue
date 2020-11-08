<template>
    <div class="default-layout">
        <b-navbar class="default-layout__header default-layout-header" tag="header" variant="faded" type="light">
            <b-navbar-brand class="default-layout-header__link" to="/people">
                <img class="default-layout-header__img" src="../static/img/logo.png" alt="Kitten">
            </b-navbar-brand>
        </b-navbar>
        <main class="default-layout__body default-layout-body">
            <div v-if="loading" class="default-layout-body__loading default-layout-body-loading">
                <b-spinner v-if="showSpinner" class="default-layout-body-loading__spinner" variant="success"/>
                <div v-else class="default-layout-body-loading__face default-layout-body-loading-face">
                    <img
                            class="default-layout-body-loading-face__img"
                            src="../static/img/aggressive-face.gif"
                            alt="aggressive face"
                            rel="prefetch"
                    >
                    <p class="default-layout-body-loading-face__text text-danger">
                        I am trying to get a response<br>from the server
                    </p>
                </div>
            </div>
            <router-view v-show="!loading"/>
        </main>
        <footer class="default-layout__footer default-layout-footer">
            <b-container>
                <b-row>
                    <b-col>
                        API |
                        <b-link class="default-layout-footer__link" href="https://swapi.dev/api">https://swapi.dev/api
                        </b-link>
                    </b-col>
                </b-row>
            </b-container>
        </footer>
    </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data: () => ({
      showSpinner: true,
      counter: null
    }),
    computed: {
      ...mapState(['loading'])
    },
    watch: {
      loading(flag) {
        console.log('flag', flag)
        if(flag) {
          this.startCounter()
        } else {
          if (this.counter) clearTimeout(this.counter);
          else this.showSpinner = true
        }
      }
    },
    methods: {
      startCounter() {
        this.counter = setTimeout(() => {
            this.showSpinner = false
            this.counter = null
        }, 2000)
      }
    }
  }
</script>


<style lang="scss">
    .default-layout {
        position: relative;

        height: 100vh;
        width: 100%;

        &__header {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 30;
            width: 100%;
        }

        &__body {
            padding-top: 91px;
            min-height: calc(100vh - 34px);
            position: relative;
        }

        &__footer {
            box-shadow: 0 0 5px 0 rgba(0, 0, 0, .5);
        }
    }

    .default-layout-header {
        padding: 15px 0;
        background: #000 url(../static/img/space.jpg) 50% no-repeat;
        background-size: cover;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, .5);

        &__link {
            margin: 0 auto;
            padding: 0 !important;
        }

        &__img {
            display: block;
            height: 35px;
        }
    }

    .default-layout-body {
        &__loading {
            height: 50vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .default-layout-body-loading {
        &__spinner {
            width: 10rem;
            height: 10rem;
        }

        &__face {
            text-align: center;
        }
    }

    .default-layout-body-loading-face {
        font-weight: 700;
        font-size: 20px;

        &__img {
            margin: 0 auto;
            width: 90px;
        }
        &__text {
            margin-top: 15px;
            margin-bottom: 0;
        }
    }

    .default-layout-footer {
        text-align: center;
        padding: 5px 0;
        background: #000;
        color: #fff;

        &__link {
            color: inherit;
            font-size: 13px;

            &:hover {
                color: inherit;
            }
        }
    }
</style>
