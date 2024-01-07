import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamsList } from "features/navigation/Navigator"

import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import EncryptedStorage from 'react-native-encrypted-storage'

import { CustomSafeAreaView, Heading1, CustomTextInput } from 'common/components';
import { loginImages } from 'common/assets/images';
import { palettes } from 'common/theme';

const rnBiometrics = new ReactNativeBiometrics();
interface Props {
  navigation: StackNavigationProp<RootStackParamsList, "Login">
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('email address is required'),
  password: Yup.string().min(8, 'password is too short').required('password is required'),
});

const registerBiometric = async (email: string, password: string) => {
  const { available, biometryType } =
    await rnBiometrics.isSensorAvailable();

  // Biometrics is a generic type for Android only
  if (!available || biometryType !== BiometryTypes.Biometrics) {
    Alert.alert(
      'Opps!',
      'Face ID is not available on this device.',
    );
    return;
  }

  if (available && biometryType === BiometryTypes.Biometrics) {
    Alert.alert(
      'Biometric',
      'Would you like to enable biometric authentication for the next time?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            // generate a signed key
            const { publicKey } = await rnBiometrics.createKeys();

            // save `credential` and `publicKey` in the local storage to use it during Face ID authentication
            // as this is for demo purpose only
            // public key supposed to store in server side
            try {
              await EncryptedStorage.setItem(
                "credentials",
                JSON.stringify({
                  userid: email,
                  password: password,
                  publicKey: publicKey
                })
              );
            } catch (error) {
              Alert.alert(error.message)
            }
          },
        }
      ],
    );
  }
}

const Login = ({ navigation }: Props) => {
  const handleSubmit = async (values: { email: string; password: string }) => {

    try {
      // get stored data
      // it will be verified across server side for the signed adata
      const credentials = await EncryptedStorage.getItem("credentials");

      if (credentials) {
        const { success } = await rnBiometrics.simplePrompt({
          promptMessage: 'Confirmation',
        });

        if (success) {
          // navigate to after login successfully
          navigation.navigate('History');
        }
      }
      else {
        registerBiometric(values.email, values.password)
      }
    } catch (error) {
      Alert.alert(error.message)
    }
  };

  return (
    <CustomSafeAreaView normalView={true}>
      <View style={styles.imgContainerStyle}>
        <Image style={styles.logoStyle} source={loginImages.logoIcon} resizeMode="contain" />
      </View>

      <View style={styles.containerStyle}>
        <Heading1 title={'Login to your account'} />

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, setErrors, handleSubmit, values, errors }) => (
            <View>
              <CustomTextInput
                placeholder={'email address'}
                placeholderTextColor={palettes.lightgrey}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                onFocus={() => setErrors({ email: null })}
                value={values.email}
                error={errors.email}
              />

              <CustomTextInput
                placeholder={'password'}
                placeholderTextColor={palettes.lightgrey}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                onFocus={() => setErrors({ password: null })}
                value={values.password}
                secureTextEntry={true}
                error={errors.password}
              />

              <TouchableOpacity style={styles.submitBtnStyle} onPress={handleSubmit}>
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  imgContainerStyle: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    width: '30%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  containerStyle: {
    flex: 0.6,
  },
  submitBtnStyle: {
    marginTop: 25,
    backgroundColor: palettes.primaryColor,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textStyle: {
    color: palettes.white,
  },
});

export default Login;
