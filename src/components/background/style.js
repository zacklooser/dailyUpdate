import {StyleSheet, Dimensions} from 'react-native';
import {DEVICE_HEIGHT,DEVICE_WITDTH} from '../../utils/globalConfig'

export const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    top: 0,
    width: DEVICE_WITDTH,
    height: DEVICE_HEIGHT,
  },
});
