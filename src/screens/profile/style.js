import {StyleSheet} from 'react-native';
import {TEXT_INPUT_SIZE} from '../../utils/commonStyles'

export const styles = StyleSheet.create({
  profileContainer: {
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  profilePic: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    borderRadius:40,
    borderRadius:40
  },
  userName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  userEmail: {marginTop: 5, fontSize: 16, color: 'grey', textAlign: 'center'},
  editProfileContainer: {
    backgroundColor: '#006afe',
    padding: 5,
    marginTop: 15,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  editProfile: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  settings: {width: '90%', alignSelf: 'center', marginTop: 30},
  header: {marginTop: 20, fontSize: 14, color: 'grey'},
  list: {marginTop: 15, flexDirection: 'row', justifyContent: 'space-between'},
  row: {flexDirection: 'row'},
  listTitle: {fontSize: 18, textAlignVertical: 'center', marginLeft: 10},
  listSubTitle: {
    fontSize: 18,
    textAlignVertical: 'center',
    marginLeft: 10,
    color: 'grey',
  },
  inputView: {
    backgroundColor: '#D3D3D3',
    borderRadius: 30,
    width: '95%',
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    paddingLeft:20,
    fontSize: TEXT_INPUT_SIZE,
  },
  loginBtn: {
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#ed5135',
    flexDirection: 'row',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
});
