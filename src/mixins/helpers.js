export default {
    methods: {
        convertBytesToKBMB(bytes) {
            if (bytes < 1000) {
                return bytes + ' B';
            } else if (bytes < 1000000) {
                const kilobytes = (bytes / 1000).toFixed(2);
                return kilobytes + ' KB';
            } else {
                const megabytes = (bytes / 1000000).toFixed(2);
                return megabytes + ' MB';
            }
        },

        moneyFormat(number){
            return number.toLocaleString('en-UG', { style: 'currency', currency: 'UGX' });
        },

        formatSentence(str,str_len = 10){
            if(str <= str_len)
                return str;
            else
                return str.substring(0, str_len) + '...';
        },

        formatUrl(product){
            if(product)
                return `/products/${product.id}/${this.transformString(product.name.toLowerCase())}`;
        },

        transformString(inputString) {
            // Replace non-alphabetic characters with hyphens
            let stringWithHyphens = inputString.replace(/[^a-zA-Z]/g, '-');

            // Replace spaces with hyphens
            stringWithHyphens = stringWithHyphens.replace(/\s+/g, '-');

            return stringWithHyphens;
        },

        createBlur(){
            document.body.style.pointerEvents = 'none';
            const overlay = document.createElement('div');
            overlay.classList.add('blur-overlay');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.background = 'rgba(255, 255, 255, 0.5)'; // Semi-transparent white background
            overlay.style.backdropFilter = 'blur(1px)'; // Adjust the blur radius as needed
            overlay.style.pointerEvents = 'none'; // Allow interaction with elements behind the overlay
            overlay.style.zIndex = '999'; // Set a high z-index to ensure the overlay appears above other elements

            // Append the overlay to the body
            document.body.appendChild(overlay);

            const loader = document.createElement('div');
            loader.classList.add('loader');
            overlay.appendChild(loader);
        },

        destroyBlur(){
            const overlay = document.querySelector('.blur-overlay');
            if (overlay) {
                overlay.remove();
            }

            document.body.style.pointerEvents = 'auto';

        },

        goto(url,reload){
            if(reload)
                window.location.href = url;
            else{
                this.$router.push(url);
            }
        },

        goBack() {
            this.$router.go(-1);
        },
    },
};

