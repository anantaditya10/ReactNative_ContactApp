import React, { useState, useEffect } from 'react';
import { View, Alert, Platform } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import * as ImagePicker from 'expo-image-picker';
import ContactForm from '../components/ContactForm';
import * as Permissions from 'expo-permissions';
import { NavigationEvents } from 'react-navigation'
const AddContactScreen = ({ navigation }) => {

    const [image, setImage] = useState('../../assets/user.png');

    const onCancel = () => {
        navigation.navigate('Home');
    }

    useEffect(() => {
        getPermissionAsync()
    }, []);
    const getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            if (status !== 'granted') {
                alert('Sorry, we need camera permissions to make this work!');
            }
        }
    };
    const pickImage = () =>
        Alert.alert(
            "Pick/Capture Image",
            "",
            [
                {
                    text: "Browse Image",
                    onPress: () => browseImage(),
                    style: 'cancel'
                },
                { text: "Capture", onPress: () => captureImage() }
            ],
            { cancelable: false },
        );


    const browseImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });
            if (!result.cancelled) {
                setImage(result.uri)
                console.log(result);

            }

        } catch (E) {
            console.log(E);
        }
    };

    const captureImage = async () => {
        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });
            if (!result.cancelled) {
                setImage(result.uri)
                console.log(result);

            }

        } catch (E) {
            console.log(E);
        }
    };
    const clearData = () => setImage('../../assets/user.png');
    return (

        <View style={globalStyles.container}>
            <NavigationEvents onWillFocus={clearData} />
            <ContactForm
                pickImage={pickImage}
                image={image}
                buttonText='Save'
                onCancel={onCancel} />
        </View>

    );

}

export default AddContactScreen;