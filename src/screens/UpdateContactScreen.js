import React, { useState, useEffect } from 'react';
import { View, Alert, Platform } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import * as ImagePicker from 'expo-image-picker';
import ContactForm from '../components/ContactForm';
import * as Permissions from 'expo-permissions';

const UpdateContactScreen = ({ navigation }) => {
    const contact = navigation.getParam('item');

    const imgHandle = () => {
        console.log(contact.imageSource)
        if (contact.imageSource === '')

            return '../../assets/user.png'
        else
            return contact.imageSource;
    }
    const [image, setImage] = useState(imgHandle);
    // const toggleSwitch = () => {
    //     setIsEnabled(previousState => !previousState);
    //     console.log(isfavorite);
    // }
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
                Alert.alert('Sorry, we need camera permissions to make this work!');
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
    return (

        <View style={globalStyles.container}>
            <ContactForm
                pickImage={pickImage}
                image={image}
                buttonText='Update'
                contact={contact}
                onCancel={onCancel}
                isForUpdate={true} />
        </View>

    );
}
export default UpdateContactScreen;