function handleMoviesClick() {
    console.log('Opening Movies...');
    
    //setting previous and current page
    previous_page = current_page;
    current_page = 'movies';
    
    // Store the activeSubmenuId if not already set by apiMenuCreation.js
    if (typeof activeSubmenuId === 'undefined' || !activeSubmenuId) {
        activeSubmenuId = 'entertainment_menu';
    }
    
    // Hide current view
    if (document.getElementById(previous_page)) {
        document.getElementById(previous_page).style.display = 'none';
    }
    
    openMovies('Activate');
    setMoviesKeys();
}

function handleRadioClick() {
    console.log('Opening Radio...');
    
    // Hide default view
    //document.querySelector('.default-view').style.display = 'none';
    
    // Hide entertainment view
    document.querySelector('#entertainment_menu').style.display = 'none';
    
    // Keep sidebar visible
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.display = 'none';
    }
    
    // Show radio view
    const radioView = document.querySelector('.radio-view');
    if (radioView) {
        radioView.style.display = 'flex';
        //radioView.style.marginLeft = '15%'; // Align with sidebar
    }

    // First make sure to remove any radio channels from the TV app
    if (typeof removeRadioChannelsFromTV === 'function') {
        removeRadioChannelsFromTV();
    }

    // Initialize radio channels
    openRadio();
}

// Add handler for radio channel clicks
// function handleRadioChannelClick(channelNumber) {
//     console.log('Opening Radio Channel:', channelNumber);
    
//     // // Clear active state from all radio cards
//     // document.querySelectorAll('.radio-card').forEach(card => {
//     //     card.classList.remove('active');
//     // });
    
//     // // Add active state to clicked card
//     // const clickedCard = document.querySelector(`.radio-card[data-type="radio${channelNumber}"]`);
//     // if (clickedCard) {
//     //     clickedCard.classList.add('active');
//     // }

//     // Use existing radio channel selection function
//     selectRadioChannel(channelNumber);
// }

function handleEntertainmentClick() {
    console.log('Opening Entertainment...');

    //setting previous and current page
    previous_page = current_page;
    current_page = "entertainment_menu";

    document.getElementById(previous_page).style.display = 'none';
    document.getElementById(current_page).style.display = 'flex';

    //document.getElementById("tv_button").focus();

}


// Add entertainment casting handler
function handleCastingClick() {
    console.log('Opening Casting...');
    
    // Set navigation state
    previous_page = current_page;
    current_page = 'casting'; // Use 'casting' instead of 'phillips_cast' for consistency
    
    // Store the activeSubmenuId if not already set by apiMenuCreation.js
    if (typeof activeSubmenuId === 'undefined' || !activeSubmenuId) {
        activeSubmenuId = 'entertainment_menu';
    }
    
    // Hide current view
    if (document.getElementById(previous_page)) {
        document.getElementById(previous_page).style.display = 'none';
    }
    
    // Use the new naming for consistency or keep the legacy function
    SelectCast('Activate');
    changeCDBstate('Deactivate');
}

/**
 * This function enters the Movies module from API menu
 * @param {string} action - 'Activate' or 'Deactivate'
 */
function openMovies(action) {
    console.log('openMovies called with action:', action);
    
    if (action === 'Activate') {
        // Set movie controls
        setRcControlNone();
        
        // Display movies view
        document.getElementById('movies').style.display = 'flex';
        
        // Deactivate dashboard
        changeCDBstate('Deactivate');
    } else if (action === 'Deactivate') {
        // Hide movies view
        document.getElementById('movies').style.display = 'none';
        
        // Reset controls
        setRcControlSelective();
    }
}

/**
 * This function enters the Casting module from API menu
 * @param {string} action - 'Activate' or 'Deactivate'
 */
function openCasting(action) {
    console.log('openCasting called with action:', action);
    
    // Redirect to the legacy function to maintain compatibility
    SelectCast(action);
} 