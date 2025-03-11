// Handle JAPIT button clicks
function handleJapitButtonClick(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const action = element.getAttribute('data-action');
    console.log('JAPIT button click:', elementId, 'Action:', action);

    switch (action) {
        // Entertainment section
        case 'entertainment':
            console.log('Entertainment button clicked via JAPIT button handler');
            handleEntertainmentClick();
            break;
        case 'television':
            handleTelevisionClick();
            break;
        case 'movies':
            handleMoviesClick();
            break;
        case 'radio':
            handleRadioClick();
            break;
        case 'spotify':
            handleSpotifyClick();
            break;
        case 'youtube':
            handleYouTubeClick();
            break;
        case 'kayo':
            handleKayoClick();
            break;
        case 'disney-plus':
            handleDisneyPlusClick();
            break;
        case '7plus':
            handle7PlusClick();
            break;
        
            
        // Hospital Info section
        case 'hospital-info':
            console.log('Hospital Info button clicked via JAPIT button handler');
            handleHospitalInfoClick();
            break;
        case 'welcome':
            handleWelcomeClick();
            break;
        case 'visiting':
            handleVisitingClick();
            break;
        case 'safety':
            handleSafetyClick();
            break;
        case 'maps':
            handleMapsClick();
            break;
        case 'rights':
            handleRightsClick();
            break;
        case 'reach':
            handleReachClick();
            break;

            //mycare section
            case 'mycare':
            console.log('Mycare button clicked via JAPIT button handler');
            handleMycareClick();
            break;
        case 'management-and-discharge':
            handleManagementandDischargeClick();
            break;
        case 'carers-survey':
            handleCarersSurveyClick();
            break;
        case 'patient-survey':
            handlePatientSurveyClick();
            break;
        case 'blacktown-surveys':
            handleBlacktownSurveysClick();
            break;

             //clinical services section
             case 'clinical services':
                console.log('Clinical services button clicked via JAPIT button handler');
                handleClinicalServicesClick();
                break;
            case 'clinical-sharing':
                handleClinicalSharingClick();
                break;
    
        
    }
}

function init() {
    // Wait for DOM to be fully loaded before trying to focus
    setTimeout(() => {
        const entertainmentButton = document.getElementById('entertainmentButton');
        if (entertainmentButton) {
            entertainmentButton.focus();
            
            // Set JAPIT focus
            var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
            JAPITObjForWIXPSvc.Cookie = 3041;
            JAPITObjForWIXPSvc.CmdType = "Change";
            JAPITObjForWIXPSvc.Fun = "UserInputControl";
            JAPITObjForWIXPSvc.CommandDetails = {
                "FocusSettings": {
                    "SetFocusTo": "entertainment"
                }
            };
            sendWIxPCommand(JAPITObjForWIXPSvc);
            delete JAPITObjForWIXPSvc;
        } else {
            console.log('Entertainment button not found');
        }
    }, 100);

    // Register JAPIT button click handler
    if (window.JAPITWIXPPlugin) {
        window.JAPITWIXPPlugin.WebIXPOnButtonClick = handleJapitButtonClick;
    }
}


//Clinical Serivices button click and focus
function init() {
    // Wait for DOM to be fully loaded before trying to focus
    setTimeout(() => {
        const clinicalServicesButton = document.getElementById('clinicalServicesButton');
        if (clinicalServicesButton) {
            clinicalServicesButton.focus();
            
            // Set JAPIT focus
            var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
            JAPITObjForWIXPSvc.Cookie = 3041;
            JAPITObjForWIXPSvc.CmdType = "Change";
            JAPITObjForWIXPSvc.Fun = "UserInputControl";
            JAPITObjForWIXPSvc.CommandDetails = {
                "FocusSettings": {
                    "SetFocusTo": "clinical-services"
                }
            };
            sendWIxPCommand(JAPITObjForWIXPSvc);
            delete JAPITObjForWIXPSvc;
        } else {
            console.log('mycare button not found');
        }
    }, 100);

    // Register JAPIT button click handler
    if (window.JAPITWIXPPlugin) {
        window.JAPITWIXPPlugin.WebIXPOnButtonClick = handleJapitButtonClick;
    }
}

//CLINICAL SERVICES button click and focusfunction init() {
    //MYCARE button click and focus
function init() {
    // Wait for DOM to be fully loaded before trying to focus
    setTimeout(() => {
        const mycareButton = document.getElementById('mycareButton');
        if (mycareButton) {
            mycareButton.focus();
            
            // Set JAPIT focus
            var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
            JAPITObjForWIXPSvc.Cookie = 3041;
            JAPITObjForWIXPSvc.CmdType = "Change";
            JAPITObjForWIXPSvc.Fun = "UserInputControl";
            JAPITObjForWIXPSvc.CommandDetails = {
                "FocusSettings": {
                    "SetFocusTo": "mycare"
                }
            };
            sendWIxPCommand(JAPITObjForWIXPSvc);
            delete JAPITObjForWIXPSvc;
        } else {
            console.log('mycare button not found');
        }
    }, 100);

    // Register JAPIT button click handler
    if (window.JAPITWIXPPlugin) {
        window.JAPITWIXPPlugin.WebIXPOnButtonClick = handleJapitButtonClick;
    }
}
