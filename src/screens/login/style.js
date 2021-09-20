import {StyleSheet} from 'react-native';
import {TEXT_INPUT_SIZE} from '../../utils/commonStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },

  image: {
    marginBottom: 40,
    height: 200,
    width: 200,
  },

  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '80%',
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    fontSize: TEXT_INPUT_SIZE,
  },

  forgot_button: {
    height: 30,
    marginTop: 20,
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#ed5135',
    flexDirection: 'row',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
  },
  iconContainer: {
    justifyContent: 'center',
    paddingLeft: 15,
    backgroundColor: '#ed5135',
  },
  row: {flexDirection: 'row'}
});
