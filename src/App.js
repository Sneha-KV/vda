import { useState } from 'react';
// impoorting dependencies
import './App.scss';
import './assets/brandStyles.scss';
import './assets/iconStyles.scss'
import GlobalProperties from './properties/GlobalProperties';
// import 'bootstrap/dist/css/bootstrap.min.css';

// Import redux components
import {Provider} from "react-redux";
import store from "./store";
import AWS from 'aws-sdk';

// Import actions

import { createSession, getSessionInfo } from "./actions/lexbot"
// Import Chat component
import Chat from "./components/chat/Chat";

import { useEffect } from 'react';

// Connect application to redux


const App = () => {
  const [initData, setInitData] = useState();

  const addPropertiesScript = () => {
    if(!window.propertyDetails.propertyBrandCode) return;
    let brandcode = window.propertyDetails.propertyBrandCode;  
    // src\properties\Ge.js
    import(`/src/properties/${brandcode[0]}${brandcode.slice(1).toLowerCase()}.js`).then( messages => {
        window.propertyDetails.brandMessages = messages.Properties;
        // setWelcomeMsg(window.propertyDetails.brandMessages.welcome_msg);
    });
  }
  window.onmessage = function(e) {
    if (e.data && e.data.env_is_prod === 'true') {
        // alert('It works!');
        setInitData(e.data);
        window.propertyDetails.propertyMarshaCode = e.data.mrshaCode || e.data.prop_marsha_code|| window.propertyDetails.propertyMarshaCode;
        window.propertyDetails.propertyName = e.data.prop_name;
        window.propertyDetails.propertyBrandCode = e.data.brndCode || window.propertyDetails.propertyBrandCode;
        window.propertyDetails.sourceDomain = e.data.page_domain_name;
        AWS.config.region = 'us-east-1'; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-east-1:55428433-ea9e-4b6d-b60e-41e1aaf2be8d',       
        });
        // window.propertyDetails.lexUserId = 'MIWebPropertyBot' + Date.now();
        window.propertyDetails.miPropertySessionAttributes = {
            "marsha":window.propertyDetails.propertyMarshaCode,
            "marshaCode":window.propertyDetails.propertyMarshaCode,
            "propertyName":window.propertyDetails.propertyName, 
            "propertyBrandCode":window.propertyDetails.propertyBrandCode
        };
        addPropertiesScript();
    }
  };

  useEffect(() => {
    if(!initData) return;
    if(localStorage[`session_id_${window.propertyDetails.propertyMarshaCode}`]) 
      store.dispatch(getSessionInfo());
    else
      store.dispatch(createSession());

  },[initData]);

  // useEffect(() => {
  //   const dataElement = document.getElementById('chat-bot-data');
  //   if(!dataElement) return;
  //   const bot_data = JSON.parse(dataElement.getAttribute('data-property-info'));
  //     setInitData(bot_data);
  //       window.propertyDetails.propertyMarshaCode = bot_data.mrshaCode || bot_data.prop_marsha_code|| window.propertyDetails.propertyMarshaCode;
  //       window.propertyDetails.propertyName = bot_data.prop_name;
  //       window.propertyDetails.propertyBrandCode = bot_data.brndCode || window.propertyDetails.propertyBrandCode;
  //       window.propertyDetails.sourceDomain = bot_data.page_domain_name;
  //       AWS.config.region = 'us-east-1'; // Region
  //       AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  //               IdentityPoolId: 'us-east-1:55428433-ea9e-4b6d-b60e-41e1aaf2be8d',       
  //       });
  //       // window.propertyDetails.lexUserId = 'MIWebPropertyBot' + Date.now();
  //       window.propertyDetails.miPropertySessionAttributes = {
  //           "marsha":window.propertyDetails.propertyMarshaCode,
  //           "propertyName":window.propertyDetails.propertyName, 
  //           "propertyBrandCode":window.propertyDetails.propertyBrandCode
  //       };
  //       addPropertiesScript();

  // }, []);
  return (
    <Provider store={store}>
      {initData && <Chat />}
    </Provider>
    
  );
}



export default App;
