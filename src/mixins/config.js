let config = {
    admin_url: 'https://cpanel.egweletonline.com',
    // admin_url: 'http://127.0.0.1:8000',
    platform_url: 'https://egweletonline.com',
    // checkout_url: 'http://127.0.0.1:2000',
    checkout_url: 'https://checkout.egweletonline.com',

    ai_platform_url: 'https://ai.sammyleenug.com',
    // google_api_key: 'AIzaSyBAKCjoTweJMBFrxP0cxOdO_j_7yX0UFrU',

    transport_cost_per_km: {
        within: 1000,
        near_by: 500,
        distant: 100,
    },

    store_location: {
        latitude:1.7172572867946114,
        longitude: 33.61421564244982
    },
}

export default config;


