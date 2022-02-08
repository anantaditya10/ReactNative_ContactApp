import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, Button, Alert } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import Contacts from '../components/Contacts';
import { NavigationEvents } from 'react-navigation'
import { MaterialIcons } from '@expo/vector-icons';
import { Context as ContactContext } from '../context/ContactContext';
const HomeScreen = ({ navigation }) => {
    const { state, fetchContact } = useContext(ContactContext);
    const sortFunction = (a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());

    }
    return (
        <View style={{ flex: 1 }}>
            <NavigationEvents onWillFocus={fetchContact} />
            <FlatList data={state.contact.sort(sortFunction)} renderItem={({ item }) => (
                <TouchableOpacity onPress={() => { navigation.navigate('UpdateContact', { item: item }) }}>
                    <Contacts>
                        <Image source={item.imageSource === '../../assets/user.png' ?
                            require('../../assets/user.png') : { uri: item.imageSource }} style={{ height: 30, width: 30, borderRadius: 15, marginRight: 20 }} />
                        <Text style={globalStyles.titleText}>{item.name}</Text>
                    </Contacts>
                </TouchableOpacity>
            )} keyExtractor={(item) => item.key} />
            <MaterialIcons
                name='add'
                size={24}
                style={styles.modalToggle}
                onPress={() => navigation.navigate('AddContact')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    modalToggle: {
        margin: 10,
        backgroundColor: '#2ec4b6',
        padding: 15,
        borderRadius: 50,
        alignSelf: 'flex-end',
        color: 'white',

    },
    txtHeader: {
        fontSize: 24,
        alignSelf: 'center',
        padding: 10
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    }
});
export default HomeScreen;