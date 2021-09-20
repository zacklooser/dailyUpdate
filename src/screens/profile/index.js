import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import {
  EditProfile,
  EditProfilePrivacy,
  EditProfileLogout,
  EditProfilePic,
} from '../../components/textInputIcon/textInputIcon';
import {THEME, PLACEHOLDERTEXTCOLOR, WHITE} from '../../utils/colors';
import {showToast} from '../../utils/toast';
import {LOGOUT, LOGIN} from '../../redux/actions/loginActions';
import {useSelector, useDispatch} from 'react-redux';
import {styles} from './style';

const profile = ({navigation}) => {
  const userData = useSelector(state => state.login);
  const [firstName, setFirstName] = useState(userData.credential.firstName);
  const [lastName, setLastName] = useState(userData.credential.lastName);
  const [password, setPassword] = useState(userData.credential.password);
  const [modalVisible, setModalVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState(
    userData.credential.profile,
  );
  const [isLoadingProfile, setLoadingProfile] = useState(true);
  const [isUploadingProfile, setUploadingProfile] = useState(false);
  const dispatch = useDispatch();
  const reference = storage().ref(`profile/${userData.credential.email}`);

  useEffect(() => {
    if (profilePicture == '' || profilePicture=='undefined') downloadProfile();
    else setLoadingProfile(!isLoadingProfile);
  }, []);

  const downloadProfile = async () => {
    storage()
      .ref(`profile/${userData.credential.email}`)
      .getDownloadURL()
      .then(downloadURL => {
        setProfilePicture(downloadURL);
        updateProfilePic(downloadURL)
        setLoadingProfile(false);
        dispatchProfilePicAction(downloadURL);
      })
      .catch(error => {
        setLoadingProfile(false);
      });
  };
  const logOut = () => {
    dispatch({type: LOGOUT});
    auth()
      .signOut()
      .then(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Login'}],
          }),
        );
        showToast('User Logged out!');
      });
  };
  const pickPicture = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setProfilePicture(image.path);
      uploadProfilePicture(image.path);
    });
  };
  const uploadProfilePicture = async path => {
    await reference.putFile(path);
    downloadProfile();
  };
  const updateProfile = () => {
    if(userData.credential.firstName==firstName &&userData.credential.lastName==lastName) return showToast('Nothing to Update!');
    setUploadingProfile(!isUploadingProfile);
    firestore()
      .collection('Users')
      .doc(userData.credential.email)
      .update({
        firstName: firstName,
        lastName: lastName,
        password: password,
      })
      .then(() => {
        setUploadingProfile(false);
        setModalVisible(false);
        showToast('Profile uploaded successfully');
        dispatchUpdateAction();
      });
  };
  const updateProfilePic = (downloadURL) => {
    firestore()
      .collection('Users')
      .doc(userData.credential.email)
      .update({
        profile: downloadURL
      })
      .then(() => {
      });
  };
  const dispatchProfilePicAction = downloadURL => {
    var userUpdateData = {};
    userUpdateData.userData = userData.userData;
    userUpdateData.credential = {
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: userData.credential.email,
      profile: downloadURL,
    };
    userUpdateData.remember = userData.remember;
    dispatch({type: LOGIN, payload: userUpdateData});
  };
  const dispatchUpdateAction = () => {
    var userUpdateData = {};
    userUpdateData.userData = userData.userData;
    userUpdateData.credential = {
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: userData.credential.email,
      profile: userData.credential.profile,
    };
    userUpdateData.remember = userData.remember;
    dispatch({type: LOGIN, payload: userUpdateData});
  };
  return (
    <View>
      <ScrollView>
        <View style={styles.profileContainer}>
          <ImageBackground
            style={styles.profilePic}
            imageStyle={{borderRadius: 40}}
            source={
              profilePicture == ''
                ? require('../../assets/images/profile.png')
                : {uri: profilePicture}
            }>
            {isLoadingProfile && (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  backgroundColor: 'rgba(52, 52, 52, 0.6)',
                  width: '100%',
                  height: '100%',
                  borderRadius: 40,
                }}>
                <ActivityIndicator size="small" color={WHITE} />
              </View>
            )}
          </ImageBackground>
          <Text style={styles.userName}>
            {userData.credential.firstName + ' ' + userData.credential.lastName}
          </Text>
          <Text style={styles.userEmail}>{userData.credential.email}</Text>
          <TouchableOpacity
            style={styles.editProfileContainer}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Text style={styles.editProfile}>Edit Profile</Text>
            <EditProfile iconName="chevron-small-right" colorName="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.settings}>
          <View>
            <Text style={styles.header}>CONTENT</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Favourites')}>
              <View style={styles.list}>
                <View style={styles.row}>
                  <EditProfile iconName="heart-outlined" colorName="black" />
                  <Text style={styles.listTitle}>Favorites</Text>
                </View>
                <View style={styles.row}>
                  <EditProfile
                    iconName="chevron-small-right"
                    colorName="black"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.list}>
                <View style={styles.row}>
                  <EditProfile iconName="download" colorName="black" />
                  <Text style={styles.listTitle}>Downloads</Text>
                </View>
                <View style={styles.row}>
                  <EditProfile
                    iconName="chevron-small-right"
                    colorName="black"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.header}>PREFRENCES</Text>
            <TouchableOpacity>
              <View style={styles.list}>
                <View style={styles.row}>
                  <EditProfile iconName="globe" colorName="black" />
                  <Text style={styles.listTitle}>Language</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.listSubTitle}>English</Text>
                  <EditProfile
                    iconName="chevron-small-right"
                    colorName="black"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.list}>
                <View style={styles.row}>
                  <EditProfile iconName="moon" colorName="black" />
                  <Text style={styles.listTitle}>Dark Mode</Text>
                </View>
                <View style={styles.row}>
                  <EditProfile
                    iconName="chevron-small-right"
                    colorName="black"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.list}>
                <View style={styles.row}>
                  <EditProfile iconName="bell" colorName="black" />
                  <Text style={styles.listTitle}>Subscription</Text>
                </View>
                <View style={styles.row}>
                  <EditProfile
                    iconName="chevron-small-right"
                    colorName="black"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                logOut();
              }}>
              <View style={styles.list}>
                <View style={styles.row}>
                  <EditProfileLogout iconName="logout" colorName="black" />
                  <Text style={styles.listTitle}>Logout</Text>
                </View>
                <View style={styles.row}>
                  <EditProfile
                    iconName="chevron-small-right"
                    colorName="black"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.header}>LEGAL</Text>
            <TouchableOpacity>
              <View style={styles.list}>
                <View style={styles.row}>
                  <EditProfilePrivacy iconName="security" colorName="black" />
                  <Text style={styles.listTitle}>Privacy</Text>
                </View>
                <View style={styles.row}>
                  <EditProfile
                    iconName="chevron-small-right"
                    colorName="black"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.list}>
                <View style={styles.row}>
                  <EditProfileLogout iconName="setting" colorName="black" />
                  <Text style={styles.listTitle}>Settings</Text>
                </View>
                <View style={styles.row}>
                  <EditProfile
                    iconName="chevron-small-right"
                    colorName="black"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal
        back
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(52, 52, 52, 0.6)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              bottom: 0,
              position: 'absolute',
              width: '100%',
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 5,
                width: '15%',
                alignSelf: 'center',
              }}
            />
            <View style={{marginTop: 20}}>
              <ImageBackground
                style={styles.profilePic}
                imageStyle={{borderRadius: 40}}
                source={
                  profilePicture == ''
                    ? require('../../assets/images/profile.png')
                    : {uri: profilePicture}
                }>
                <TouchableOpacity
                  style={{
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    backgroundColor: THEME,
                    padding: 5,
                    borderRadius: 40,
                  }}
                  onPress={() => pickPicture()}>
                  <EditProfilePic iconName="edit" colorName={WHITE} />
                </TouchableOpacity>
              </ImageBackground>
              <View style={[styles.inputView, {marginTop: 20}]}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="First Name"
                  placeholderTextColor={PLACEHOLDERTEXTCOLOR}
                  onChangeText={setFirstName}
                  value={firstName}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Last Name"
                  placeholderTextColor={PLACEHOLDERTEXTCOLOR}
                  onChangeText={setLastName}
                  value={lastName}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Password"
                  placeholderTextColor={PLACEHOLDERTEXTCOLOR}
                  secureTextEntry={true}
                  onChangeText={setPassword}
                  value={password}
                  editable={false}
                />
              </View>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => updateProfile()}>
                <Text style={styles.loginText}>UPDATE PROFILE</Text>
                {isUploadingProfile && (
                  <ActivityIndicator size="small" color="#fff" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default profile;
