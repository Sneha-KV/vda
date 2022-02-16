// import types
import AWS from 'aws-sdk';
import {
    INPUT_SUCESS, 
    INPUT_FAILURE,
    MESSAGE_FAIL,
    MESSAGE_SUCCESS,
    SESSION_FAIL,
    SESSION_SUCCESS,
    SESSION_ACTIVE
} from "./types";
import store from "../store";

// import ID creator
import { v4 as uuid} from 'uuid';

import GlobalProperties from '../properties/GlobalProperties';

// function that handles users message
export const userMessage = (message) => async (dispatch) => {
    try {
        dispatch({
            type : INPUT_SUCESS,
            payload: message
        })
    } catch (err) {
        dispatch({
            type: INPUT_FAILURE
        });
    }
}


// Sends the message to the bot - LEX connection etc
export const sendMessage = (message, sessionId = '') => async (dispatch) => {

    try {
        // let session_id = "";
        var lexruntime = new AWS.LexRuntimeV2({apiVersion: '2020-08-07'});
        var params = {
            botId: 'UJNS4QLLJS',
            botAliasId: 'CCSSPDWXSF',
            localeId:'en_US',
            text: message,
            sessionId: sessionId || window.propertyDetails.lexUserId,
            sessionState: { 
                    sessionAttributes : window.propertyDetails.miPropertySessionAttributes 
            }
        };
        if(sessionId) {
            params.requestAttributes = {
                                            sourceWebPage: window.propertyDetails.sourceDomain
                                        }
        }
        lexruntime.recognizeText(params, function(err, data) {
        
            if (err) {
              //alert(err.stack);
              //showError('Error:  ' + err.message + ' (see console for details)')
            }
            if (data) {
                window.propertyDetails.miPropertySessionAttributes = data.sessionState.sessionAttributes;
                dispatch({
                    type: MESSAGE_SUCCESS, 
                    payload: {messages: data.messages, sessionState: data.sessionState}
                });
            }
        });

        
    } catch (error) {
        dispatch({type: MESSAGE_FAIL})
    }
}

// create a session - API Call
export const createSession = () =>  (dispatch) => {
    const sessionId = uuid();
    
    try {
        // create session ID
        window.propertyDetails.lexUserId = sessionId;
        store.dispatch(sendMessage('welcome', sessionId));
        dispatch({
            type: "SESSION_SUCCESS",
            payload: {
                session_id: sessionId,
                brand_code:  window.propertyDetails.propertyBrandCode
            }
        });
       
    } catch (e) {

    }
}

export const getSessionInfo = () => (dispatch) => {
    const brand = window.propertyDetails.propertyBrandCode;
    let session_info = localStorage.getItem(`session_id_${brand}`);
    
    if(!!localStorage.getItem(`session_id_${brand}`)) {
        var lexruntime = new AWS.LexRuntimeV2({apiVersion: '2020-08-07'});
        var params = {
            botId: 'UJNS4QLLJS',
            botAliasId: 'CCSSPDWXSF',
            localeId:'en_US',
            sessionId: session_info,
        };
    
        lexruntime.getSession(params, function(err, data) {
        
            if (err) {
            //alert(err.stack);
                console.error('*-*-*-*', err);
                localStorage.removeItem(`session_id_${brand}`);
                localStorage.removeItem(`messages_${brand}`);
                store.dispatch(createSession());

            }
            if (data) {
                console.log('*****************',data);
                dispatch({
                    type: SESSION_ACTIVE, 
                    payload: {messages: JSON.parse(localStorage[`messages_${brand}`])}
                });
            }
        });
    };
}