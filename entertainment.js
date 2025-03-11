

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

function handleEntertainmentClick() {
    console.log('Opening Entertainment...');

    //setting previous and current page
    previous_page = current_page;
    current_page = "entertainment_menu";

    document.getElementById(previous_page).style.display = 'none';
    document.getElementById(current_page).style.display = 'block';

}

// function clearEntertainmentActive() {
//     document.querySelectorAll('.entertainment-card').forEach(card => {
//         card.classList.remove('active');
//     });
// }

// // Disney+ handler
// function handleDisneyPlusClick() {
//     console.log('Opening Disney+...');
//     // Add your Disney+ handling code
//     applicationControl("Disney+", "Activate");
// }

// // 7plus handler
// function handle7PlusClick() {
//     console.log('Opening 7plus...');
//     // Add your 7plus handling code
//     applicationControl("7plus", "Activate");
// }

// // Add these new handler functions

// function handleParamountClick() {
//     console.log('Opening Paramount+...');
//     applicationControl("Paramount+", "Activate");
// }

// function handleAppleTVClick() {
//     console.log('Opening Apple TV...');
//     applicationControl("Apple TV", "Activate");
// }

// function handle9NowClick() {
//     console.log('Opening 9 Now...');
//     applicationControl("9Now", "Activate");
// }

// function handle10PlayClick() {
//     console.log('Opening 10 Play...');
//     applicationControl("10 play", "Activate");
// }

// function handleBingeClick() {
//     console.log('Opening Binge...');
//     applicationControl("Binge", "Activate");
// }

// function handleABCiViewClick() {
//     console.log('Opening ABC iView...');
//     applicationControl("ABC iview", "Activate");
// }

// Add entertainment casting handler
function handleCastingClick() {
    console.log('Opening Casting...');
    
    // Hide entertainment view
   // document.querySelector('.entertainment-view').style.display = 'none';
    SelectCast('Activate');
    changeCDBstate('Deactivate');

    
    // // Create loading screen
  
} 