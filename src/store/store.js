// store.js
import { createStore } from 'vuex';

import cat4 from "../assets/categories/cat-4.jpg";

import accessories from "../assets/products/Accessories.png"
import appliances from "../assets/products/Appliances.png"
import flat_iron from "../assets/products/Binatone_Flat_Iron.jpg"
import water_heater from "../assets/products/Binatone_2_Litres.jpg"
import bracelet from "../assets/products/Classic_2_in_1_Men_Women_Unisex_Bracelet.jpg"
import computing from "../assets/products/Computing.jpg";
import fan from "../assets/products/Duravold_17.jpg";
import groceries from "../assets/products/Groceries.jpg"
import fashion from "../assets/products/Fashion.png"
import wristWatch from "../assets/products/Joefox_dual_Display_Wristwatch.jpg"
import ice_watch from "../assets/products/Luxury_Iced_Stone_Wristwatch.jpg"
import belt from "../assets/products/Mens_Fashion_Belt.jpg"
import blazer from "../assets/products/Mens_Zipper_Blazer.jpg"
import analogue_watch from "../assets/products/Nepic_Men_Analogue_Wheel_seconds_function_Leather_WristWatch.jpg"
import oraimo from "../assets/products/Oraimo_FreePots_Lite.jpg"
import phones from "../assets/products/PhonesTables.png"
import power_banks from "../assets/products/Power_Banks_20000_MAh.jpg"
import blender from "../assets/products/Silver_Crest_Blender.jpg"
import sports from "../assets/products/Sports.jpg"
import tecno from "../assets/products/Tecno_Spark_10c_6.6.jpg"
import television from "../assets/products/TELEVISION.jpg"
import xiaomi1 from "../assets/products/XIAOMI_Redmi_A2.jpg"
import xiaomi2 from "../assets/products/XIAOMI_Redmi_12_6.79.jpg"
import gift from "../assets/products/gift-4536515_1280.png"
import axios from "axios";

import config from "../mixins/config.js";

export default createStore({
    state() {
        return {
            support: {
                phone: '+256 780604658',
                email: "support@egweletonline.com",
                facebook: "https://www.facebook.com/profile.php?id=61554189817439",
                address: "Main Street - Opposite Joint Clinic, Soroti"
            },

            itemsInCat: [],
            wishlist: [],

            subTotal: 0,
            total: 0,
            discount: 0,

            categories: [
                {
                    name: "Phones & Tablets",
                    img: phones,
                    icon: 'fa fa-tablet',
                    link: 'phones-and-tablets'
                },
                {
                    name: "TV's & Audio",
                    img: television,
                    icon: 'fa fa-tv',
                    link: "tvs-and-radio"
                },
                {
                    name: "Appliances",
                    img: appliances,
                    icon: 'fa fa-cab',
                    link: 'appliances'
                },
                {
                    name: "Fashion",
                    img: fashion,
                    icon: 'fa fa-shirtsinbulk',
                    link:'fashion'
                },
                {
                    name: "Computing",
                    img: computing,
                    icon: 'fa fa-laptop',
                    link: 'computing'
                },
                {
                    name: "Supermarket",
                    img: groceries,
                    icon: 'fa fa-shopping-basket',
                    link: 'supermarket'
                },
                {
                    name: "Accessories",
                    img: accessories,
                    icon: 'fa fa-tv',
                    link: 'accessories',
                },
                {
                    name: "Sports",
                    img: sports,
                    icon: 'fa fa-soccer-ball-o',
                    link:'sports'
                },
                {
                    name: "Other Categories",
                    img: cat4,
                    icon: 'fa fa-minus',
                    link: 'other-categories'
                },

                {
                    name: "Gift",
                    img: gift,
                    icon: 'fa fa-gift',
                    link: 'gift'
                },
            ],

            items: [
                {
                    name: "Binatone Flat Iron",
                    img: flat_iron,
                    category: "Appliances",
                    categoryID: "1",
                    original_price: 100000,
                    discounted_price: 50000,
                },
                {
                    name: "Binatone 2 Litres Pacolator",
                    img: water_heater,
                    category: "Appliances",
                    categoryID: "2",
                    original_price: 120000,
                    discounted_price: 100000,
                },
                {
                    name: "Classic 2 in 1 Men Women Unisex Bracelet",
                    img: bracelet,
                    category: "Fashion",
                    categoryID: "3",
                    original_price: 35000,
                    discounted_price: 34000,
                },
                {
                    name: "Duravoid 17' Fan",
                    img: fan,
                    category: "Appliances",
                    categoryID: "4",
                    original_price: 65000,
                    discounted_price: 62000,
                },
                {
                    name: "Joefox Dual Display Wristwatch",
                    img: wristWatch,
                    category: "Fashion",
                    categoryID: "5",
                    original_price: 461000,
                    discounted_price: 350000,
                },

                {
                    name: "Luxury Iced Stone Wristwatch",
                    img: ice_watch,
                    category: "Fashion",
                    categoryID: "5",
                    original_price: 561000,
                    discounted_price: 350000,
                },

                {
                    name: "Men's Fashion Belt",
                    img: belt,
                    category: "Fashion",
                    categoryID: "5",
                    original_price: 21000,
                    discounted_price: 19000,
                },

                {
                    name: "Men's Zipper Blazer",
                    img: blazer,
                    category: "Fashion",
                    categoryID: "5",
                    original_price: 55000,
                    discounted_price: 50000,
                },

                {
                    name: "Nepic Men Analogue Wheel Seconds Function Leather Wristwatch",
                    img: analogue_watch,
                    category: "Fashion",
                    categoryID: "5",
                    original_price: 250000,
                    discounted_price: 180000,
                },

                {
                    name: "Oraimo Freepods Lite",
                    img: oraimo,
                    category: "Accessories",
                    categoryID: "5",
                    original_price: 250000,
                    discounted_price: 180000,
                },

                {
                    name: "Power Banks 20,000 MAh",
                    img: power_banks,
                    category: "Accessories",
                    categoryID: "5",
                    original_price: 150000,
                    discounted_price: 80000,
                },

                {
                    name: "Silver Crest Blender",
                    img: blender,
                    category: "Accessories",
                    categoryID: "5",
                    original_price: 250000,
                    discounted_price: 180000,
                },

                {
                    name: "Silver Crest Blender",
                    img: blender,
                    category: "Appliances",
                    categoryID: "5",
                    original_price: 250000,
                    discounted_price: 180000,
                },

                {
                    name: "Tecno Spark 10C 6.6",
                    img: tecno,
                    category: "Phones & Tablets",
                    categoryID: "5",
                    original_price: 800000,
                    discounted_price: 750000,
                },

                {
                    name: "XIAOMI Redmi A2",
                    img: xiaomi1,
                    category: "Phones & Tablets",
                    categoryID: "5",
                    original_price: 700000,
                    discounted_price: 670000,
                },

                {
                    name: "XIAOMI Redmi 12 6.79",
                    img: xiaomi2,
                    category: "Phones & Tablets",
                    categoryID: "5",
                    original_price: 700000,
                    discounted_price: 660000,
                },

                {
                    name: "Binatone Flat Iron",
                    img: flat_iron,
                    category: "Appliances",
                    categoryID: "1",
                    original_price: 100000,
                    discounted_price: 50000,
                },
                {
                    name: "Binatone 2 Litres Pacolator",
                    img: water_heater,
                    category: "Appliances",
                    categoryID: "2",
                    original_price: 120000,
                    discounted_price: 100000,
                },
                {
                    name: "Classic 2 in 1 Men Women Unisex Bracelet",
                    img: bracelet,
                    category: "Fashion",
                    categoryID: "3",
                    original_price: 35000,
                    discounted_price: 34000,
                },
                {
                    name: "Duravoid 17' Fan",
                    img: fan,
                    category: "Appliances",
                    categoryID: "4",
                    original_price: 65000,
                    discounted_price: 62000,
                },
                {
                    name: "Joefox Dual Display Wristwatch",
                    img: wristWatch,
                    category: "Fashion",
                    categoryID: "5",
                    original_price: 461000,
                    discounted_price: 350000,
                },

                {
                    name: "Luxury Iced Stone Wristwatch",
                    img: ice_watch,
                    category: "Fashion",
                    categoryID: "5",
                    original_price: 561000,
                    discounted_price: 350000,
                },

                {
                    name: "Men's Fashion Belt",
                    img: belt,
                    category: "Fashion",
                    categoryID: "5",
                    original_price: 21000,
                    discounted_price: 19000,
                },

                {
                    name: "Men's Zipper Blazer",
                    img: blazer,
                    category: "Fashion",
                    categoryID: "5",
                    original_price: 55000,
                    discounted_price: 50000,
                },

                {
                    name: "Nepic Men Analogue Wheel Seconds Function Leather Wristwatch",
                    img: analogue_watch,
                    category: "Fashion",
                    categoryID: "5",
                    original_price: 250000,
                    discounted_price: 180000,
                },

                {
                    name: "Oraimo Freepods Lite",
                    img: oraimo,
                    category: "Accessories",
                    categoryID: "5",
                    original_price: 250000,
                    discounted_price: 180000,
                },

                {
                    name: "Power Banks 20,000 MAh",
                    img: power_banks,
                    category: "Accessories",
                    categoryID: "5",
                    original_price: 150000,
                    discounted_price: 80000,
                },

                {
                    name: "Silver Crest Blender",
                    img: blender,
                    category: "Accessories",
                    categoryID: "5",
                    original_price: 250000,
                    discounted_price: 180000,
                },

                {
                    name: "Silver Crest Blender",
                    img: blender,
                    category: "Appliances",
                    categoryID: "5",
                    original_price: 250000,
                    discounted_price: 180000,
                },

                {
                    name: "Tecno Spark 10C 6.6",
                    img: tecno,
                    category: "Phones & Tablets",
                    categoryID: "5",
                    original_price: 800000,
                    discounted_price: 750000,
                },

                {
                    name: "XIAOMI Redmi A2",
                    img: xiaomi1,
                    category: "Phones & Tablets",
                    categoryID: "5",
                    original_price: 700000,
                    discounted_price: 670000,
                },

                {
                    name: "XIAOMI Redmi 12 6.79",
                    img: xiaomi2,
                    category: "Phones & Tablets",
                    categoryID: "5",
                    original_price: 700000,
                    discounted_price: 660000,
                },
            ],

            featured_items: [],

            latest_items: [],

            sale_off_items: [],
            explore_items: [],

            top_rated_items: [],

            selected_product: null,
            selected_product_quantity: 1,

            ad_text: [
                'Shop for your favourite products at your comfort',
                'Pay on delivery',
                'Christmas offers',
                'All your products in one place',
                '24/7 support',
                'Free delivery on your first order'
            ],

            itemsUnderType: [
                {
                    title: "Latest Products",
                    item: [],
                },
                {
                    title: "Top rated products",
                    item: [],
                },
            ],

            min_price: 1000,
            max_price: 1000000,

            isMobile: false,

            loggedInUser:null,

        };
    },
    mutations: {
        setLatestItems(state, items) {
            state.latest_items = items;
            state.itemsUnderType[0].item = items;
        },

        setFeaturedItems(state, items) {
            state.featured_items = items;
        },

        setTopRatedItems(state, items) {
            state.top_rated_items = items;
            state.itemsUnderType[1].item = items;
        },

        setCartItems(state, items){
            state.itemsInCat = items;
        },

        setWishList(state,items){
            state.wishlist = items;
        },

        setSaleOffItems(state,items){
            state.sale_off_items = items;
        },

        setExploreItems(state,items){
            state.explore_items = items;
        },

        updateLoggedInUser(state, object){
            state.loggedInUser = object;
        },

        updateItemsInCat(state, newItem) {
            state.itemsInCat.push(newItem);
        },

        updateWishlist(state, newItem) {
            state.wishlist.push(newItem)
        },

        updateSelectedProduct(state,newItem){
            state.selected_product = newItem;
        },

        updateSelectedProductQuantity(state,quantity){
            state.selected_product_quantity = quantity;
        },

        updateTotal(state){

            let total = 0;

            state.itemsInCat.forEach((item) => {
                total += item.product.discounted_price * item.quantity;
            })

            state.subTotal = total;
            state.total =  state.subTotal - state.discount;
        }
    },


    actions: {
        setCartAndWishListItems ({ commit }) {
            setTimeout(() => {
                let auth = JSON.parse(localStorage.getItem('auth'));

                if(auth){
                    axios.get(`${config.admin_url}/api/cart`, {
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                        },
                    }).then((response) => {
                        commit('setCartItems',response.data.cart);
                        commit('setWishList',response.data.wishList);
                    })
                }

            }, 1000)

        },

        setLoggedInUser({ commit }) {
            setTimeout(() => {
                let auth = JSON.parse(localStorage.getItem('auth'));

                if(auth){
                    commit('updateLoggedInUser',{
                        user: auth.user,
                        token: auth.token,
                    });
                }else{
                    commit('updateLoggedInUser',null);
                }

            }, 1000)

        },

    },
});
