// Note: React Native does not allow dynamic values for require, hence the static mapping here

export const mapImageURL = (arr) => {
    return arr.map((item) => {
        let img;
        switch (item.image) {
            case 'mountain_vista_retreat.jpg':
                img = require('../assets/images/mountain_vista_retreat.jpg');
                break;
            case 'enchanted_hideaway.jpg':
                img = require('../assets/images/enchanted_hideaway.jpg');
                break;
            case 'rustic_forest_lodge.jpg':
                img = require('../assets/images/rustic_forest_lodge.jpg');
                break;
            case 'lakeside_serenity_cabin.jpg':
                img = require('../assets/images/lakeside_serenity_cabin.jpg');
                break;
            case 'tranquil_forest_haven.jpg':
                img = require('../assets/images/tranquil_forest_haven.jpg');
                break;
            case 'alpine_cozy_cottage.jpg':
                img = require('../assets/images/alpine_cozy_cottage.jpg');
                break;
            case 'eco_friendly_treehouse.jpg':
                img = require('../assets/images/eco_friendly_treehouse.jpg');
                break;
            case 'riverfront_retreat.jpg':
                img = require('../assets/images/riverfront_retreat.jpg');
                break;
            case 'sunset_ridge_cabin.jpg':
                img = require('../assets/images/sunset_ridge_cabin.jpg');
                break;

            case 'serenity_vista_logo.png':
                img = require('../assets/images/serenity_vista_logo.png');
                break;
            case 'sunny_groceries_supermarket.png':
                img = require('../assets/images/sunny_groceries_supermarket.png');
                break;
            case 'chicnook_decor.png':
                img = require('../assets/images/chicnook_decor.png');
                break;
        }
        return {
            ...item,
            image: img
        };
    });
};
