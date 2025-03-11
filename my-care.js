// function handleMyCareClick() {
//     console.log('Opening My Care...');
//     document.getElementById("logmsgcallback").value += '\n' + 'My care button clciked' + '\n';
//     document.getElementById("logmsgcallback").scrollTop=document.getElementById("logmsgcallback").scrollHeight;
//     // Hide all views first
//     // document.querySelectorAll('.content').forEach(view => {
//     //     if (view) {
//     //         view.style.display = 'none';
//     //     }
//     // });

//     // Keep sidebar visible
//     // const sidebar = document.querySelector('.sidebar');
//     // if (sidebar) {
//     //     sidebar.style.display = 'block';
//     // }

//     const hospitalInfoView = document.querySelector('.hospital-info-view');

//     // Show My Care view
//     // const myCareView = document.querySelector('.my-care-view');
//     // if (myCareView) {
//     //     myCareView.style.display = 'block';
//     //     myCareView.style.marginLeft = '15%'; // Align with sidebar
//     // }

//     // Update current section
//     currentSection = 'my-care';

//     document.querySelector('.default-view').style.display = 'none';
    
//     // Show entertainment view
//     document.querySelector('.my-care-view').style.display = 'block';
    
//     // Focus first entertainment card
//     const myCareCard = document.querySelector('.my-care-card[data-type="management-and-discharge"]');
//     myCareCard.focus();

//     // Focus management and discharge button
//     const managementButton = document.getElementById("management-and-discharge-button");
//     managementButton.focus();
// }

// Card click handlers
function handleManagementandDischargeClick() {
    console.log('Opening Management and Discharge...');
    clearMyCareActive();
    const card = document.querySelector('.mycare-card[data-type="management-and-discharge"]');
    if (card) {
        card.classList.add('active');
    }
}

function handleCarersSurveyClick() {
    console.log('Opening Carers Survey...');
    clearMyCareActive();
    const card = document.querySelector('.mycare-card[data-type="carers-survey"]');
    if (card) {
        card.classList.add('active');
    }
}

function handleSample3Click() {
    console.log('Opening Sample 3...');
    clearMyCareActive();
    const card = document.querySelector('.mycare-card[data-type="sample3"]');
    if (card) {
        card.classList.add('active');
    }
}

function clearMyCareActive() {
    document.querySelectorAll('.mycare-card').forEach(card => {
        card.classList.remove('active');
    });
}

// Add new handlers
function handlePatientSurveyClick() {
    console.log('Opening Patient Survey...');
    clearMyCareActive();
    const card = document.querySelector('.mycare-card[data-type="patient-survey"]');
    if (card) {
        card.classList.add('active');
    }
}

function handleBlacktownSurveysClick() {
    console.log('Opening Blacktown Surveys...');
    clearMyCareActive();
    const card = document.querySelector('.mycare-card[data-type="blacktown-surveys"]');
    if (card) {
        card.classList.add('active');
    }
}

// Handle keyboard navigation
// function handleMyCareKeys(keyCode) {
//     const currentFocus = document.activeElement;
    
//     if (currentFocus.id === 'management-and-discharge-button' || 
//         currentFocus.getAttribute('data-type') === 'blacktown-surveys') {
//         switch(keyCode) {
//             case 37: // Left arrow
//                 const myCareButton = document.querySelector('.menu-item[data-type="my-care"]');
//                 if (myCareButton) {
//                     myCareButton.focus();
//                     return 0; // Key handled
//                 }
//                 break;
//         }
//     }
//     return 1; // Key not handled
// }

// Additional Code for MyCare Section

// Function to handle MyCare button click
function handleMyCareButtonClick() {
    console.log('Opening My Care section...');
    
    //setting previous and current page
    previous_page = current_page;
    current_page = "mycare_menu";

    document.getElementById(previous_page).style.display = 'none';
    document.getElementById(current_page).style.display = 'block';

    document.getElementById("management-and-discharge-button").focus();

    // document.querySelector('.default-view').style.display = 'none';
    // document.querySelector('.entertainment-view').style.display = 'none'; //hide entertainment display
    
    // // Show entertainment view
    // document.querySelector('.my-care-view').style.display = 'block';
    
    // // Focus first entertainment card
    // const myCareCard = document.getElementById("management-and-discharge-button");
    // myCareCard.focus();
}

// Add this to your existing event listeners
// document.addEventListener('keydown', function(e) {
//     if (document.querySelector('.my-care-view').style.display === 'block') {
//         handleMyCareKeys(e.keyCode);
//     }
// });
