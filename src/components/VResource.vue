<script>
  import axios from 'axios'

  export default {
    name: 'VResourse',
    props: {
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
            let {data} = await axios.get(url)
            this.result = this.getPath ? data[this.getPath] : data
          }
        }
    },
     render () {
      let {result} = this
      return result ? this.$scopedSlots.default({result}) : ''
    }
  }
</script>

<style scoped>

</style>
