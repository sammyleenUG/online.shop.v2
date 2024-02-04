import axios from "axios";
import sweetalert from "./notify.js";
import helpers from "./helpers.js";
export default {
    mixins: [sweetalert,helpers],
    data() {
        return {
            processing: false,
        };
    },
    mounted() {
        let token = this.$store.state.loggedInUser? this.$store.state.loggedInUser.token : null;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    methods: {
        async makePostRequest(url, params, successCallback, errorCallback) {

            this.processing = true;
            this.createBlur();

            await axios.post(url, params)
                .then((response) => {
                    this.processing = false;
                    this.destroyBlur();
                    // Check if a callback function is provided and execute it
                    if (typeof successCallback === 'function') {
                        successCallback(response);
                    }
                })
                .catch((error) => {
                    this.processing = false;
                    this.destroyBlur();

                    if (typeof errorCallback === 'function') {
                        errorCallback(error);
                    }
                });
        },
        async makeGetRequest(url, successCallback, errorCallback) {

            this.processing = true;
            this.createBlur();

            await axios.get(url)
                .then((response) => {
                    this.processing = false;
                    this.destroyBlur()
                    // Check if a callback function is provided and execute it
                    if (typeof successCallback === 'function') {
                        successCallback(response);
                    }
                })
                .catch((error) => {
                    this.processing = false;
                    this.destroyBlur();

                    if (typeof errorCallback === 'function') {
                        errorCallback(error);
                    }

                });
        },
    },
};

