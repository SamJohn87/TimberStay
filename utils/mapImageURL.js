// Note: React Native does not allow dynamic values for require, hence the static mapping here

export const mapImageURL = (arr) => {
    return arr.map((item) => {
        let img;
        switch (item.image) {
            case 'mountain_vista_retreat.jpg':
                img = require('../assets/images/mountain_vista_retreat.jpg');
                break;
        }
        return {
            ...item,
            image: img
        };
    });
};
