import { useContext } from 'react';
import { Context as ContactContext } from '../context/ContactContext';
import { navigate } from '../navigationRef';
import uuid from 'react-native-uuid';

export default () => {
    const { addContact, updateContact } = useContext(ContactContext);

    const saveContact = (contact, isForUpdate = false) => {
        if (isForUpdate) {
            updateContact(contact);
        }
        else {
            contact.key = uuid.v1();
            addContact(contact);
        }
        navigate('Home');
    };

    return [saveContact];
};