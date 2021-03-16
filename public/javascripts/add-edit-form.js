var field = {
    field: "",
    label: "",
    type: "",
    mapWith: "",
    includeInForm: true,
    includeInGrid: true,
    validations: {
        required: {
            isApply: false,
            msg: "",
        },
        number: {
            isApply: false,
            msg: "",
        },
        email: {
            isApply: false,
            msg: "",
        },
        maxLength: {
            isApply: false,
            value: '',
            msg: "",
        },
        minLength: {
            isApply: false,
            value: '',
            msg: "",
        },
        regExp: {
            isApply: false,
            value: "",
            msg: "",
        },
    },
    grid: {
        sortable: false,
        filter: false,
        formate: {
            isApply: false,
            formateBy: "",
            formateUsing: "",
        }
    },
};

var app = new Vue({
    el: '#app',
    data: {
        formName: "",
        form: {
            formName: "",
            heading: "",
            createForm: true,
            createGrid: true,
            fields: []
        }
    },
    methods: {
        getForm: function () {
            var _this = this;
            axios.get('/forms/form/' + this.formName)
                .then(function (response) {
                    if (response.data.formName !== undefined) {
                        _this.form = response.data;
                    }
                })
                .catch(function (error) {
                    Vue.toasted.error(error.message + ' - ' + error.response.data, {
                        duration: 3000
                    });
                });
        },
        saveForm: function (event) {
            event.preventDefault();
            var _this = this;
            axios.post('/forms/form/' + this.formName, this.form)
                .then(function (response) {
                    Vue.toasted.success('data saved successfully', {
                        duration: 3000
                    });
                })
                .catch(function (error) {
                    Vue.toasted.error(error.message + ' - ' + error.response.data, {
                        duration: 3000
                    });
                });
        },
        addField: function () {
            this.form.fields.push(field);
        },
        deleteField: function (index) {
            this.form.fields.splice(index, 1);
        }
    },
    created: function () {
        this.formName = document.getElementById("formName").value;
        this.getForm();
    }
});
