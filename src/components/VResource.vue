<script>
  import axios from 'axios'

  export default {
    name: 'VResource',
    props: {
      enableLoading: {
        type: Boolean
      },
      catch: {
        type: Function
      },
      url: {
        type: String,
        required: true
      },
      getPath: {
        type: String,
      }
    },
    data: () => ({
        result: null
    }),
    watch: {
        url: {
          immediate: true,
          async handler(url) {
            if (this.enableLoading) this.$store.commit('toggleLoading')
            try {
              let {data} = await axios.get(url)
              this.result = this.getPath ? data[this.getPath] : data
            } catch (e) {
              this?.catch()
            } finally {
              if (this.enableLoading) this.$store.commit('toggleLoading')
            }
          }
        }
    },
     render () {
      let {result} = this
      return result ? this.$scopedSlots.default(result) : ''
    }
  }
</script>

<style scoped>

</style>
