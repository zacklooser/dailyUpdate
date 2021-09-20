import Toast from 'react-native-simple-toast';

export const showToast = (msg) => {
    setTimeout(() => {
        Toast.show(msg, Toast.LONG);
    }, 400);
};