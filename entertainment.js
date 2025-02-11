// Entertainment card click handlers
function handleTelevisionClick() {
    console.log('Opening TV...');
    
    // Hide all views first
    document.querySelectorAll('.content').forEach(view => {
        if (view) {
            view.style.display = 'none';
        }
    });
    
    // Hide sidebar
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.display = 'none';
    }
    
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'tv-loading';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <img src="logos/television.png" alt="TV" class="tv-logo">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading TV channels...</span>
            </div>
            <div class="text-white mt-3">Setting up TV channels...</div>
        </div>
    `;
    document.body.appendChild(loadingScreen);

    // First deactivate any running apps
    var deactivateApps = new CreateJAPITObjectForWIXPSvc();
    deactivateApps.Cookie = 1049;
    deactivateApps.CmdType = "Change";
    deactivateApps.Fun = "ApplicationControl";
    deactivateApps.CommandDetails = {
        "ApplicationState": "DeactivateAll"
    };
    sendWIxPCommand(deactivateApps);
    delete deactivateApps;

    // Switch to TV source first
    var setSource = new CreateJAPITObjectForWIXPSvc();
    setSource.Cookie = 1048;
    setSource.CmdType = "Change";
    setSource.Fun = "Source";
    setSource.CommandDetails = {
        "TuneToSource": "MainTuner"
    };
    sendWIxPCommand(setSource);
    delete setSource;

    // Initialize TV channels
    //openTV();

    // Register callback for channel setup
    registerJAPITCallback("ChannelList", function(response) {
        if (response.CommandDetails && response.CommandDetails.Status === "Success") {
            console.log("TV channels setup successfully");
            
            // Launch TV app in fullscreen
            var launchTV = new CreateJAPITObjectForWIXPSvc();
            launchTV.Cookie = 1050;
            launchTV.CmdType = "Change";
            launchTV.Fun = "ApplicationControl";
            launchTV.CommandDetails = {
                "ApplicationDetails": {
                    "ApplicationName": "TVChannels",
                    "ApplicationParameters": {
                        "StartMode": "FullScreen",
                        "TvhostMode": "Active",
                        "LaunchState": "foreground",
                        "DefaultChannel": default_chan_no.toString()
                    }
                },
                "ApplicationState": "Activate"
            };
            sendWIxPCommand(launchTV);
            delete launchTV;

            // Remove loading screen after successful launch
            setTimeout(() => {
                const loadingScreen = document.querySelector('.tv-loading');
                if (loadingScreen) {
                    loadingScreen.remove();
                }
            }, 2000);
        } else {
            console.error("Failed to setup TV channels");
            handleTVError();
        }
    });
}

function handleTVError() {
    // Remove loading screen
    const loadingScreen = document.querySelector('.tv-loading');
    if (loadingScreen) {
        loadingScreen.remove();
    }
    
    // Show all views again
    document.querySelectorAll('.content').forEach(view => {
        if (view.classList.contains('entertainment-view')) {
            view.style.display = 'block';
        }
    });
    
    // Show sidebar
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.display = 'block';
    }
    
    // Show error toast
    const errorToast = `
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div class="toast" role="alert">
                <div class="toast-header bg-danger text-white">
                    <strong class="me-auto">Error</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body">
                    Unable to setup TV channels. Please check your connection and try again.
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', errorToast);
    const toast = new bootstrap.Toast(document.querySelector('.toast'));
    toast.show();
}

function handleTVClick() {
    console.log('Opening TV...');
    openTV();
}

function handleMoviesClick() {
    console.log('Opening Movies...');
    openMovies();
    

}

function handleRadioClick() {
    console.log('Opening Radio...');
    
    // Hide default view
    document.querySelector('.default-view').style.display = 'none';
    
    // Hide entertainment view
    document.querySelector('.entertainment-view').style.display = 'none';
    
    // Keep sidebar visible
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.display = 'block';
    }
    
    // Show radio view
    const radioView = document.querySelector('.radio-view');
    if (radioView) {
        radioView.style.display = 'block';
        radioView.style.marginLeft = '15%'; // Align with sidebar
    }

    // Update button states
    const entertainmentButton = document.getElementById('entertainmentButton');
    if (entertainmentButton) {
        entertainmentButton.classList.add('active');
    }

    // Focus first radio card
    setTimeout(() => {
        const firstCard = document.querySelector('.radio-card[data-type="radio1"]');
        if (firstCard) {
            firstCard.focus();
        }
    }, 100);

    // Initialize radio channels
    openRadio();
}

// Add handler for radio channel clicks
function handleRadioChannelClick(channelNumber) {
    console.log('Opening Radio Channel:', channelNumber);
    
    // Clear active state from all radio cards
    document.querySelectorAll('.radio-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active state to clicked card
    const clickedCard = document.querySelector(`.radio-card[data-type="radio${channelNumber}"]`);
    if (clickedCard) {
        clickedCard.classList.add('active');
    }

    // Use existing radio channel selection function
    selectRadioChannel(channelNumber);
}

function handleNetflixClick() {
    console.log('Opening Netflix...');
    // Add your Netflix handling code
    applicationControl("Netflix", "Activate");
}

function handleYouTubeClick() {
    console.log('Opening YouTube...');
    // Add your YouTube handling code
    applicationControl("YouTube", "Activate");
}

function handleEntertainmentClick() {
    console.log('Opening Entertainment...');
    
    // Register JAPIT focus handling
    //handleEntertainmentFocus();
    
    // Hide default view
    document.querySelector('.default-view').style.display = 'none';
    
    // Show entertainment view
    document.querySelector('.entertainment-view').style.display = 'block';
    
    // Focus first entertainment card
    const tvCard = document.querySelector('.entertainment-card[data-type="tv"]');
    if (tvCard) {
        // Set JAPIT focus
        var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
        JAPITObjForWIXPSvc.Cookie = 1041;
        JAPITObjForWIXPSvc.CmdType = "Change";
        JAPITObjForWIXPSvc.Fun = "UserInputControl";
        JAPITObjForWIXPSvc.CommandDetails = {
            "FocusSettings": {
                "SetFocusTo": "tv"
            }
        };
        sendWIxPCommand(JAPITObjForWIXPSvc);
        delete JAPITObjForWIXPSvc;
        
        tvCard.focus();
    }
}

function clearEntertainmentActive() {
    document.querySelectorAll('.entertainment-card').forEach(card => {
        card.classList.remove('active');
    });
}

// Kayo Sports handler
// function handleKayoSportsClick() {
//     console.log('Opening Kayo Sports...');
//     clearEntertainmentActive();

    function handleKayoSportsClick() {
        console.log('Opening Kayo Sports...');
        // Add your Kayo Sports handling code
        applicationControl("KayoSports", "Activate");
    }
    

    
    

// Disney+ handler
function handleDisneyPlusClick() {
    console.log('Opening Disney+...');
    // Add your Disney+ handling code
    applicationControl("DisneyPlus", "Activate");
}

// 7plus handler
function handle7PlusClick() {
    console.log('Opening 7plus...');
    // Add your 7plus handling code
    applicationControl("7plus", "Activate");
} 