import createDataContext from './createDataContext';

const contactReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_contact':
            return state;
        case 'add_contact':
            let st = { ...state, contact: [...state.contact, action.payload] };
            return st;

        case 'update_contact':
            return {
                ...state, contact: state.contact.map((item, index) => {
                    if (item.key === action.payload.key) {
                        return item = action.payload;
                    }
                    return item;
                })
            };
        default:
            return state;
    }
};

const fetchContact = dispatch => () => {
    dispatch({ type: 'fetch_contact' });
};
const addContact = dispatch => (contact) => {
    dispatch({ type: 'add_contact', payload: contact });
};
const updateContact = dispatch => (contact) => {
    dispatch({ type: 'update_contact', payload: contact });
};

export const { Provider, Context } = createDataContext(
    contactReducer,
    { fetchContact, addContact, updateContact },
    { contact: [] }
);