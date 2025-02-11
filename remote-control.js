// // Remote Control Key Codes for Philips TV
// const KEY_CODES = {
//     VK_LEFT: 37,
//     VK_UP: 38,
//     VK_RIGHT: 39,
//     VK_DOWN: 40,
//     VK_ENTER: 13,
//     VK_BACK: 8,    // Philips TV back button
//     VK_RETURN: 8,  // Return button same as back
//     VK_EXIT: 8,    // Exit button same as back
//     VK_OK: 13,
// };

// // Initialize remote control handling
// function initRemoteControl() {
//     // Add keyboard fallback for testing in browser
//     if (!window.JAPITWIXPPlugin || !window.JAPITWIXPPlugin.WebIXPOnKeyPress) {
//         document.addEventListener('keydown', (event) => {
//             handleRemoteKeyPress(event.keyCode);
//         });
//         console.log("Browser keyboard fallback initialized");
//     }
// }

// // Handle remote control key presses
// function handleRemoteKeyPress(keyCode) {
//     console.log('Key pressed:', keyCode);
//     const code = parseInt(keyCode, 10);
//     const focusedElement = document.activeElement;

//     switch (code) {
//         case KEY_CODES.VK_UP:
//             if (currentSection === 'default') {
//                 navigateMenu('up');
//             } else {
//                 navigateGrid('up');
//             }
//             return 0;
            
//         case KEY_CODES.VK_DOWN:
//             if (currentSection === 'default') {
//                 navigateMenu('down');
//             } else {
//                 navigateGrid('down');
//             }
//             return 0;
            
//         case KEY_CODES.VK_LEFT:
//             if (currentSection === 'default') {
//                 navigateMenu('left');
//             } else {
//                 navigateGrid('left');
//             }
//             return 0;
            
//         case KEY_CODES.VK_RIGHT:
//             if (currentSection === 'default') {
//                 navigateMenu('right');
//             } else {
//                 navigateGrid('right');
//             }
//             return 0;
            
//         case KEY_CODES.VK_ENTER:
//         case KEY_CODES.VK_OK:
//             if (focusedElement) {
//                 const action = focusedElement.getAttribute('data-action');
//                 if (action === 'entertainment') {
//                     handleEntertainmentClick();
//                     console.log('Entertainment action triggered');
//                     return 0;
//                 }
//                 if (action === 'hospital-info') {
//                     handleHospitalInfoClick();
//                     console.log('Hospital Info action triggered');
//                     return 0;
//                 }
//                 if (action === 'my-care') {
//                     handleMyCareClick();
//                     return 0;
//                 }
//                 if (action === 'clinical-services') {
//                     handleClinicalServicesClick();
//                     return 0;
//                 }
//                 if (focusedElement.classList.contains('entertainment-card') ||
//                     focusedElement.classList.contains('hospital-card') ||
//                     focusedElement.classList.contains('mycare-card') ||
//                     focusedElement.classList.contains('clinical-card')) {
//                     console.log('Card clicked');
//                     focusedElement.click();
//                     return 0;
//                 }
//             }
//             return 1;
            
//         case KEY_CODES.VK_BACK:
//         case KEY_CODES.VK_RETURN:
//             return handleBackButtonPress();
//     }
//     return 1;
// }

// // Handle channel up/down when in TV mode
// function handleChannelUp() {
//     if (currentSection === "entertainment" && document.querySelector('[data-type="tv"].active')) {
//         const currentChannel = getCurrentChannel();
//         channelSelection(currentChannel + 1);
//     }
// }

// function handleChannelDown() {
//     if (currentSection === "entertainment" && document.querySelector('[data-type="tv"].active')) {
//         const currentChannel = getCurrentChannel();
//         if (currentChannel > 1) {
//             channelSelection(currentChannel - 1);
//         }
//     }
// }

// // Get current channel number
// function getCurrentChannel() {
//     return parseInt(localStorage.getItem("currentChannel") || "1");
// }

// // Navigate menu items
// function navigateMenu(direction) {
//     const currentElement = document.activeElement;
//     const isEntertainmentView = currentSection === 'entertainment';
    
//     // Get all focusable elements based on current view
//     const selector = isEntertainmentView ? 
//         '.entertainment-card:not([style*="display: none"])' : 
//         '.menu-item:not([style*="display: none"])';
    
//     const items = Array.from(document.querySelectorAll(selector));
//     const currentIndex = items.indexOf(currentElement);
//     let nextIndex;

//     switch (direction) {
//         case 'up':
//             nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
//             break;
//         case 'down':
//             nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
//             break;
//         case 'left':
//             if (isEntertainmentView) {
//                 nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
//             }
//             break;
//         case 'right':
//             if (isEntertainmentView) {
//                 nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
//             }
//             break;
//     }

//     if (nextIndex !== undefined && items[nextIndex]) {
//         items[nextIndex].focus();
//     }
// }

// // Activate the currently focused element
// function activateCurrentElement() {
//     const currentElement = document.activeElement;
//     if (currentElement && currentElement.classList.contains('japit-button')) {
//         console.log('Activating element:', currentElement);
        
//         // Get the action from the element
//         const action = currentElement.getAttribute('data-japit-action');
        
//         // Special handling for entertainment menu
//         if (action && action.includes('entertainment')) {
//             handleMenuClick('entertainment');
//             return;
//         }
        
//         // Execute the action
//         if (action) {
//             try {
//                 eval(action);
//                 console.log('Executed action:', action);
//             } catch (e) {
//                 console.error('Error executing action:', e);
//             }
//         }
//     }
// }

// // Handle back button
// function handleBackButton() {
//     if (currentSection === "entertainment") {
//         returnToHome();
//     }
// }

// // Handle back navigation
// function handleBackNavigation() {
//     console.log('Back navigation triggered');
    
//     // Get previous section from history
//     const previousSection = navigationHistory.pop();
    
//     if (previousSection) {
//         // Navigate to previous section
//         switch (previousSection) {
//             case 'entertainment':
//                 handleEntertainmentClick();
//                 break;
//             case 'hospital-info':
//                 handleHospitalInfoClick();
//                 break;
//             case 'my-care':
//                 handleMyCareClick();
//                 break;
//             case 'clinical-services':
//                 handleClinicalServicesClick();
//                 break;
//             default:
//                 returnToHome();
//         }
//     } else {
//         // If no history, return to home
//         returnToHome();
//     }
// }

// function navigateGrid(direction) {
//     const currentElement = document.activeElement;
//     const currentSection = document.querySelector('.hospital-info-view[style*="display: block"]') ? 'hospital-info' :
//                           document.querySelector('.entertainment-view[style*="display: block"]') ? 'entertainment' :
//                           document.querySelector('.my-care-view[style*="display: block"]') ? 'my-care' :
//                           document.querySelector('.clinical-services-view[style*="display: block"]') ? 'clinical-services' : '';

//     if (!currentSection) return;

//     let selector;
//     switch (currentSection) {
//         case 'hospital-info':
//             selector = '.hospital-card';
//             break;
//         case 'entertainment':
//             selector = '.entertainment-card';
//             break;
//         case 'my-care':
//             selector = '.mycare-card';
//             break;
//         case 'clinical-services':
//             selector = '.clinical-card';
//             break;
//     }

//     const cards = Array.from(document.querySelectorAll(selector));
//     const currentIndex = cards.indexOf(currentElement);
    
//     let nextIndex;
//     const columns = 3; // Number of columns in the grid

//     switch (direction) {
//         case 'up':
//             nextIndex = currentIndex - columns;
//             break;
//         case 'down':
//             nextIndex = currentIndex + columns;
//             break;
//         case 'left':
//             nextIndex = currentIndex - 1;
//             break;
//         case 'right':
//             nextIndex = currentIndex + 1;
//             break;
//     }

//     // Check if next index is valid and the card exists
//     if (nextIndex >= 0 && nextIndex < cards.length) {
//         cards[nextIndex].focus();
//     }
// }

// // Add new back button event listener
// document.addEventListener('keydown', function(event) {
//     if (event.key === 'Backspace' || 
//         event.keyCode === KEY_CODES.VK_BACK || 
//         event.keyCode === KEY_CODES.VK_RETURN || 
//         event.keyCode === KEY_CODES.VK_EXIT) {
//         event.preventDefault();
//         handleBackButtonPress();
//     }
// }); 