import React, { useState } from 'react';
import { StyleSheet, Button, TextInput, View, Text, Image } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';
import Camera from '../components/Camera';
import useSaveContact from '../hooks/useSaveContact';

const reviewSchema = yup.object({
    name: yup.string()
        .required()
        .min(4),
    mobile: yup.string()
        .required()
        .min(10),

    landline: yup.string()
        .required()
        .min(10),
});

const ContactForm = ({ pickImage, image, buttonText, contact, onCancel, isForUpdate = false }) => {
    const [saveContact] = useSaveContact();
    const [isfavorite, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(isfavorite => !isfavorite);
    }
    var initVal = { key: '', name: '', mobile: '', landline: '', isfavorite: isfavorite, imageSource: '' }
    if (isForUpdate) {
        initVal = { key: contact.key, name: contact.name, mobile: contact.mobile, landline: contact.landline, isfavorite: contact.isfavorite, imageSource: contact.imageSource }

    }
    return (
        <View>
            <Formik
                initialValues={initVal}
                validationSchema={reviewSchema}
                onSubmit={(values, actions) => {
                    values.imageSource = image;
                    values.isfavorite = isfavorite;
                    saveContact(values, isForUpdate);
                    image = '';
                    actions.resetForm();
                }}
            >
                {props => (
                    <View>
                        <View style={styles.imageContainer}>
                            <Camera ImagePick={() => pickImage()} image={image} />
                            {/* <Image source={camera}
                style={styles.imagedef} /> */}
                        </View>
                        <TextInput
                            style={globalStyles.input}
                            placeholder='Name'
                            onChangeText={props.handleChange('name')}
                            onBlur={() => props.handleBlur('name')}
                            value={props.values.name}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.name && props.errors.name}</Text>

                        <TextInput
                            style={globalStyles.input}
                            placeholder='Mobile'
                            onChangeText={props.handleChange('mobile')}
                            onBlur={() => props.handleBlur('mobile')}
                            value={props.values.mobile}
                            keyboardType='phone-pad'
                        />
                        <Text style={globalStyles.errorText}>{props.touched.mobile && props.errors.mobile}</Text>

                        <TextInput
                            style={globalStyles.input}
                            placeholder='Lanline Number'
                            onChangeText={props.handleChange('landline')}
                            onBlur={() => props.handleBlur('landline')}
                            value={props.values.landline}
                            keyboardType='phone-pad'
                        />
                        <Text style={globalStyles.errorText}>{props.touched.landline && props.errors.landline}</Text>

                        <View style={styles.fav}>
                            <Text style={styles.favText}>Favorite</Text>
                            <Switch trackColor={{ false: "#e63946", true: "#a8dadc" }}
                                thumbColor={isfavorite ? "#00b294" : "#f0f0f0"}
                                onValueChange={toggleSwitch}
                                value={isForUpdate ? props.values.isfavorite : isfavorite}


                            />
                        </View>
                        <View style={styles.btnView}>
                            <TouchableOpacity onPress={() => props.handleSubmit()}>
                                <View style={styles.btnSubmit}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{buttonText}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onCancel()}>
                                <View style={{ ...styles.btnSubmit, ...styles.btnCancel }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Cancel</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>

        </View >
    );
}
const styles = StyleSheet.create({
    fav: {
        flexDirection: "row",
        margin: 10,
        marginBottom: 20
    },
    favText: {
        marginRight: 20,
        fontSize: 20,
        color: '#457b9d',
        fontWeight: 'bold'

    },
    imageContainer: {
        alignItems: "center",
        margin: 25,
        height: 150,
        width: 150,
        borderRadius: 75,
        backgroundColor: '#b0b0b0',
        alignSelf: 'center'
    },
    btnSubmit: {
        height: 50,
        width: 120,
        borderRadius: 10,
        borderColor: '#b0b0b0',
        borderWidth: .5,
        borderBottomWidth: 2.5,
        backgroundColor: '#00b294',
        alignItems: 'center',
        justifyContent: 'center'

    },
    btnCancel: {
        backgroundColor: '#e63946',
    },
    btnView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 20
    }

});
export default ContactForm;