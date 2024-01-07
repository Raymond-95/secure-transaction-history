import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamsList } from "features/navigation/Navigator"

import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CustomSafeAreaView, Heading1, CustomTextInput } from 'common/components';
import { loginImages } from 'common/assets/images';
import { palettes } from 'common/theme';

interface Props {
  navigation: StackNavigationProp<RootStackParamsList, "Login">
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('email address is required'),
  password: Yup.string().min(8, 'password is too short').required('password is required'),
});

const Login = ({ navigation }: Props) => {
  const handleSubmit = (values: { email: string; password: string }) => {
    // navigate to after login successfully
    navigation.navigate('History');
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
                onFocus={() => setErrors({email: null})}
                value={values.email}
                error={errors.email}
              />

              <CustomTextInput
                placeholder={'password'}
                placeholderTextColor={palettes.lightgrey}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                onFocus={() => setErrors({password: null})}
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
