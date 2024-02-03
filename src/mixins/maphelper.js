import notify from "./notify.js";

export default {
    mixins:[notify],
    methods: {
        getCurrentLocation(successCallBackHandler){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => successCallBackHandler(position),
                    error => {
                        this.showLoading().close()
                    }
                );
            } else {
                this.showErrorMessage("Your browser is not supported!")
            }
        },

        //reverseGeocode
        getAddress(latitude, longitude, successCallBackHandler) {
            // const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${config.google_api_key}`;

            const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

            console.log('latitude',latitude);
            console.log('longitude',longitude);

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    // console.log('data',data)
                    const address = data.display_name;
                    successCallBackHandler(address);
                })
                .catch(error => {
                    console.log(error);
                    this.showErrorMessage("Check your internet connection!")
                    this.showLoading().close()
                });
        },


        searchLocation(searchQuery,successCallBackHandler) {
            const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=UG`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => successCallBackHandler(data))
                .catch(error => {
                    console.error('Error fetching search results:', error);
                });
        },

        calculateDistance(lat1, lon1, lat2, lon2){
            const R = 6371; // Earth's radius in kilometers

            const dLat = (lat2 - lat1) * (Math.PI / 180);
            const dLon = (lon2 - lon1) * (Math.PI / 180);

            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

             // Distance in kilometers
            return R * c;
        }
    }
}
