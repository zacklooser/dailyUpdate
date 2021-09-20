import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {CommonActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import i18n from "i18next";
import { initReactI18next, withTranslation } from "react-i18next";
import {THEME, PLACEHOLDERTEXTCOLOR} from '../../utils/colors';
import {VerticalLine} from '../../components/verticleLine/verticleLine';
import {
  TextInputIcon,
  EditProfileLogout,
} from '../../components/textInputIcon/textInputIcon';
import {BackgroundTheme} from '../../components/background/background';
import {showToast} from '../../utils/toast';
import {LOGIN} from '../../redux/actions/loginActions';
import {styles} from './style';

export default function login({navigation}) {
  const [email, setEmail] = useState('zack@gmail.com');
  const [password, setPassword] = useState('zack2737');
  const [isModalVisible, setModalVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const dispatch = useDispatch();

  const toggleModal = value => {
    setModalVisible(value);
  };

  const dispatchLoginAction = (userData, credential) => {
    var userLoginData = {};
    userLoginData.userData = userData;
    userLoginData.credential = credential;
    userLoginData.remember = rememberMe;
    dispatch({type: LOGIN, payload: userLoginData});
  };

  const onLogin = async () => {
    if (email === '') return showToast('Please enter your email');
    else if (password === '') return showToast('Please enter your password');
    toggleModal(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async result => {
        const user = await firestore().collection('Users').doc(email).get();
        dispatchLoginAction(result.user, user.data());
        toggleModal(false);
        showToast('User signed in!');
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'BottomTab'}],
          }),
        );
      })
      .catch(error => {
        toggleModal(false);
        if (error.code === 'auth/email-already-in-use') {
          showToast('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          showToast('That email address is invalid!');
        } else if (error.code === 'auth/user-not-found') {
          showToast('That email address not found!');
        } else {
          showToast(error.code);
        }
      });
  };

  return (
    <SafeAreaView>
      <BackgroundTheme></BackgroundTheme>
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../../assets/images/icon.png')}
          />
          <View style={styles.inputView}>
            <View style={styles.iconContainer}>
              <TextInputIcon iconName="mail" />
            </View>
            <VerticalLine />
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor={PLACEHOLDERTEXTCOLOR}
              onChangeText={setEmail}
              value={email}
            />
          </View>

          <View style={styles.inputView}>
            <View style={styles.iconContainer}>
              <TextInputIcon iconName="lock" />
            </View>
            <VerticalLine />
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor={PLACEHOLDERTEXTCOLOR}
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
            />
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
              <EditProfileLogout
                iconName={rememberMe ? 'heart' : 'hearto'}
                colorName={THEME}
                size={22}
              />
            </TouchableOpacity>
            <Text style={{marginLeft: 10}}>Remember me</Text>
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={() => onLogin()}>
            <Text style={styles.loginText}>LOGIN</Text>
            {isModalVisible && <ActivityIndicator size="small" color="#fff" />}
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateAccount')}>
            <Text>
              New to Daily Updates? <Text style={{color: THEME}}>Join us</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
