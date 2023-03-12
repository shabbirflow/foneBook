import { configureStore, createSlice } from "@reduxjs/toolkit";

const defaultContacts = {
    addModal: false,
    contacts: [],
    singleView: false,
    inSingleView: {}
}

const contactSlice = createSlice({
    name: 'contacts',
    initialState: defaultContacts,
    reducers:{
        hideAddModal: (state) => {
            state.addModal = false;
        },
        showAddModal: (state) => {
            state.addModal = true;
        },
        addContact: (state, action) => {
            const newContact = {
                contact: action.payload.contact,
                name: action.payload.name,
                id: action.payload.id,
                email: action.payload.email
            }
            // console.log(newContact);
            state.contacts.push(newContact);
            // console.log(state.contacts);
        },
        setInitial: (state, action) => {
            state.contacts = action.payload;
        },
        showSingle: (state, action) => {
            state.singleView = true;
            state.inSingleView = action.payload
        },
        hideSingle: (state) => {
            state.singleView = false;
            state.inSingleView = {};
        },
        update: (state, action) => {
            const item = state.contacts.find((x) => x.id === action.payload.id);
            item.name = action.payload.name;
            item.contact = action.payload.contact;
            item.email = action.payload.email;
        },
        deleteContact: (state, action) => {
            state.contacts = state.contacts.filter(x => x.id != action.payload);
        }

    }
})

const contactStore = configureStore({
    reducer: contactSlice.reducer
})



export const contactActions = contactSlice.actions;

export default contactStore;