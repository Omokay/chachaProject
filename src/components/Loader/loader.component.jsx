import HoldOn from 'react-hold-on';

var options = {
    theme: 'sk-bounce',
    message: 'Please wait...',
    backgroundColor: '#1847B1',
    textColor: 'white',
};
//
// var redirect = {
//     theme: 'sk-bounce',
//     message: 'Returning to Merchant Page...',
//     backgroundColor: '#1847B1',
//     textColor: 'white',
// };

// export const showRedirect = () => {
//     HoldOn.open(redirect);
// };

export const showLoader = () => {
    HoldOn.open(options);
};

export const hideLoader = () => {
    HoldOn.close();
};
