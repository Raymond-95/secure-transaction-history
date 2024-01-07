import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import { Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage'

const rnBiometrics = new ReactNativeBiometrics();

export const registerBiometric = async (email: string, password: string) => {

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

export const unlockWithBiometric = (email: string, password: string) => {

    return new Promise(async (resolve, reject) => {
        try {
            // get stored data
            // it will be verified across server side for the signed adata
            const credentials = await EncryptedStorage.getItem("credentials");

            if (credentials) {
                const { success } = await rnBiometrics.simplePrompt({
                    promptMessage: 'Confirmation',
                });

                if (success) {
                    resolve(true)
                }
                else {
                    reject('Failed to verify')
                }
            }
            else {
                registerBiometric(email, password)
                resolve(true)
            }
        } catch (error) {
            reject(error.message)
        }

    })
}