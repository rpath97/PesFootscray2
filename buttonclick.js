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
        case 'netflix':
            handleNetflixClick();
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
    }
}

// Register button click handler with JAPIT
if (window.JAPITWIXPPlugin) {
    window.JAPITWIXPPlugin.WebIXPOnButtonClick = handleJapitButtonClick;
}
