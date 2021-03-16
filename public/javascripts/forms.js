var app = new Vue({
    el: '#app',
    data: {
        forms: ["abc"]
    },
    methods: {
        getForms: function () {
            var _this = this;
            axios.get('/forms/get-forms', this.formDto)
                .then(function (response) {
                    _this.forms = response.data;
                })
                .catch(function (error) {
                    Vue.toasted.error(error.message + ' - ' + error.response.data, {
                        duration: 3000
                    });
                });
        },
        deleteForm: function (e, formName) {
            e.preventDefault();
            var _this = this;
            var conf = confirm("Are you sure you want to delete this form?");
            if (conf == true) {
                axios.post('/forms/delete-form', {formName})
                .then(function (response) {
                    _this.getForms();
                })
                .catch(function (error) {
                    Vue.toasted.error(error.message + ' - ' + error.response.data, {
                        duration: 3000
                    });
                });
            } 
        }
    },
    created: function () {
        this.getForms()
    }
})