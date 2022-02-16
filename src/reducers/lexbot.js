// import types
import {
    INPUT_SUCESS, 
    INPUT_FAILURE,
    MESSAGE_FAIL,
    MESSAGE_SUCCESS,
    SESSION_FAIL,
    SESSION_SUCCESS,
    SESSION_ACTIVE
} from "../actions/types";

// import Global Properties
import GlobalProperties from "../properties/GlobalProperties";

// Initial state
const initialState = {
    messages : []
}


// Switch statement
const lexMessagesActions =  (state = initialState, action ) => {
    const {type, payload} = action;
    let { messages} = state;
    let brand = window.propertyDetails.propertyBrandCode;

    switch(type) {
        case INPUT_SUCESS : 
            messages = [...messages, {message: payload, type: "user"}];
            localStorage[`messages_${brand}`] = JSON.stringify(messages);
            console.log(messages)
            return {
                ...state,
                messages
            };
        case INPUT_FAILURE : 
            return {
                ...state
            };
        case SESSION_SUCCESS: 
            brand = payload["brand_code"];
            localStorage.setItem(`session_id_${brand}`, payload["session_id"]);
            localStorage.setItem(`messages_${brand}`, JSON.stringify(messages));
            return {
                ...state
            };
        case SESSION_FAIL: 
            return {
                ...state
            };
        case SESSION_ACTIVE: console.log(payload) ;
            messages = [...messages, ...payload['messages']]
            return {
                ...state,
                messages
            };
        case MESSAGE_SUCCESS:
            messages = [...messages, {
                message: payload,
                type: "bot"
            }]
            localStorage[`messages_${brand}`] = JSON.stringify(messages);
            return {
                ...state,
                messages
            };
        case MESSAGE_FAIL:
            return {
                ...state
            };
        default: 
            return {
                ...state
            }
    }
};

export default lexMessagesActions