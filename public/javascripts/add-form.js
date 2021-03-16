var app = new Vue({
  el: '#app',
  data: {
    formDto: {
      fileName: ''
    }
  },
  methods: {
    addForm: function () {
      var _this = this;
      axios.post('/forms/add-form', this.formDto)
        .then(function (response) {
          Vue.toasted.success(response.data, {
            duration: 3000
          });
          location.href = '/forms';
        })
        .catch(function (error) {
          Vue.toasted.error(error.message, {
            duration: 3000
          });
        });

    }
  }
})