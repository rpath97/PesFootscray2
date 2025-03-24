

function handleMoviesClick() {
    console.log('Opening Movies...');
    //setting previous and current page
    current_page = 'movies';
    openMovies('Activate');
    

}

function handleRadioClick() {
    console.log('Opening Radio...');
    
    // Hide default view
    //document.querySelector('.default-view').style.display = 'none';
    
    // Hide entertainment view
    document.querySelector('.entertainment-view').style.display = 'none';
    
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
    document.getElementById(current_page).style.display = 'block';

    //document.getElementById("tv_button").focus();

}


// Add entertainment casting handler
function handleCastingClick() {
    console.log('Opening Casting...');
    
    // Hide entertainment view
   // document.querySelector('.entertainment-view').style.display = 'none';
   current_page = 'phillips_cast';
    SelectCast('Activate');
    changeCDBstate('Deactivate');

    
    // // Create loading screen
  
} 