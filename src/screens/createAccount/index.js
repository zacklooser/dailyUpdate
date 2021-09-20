import React, {useState, useEffect} from 'react';
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
import {store} from '../../redux/store';
import {useSelector, useDispatch} from 'react-redux';
import {showToast} from '../../utils/toast';
import {THEME, PLACEHOLDERTEXTCOLOR} from '../../utils/colors';
import {VerticalLine} from '../../components/verticleLine/verticleLine';
import {
  TextInputIcon,
  TextInputIcon1,
} from '../../components/textInputIcon/textInputIcon';
import {BackgroundTheme} from '../../components/background/background';
import {LOGIN} from '../../redux/actions/loginActions';
import {styles} from './style';

export default function createAccount({navigation}) {
  const [firstName, setFirstName] = useState('zack');
  const [lastName, setLastName] = useState('looser');
  const [email, setEmail] = useState('zacklooser@gmail.com');
  const [password, setPassword] = useState('zack2737');
  const [isModalVisible, setModalVisible] = React.useState(false);
  const state = useSelector(state => state.login);
  const dispatch = useDispatch();

  const toggleModal = value => {
    setModalVisible(value);
  };

  const AddUserData = userData => {
    firestore()
      .collection('Users')
      .doc(email)
      .set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        profile:'',
      })
      .then(() => {
        dispatchLoginAction(userData);
      });
  };
  const dispatchLoginAction = userData => {
    var userLoginData = {};
    userLoginData.userData = userData;
    userLoginData.credential = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      profile:'',
    };
    userLoginData.remember = true;
    dispatch({type: LOGIN, payload: userLoginData});
    toggleModal(false);
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'BottomTab'}],
      }),
    );
    showToast('User created & signed in!');
  };
  const onCreateAccount = () => {
    if (email === '') return showToast('Please enter your email');
    else if (password === '') return showToast('Please enter your password');
    toggleModal(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        AddUserData(result);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          showToast('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          showToast('That email address is invalid!');
        } else showToast(error.code);
        toggleModal(false);
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
              <TextInputIcon1 iconName="person" />
            </View>
            <VerticalLine />
            <TextInput
              style={styles.TextInput}
              placeholder="First Name"
              placeholderTextColor={PLACEHOLDERTEXTCOLOR}
              onChangeText={setFirstName}
              value={firstName}
            />
          </View>
          <View style={styles.inputView}>
            <View style={styles.iconContainer}>
              <TextInputIcon1 iconName="person" />
            </View>
            <VerticalLine />
            <TextInput
              style={styles.TextInput}
              placeholder="Last Name"
              placeholderTextColor={PLACEHOLDERTEXTCOLOR}
              onChangeText={setLastName}
              value={lastName}
            />
          </View>

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
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => onCreateAccount()}>
            <Text style={styles.loginText}>Create Account</Text>
            {isModalVisible && <ActivityIndicator size="small" color="#fff" />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.forgot_button}>
              Already have account? <Text style={{color: THEME}}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
