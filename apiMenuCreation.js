// Define key constants for remote controls and keyboard
const VK_BACK = 461;    // BACK button on Philips remote
const VK_MENU = 36;     // MENU button on Philips remote
const VK_LEFT = 37;     // LEFT arrow key
const VK_UP = 38;       // UP arrow key
const VK_RIGHT = 39;    // RIGHT arrow key
const VK_DOWN = 40;     // DOWN arrow key
const VK_ACCEPT = 13;   // ENTER/OK button on remote or keyboard
const VK_1 = 49;        // Number 1 key
const VK_2 = 50;        // Number 2 key
const VK_3 = 51;        // Number 3 key
const VK_4 = 52;        // Number 4 key

/** Which submenu ID (e.g. 70, 98, 100) launched the current full-screen view? */
let activeSubmenuId = null;

/** Forward BACK & MENU to our HBBTV browser even while another source is frontmost */
function enableBackKeyForwarding() {
  const wixp = new CreateJAPITObjectForWIXPSvc();
  wixp.Cookie  = 9001;
  wixp.CmdType = "Change";
  wixp.Fun     = "UserInputControl";
  wixp.CommandDetails = {
    VirtualKeyForwardDetails: {
      VirtualKeyForwardMode   : "SelectiveVirtualKeyForward",
      VirtualKeyToBeForwarded : ["HBBTV_VK_BACK", "HBBTV_VK_MENU"]
    }
  };
  sendWIxPCommand(wixp);
  delete wixp;
}

/** Bring our dashboard browser back to the foreground */
function foregroundDashboard() {
  const appCtrl = new CreateJAPITObjectForWIXPSvc();
  appCtrl.Cookie  = 9002;
  appCtrl.CmdType = "Change";
  appCtrl.Fun     = "ApplicationControl";
  appCtrl.CommandDetails = {
    ApplicationDetails : {
      ApplicationName : "LocalCustomDashboard",
      ApplicationType : "NonNative"
    },
    ApplicationState  : "Activate"
  };
  sendWIxPCommand(appCtrl);
  delete appCtrl;
}

function loadMainMenu(data) {
    document.querySelector('.menu-item').style.display = 'none';

    const mainMenuButtons = [];
    for (var i = 0; i < data.length; i++) {
        (function (currentData) { // Closure to capture current iteration data
            var title = currentData.title;
            mainMenuButtons.push(title);
            console.log("Title ", title);

            const entertainmentButton = document.getElementById('entertainmentButton');
            const clinicalServiceButton = document.querySelector('.menu-item.japit-button[data-type="clinical-services"]');
            const hospitalInfoButton = document.querySelector('.menu-item.japit-button[data-type="hospitalinfo"]');
            
            // Add references to other main menu buttons
            const servicesButton = document.querySelector('.menu-item.japit-button[data-type="services"]');
            const tvRentalButton = document.querySelector('.menu-item.japit-button[data-type="tv-rental"]');

            const colourScheme = currentData.colorScheme.selectionColor;
            const hoverColour = currentData.colorScheme.baseColor;

            if (title.toLowerCase().includes('entertainment')) {
                entertainmentButton.style.order = currentData.ordering;

                entertainmentButton.style.display = 'flex';
                var img = entertainmentButton.getElementsByTagName("img")[0];
                var span = entertainmentButton.getElementsByTagName("span")[0];
                if (currentData.icon.imageUrl) {
                    img.src = currentData.icon.imageUrl;
                }

                if (colourScheme) {
                    (function (hover, defaultColour, iconData) {
                        entertainmentButton.addEventListener("focus", function () {
                            var span = this.querySelector("span");
                            var img = this.querySelector("img");
                            if (span) span.style.color = hover;
                            if (img && iconData.focusedImageUrl) img.src = iconData.focusedImageUrl;
                        });

                        entertainmentButton.addEventListener("blur", function () {
                            var span = this.querySelector("span");
                            var img = this.querySelector("img");
                            if (span) span.style.color = defaultColour;
                            if (img && iconData.imageUrl) img.src = iconData.imageUrl;
                        });
                    })(hoverColour, colourScheme, currentData.icon);

                    // Submenu cards
                    var cards = document.querySelectorAll(".submenu-card");
                    for (var j = 0; j < cards.length; j++) {
                        (function (card, hover, defaultColour) {
                            card.tabIndex = 0;
                            card.addEventListener("focus", function () {
                                var span = this.querySelector("span");
                                if (span) span.style.color = hover;
                            });
                            card.addEventListener("blur", function () {
                                var span = this.querySelector("span");
                                if (span) span.style.color = defaultColour;
                            });
                        })(cards[j], hoverColour, colourScheme);
                    }
                }

                // GETTING CHANNELS
                var subModulesData = currentData.subModules;
                var tvModuleMatches = subModulesData.filter(function(item) {
                    return item.title === "Freeview TV";
                });
                var tvChannelsApiUrl = tvModuleMatches[0].moduleAction.moduleUrl;
                console.log("TV api call", tvChannelsApiUrl);

                // TV CHANNELS API CALL
                if (tvChannelsApiUrl) {
                    apiGetCall(corsProxy+tvChannelsApiUrl, 'submenu', function (response) {
                        if (response){
                            console.log('API Response:', JSON.parse(response));
                            document.getElementById('buffer-animation-container').style.display = 'none';
                            aflexTvChannelsData = JSON.parse(response);
                        } 
                    });
                }

                // RADIO CHANNELS API CALL
                var radioModuleMatches = subModulesData.filter(function(item) {
                    return item.title === "Radio";
                });
                var radioChannelsObjects = radioModuleMatches[0].subModules;
                
                if (radioChannelsObjects) {
                    var radioChannelsApiUrl = radioChannelsObjects[1].moduleAction.moduleUrl;
                    console.log("Radio api call", radioChannelsApiUrl);
                    apiGetCall(corsProxy+radioChannelsApiUrl, 'submenu', function (response) {
                        if (response){
                            radioChannelsAflexdata = JSON.parse(response).subModules;
                            console.log('Radio Channels API Response:', radioChannelsAflexdata);
                        } 
                    });
                }
            } else {
                //MAIN MENU
                var colorScheme = currentData.colorScheme;
                var button = document.createElement('button');
                button.className = 'menu-item japit-button_sidemenu';
                button.style.display = 'flex';

                var span = document.createElement('span');
                span.textContent = currentData.title;
                span.style.color = colorScheme.selectionColor;

                var img = document.createElement('img');
                img.src = currentData.icon.imageUrl;
                img.alt = currentData.title;

                button.appendChild(img);
                button.appendChild(span);

                (function (btn, scheme, itemData) {
                    btn.addEventListener('focus', function () {
                        if (!this.classList.contains('active')) {
                            this.style.background = 'linear-gradient(135deg, ' + scheme.selectionColor + ', ' + scheme.selectionColor + ')';
                            this.style.transform = 'scale(1.02)';
                            this.style.boxShadow = '0 4px 8px rgba(3, 95, 3, 0.2)';

                            var btnImg = this.querySelector('img');
                            btnImg.src = itemData.icon.focusedImageUrl;
                            btnImg.style.transform = 'scale(1.1)';

                            var btnSpan = this.querySelector('span');
                            btnSpan.style.color = scheme.baseColor;
                        }
                    });

                    btn.addEventListener('blur', function () {
                        if (!this.classList.contains('active')) {
                            this.style.background = '';
                            this.style.transform = '';
                            this.style.boxShadow = '';

                            var btnImg = this.querySelector('img');
                            btnImg.src = itemData.icon.imageUrl;
                            btnImg.style.transform = '';

                            var btnSpan = this.querySelector('span');
                            btnSpan.style.color = scheme.selectionColor;
                        }
                    });
                })(button, colorScheme, currentData);

                document.querySelector('.sidebar-menu').appendChild(button);

                //SUB MENU CREATION
                var subMenuBox = document.createElement('div');
                subMenuBox.className = 'submenu-view';
                subMenuBox.id = currentData.title.split(' ').join('');
                

                 // Add scrollable focus functionality for left-side menu buttons
                button.addEventListener('focus', function () {
                    // Show the submenu (if not already)
                    previous_page = current_page;
                    current_page = subMenuBox.id;
                    document.getElementById(previous_page).style.display = 'none';
                    document.getElementById(current_page).style.display = 'flex';
                });
                
                // Add onclick focus functionality for left-side menu buttons
                button.addEventListener('click', function () {
                    // Show the submenu (if not already)
                    previous_page = current_page;
                    current_page = subMenuBox.id;
                    document.getElementById(previous_page).style.display = 'none';
                    document.getElementById(current_page).style.display = 'flex';

                    // Focus the first button in the submenu
                    var firstButton = findFirstButton(subMenuBox);
                    if (firstButton) {
                        setTimeout(() => firstButton.focus(), 10); // Timeout ensures DOM is updated
                    }
                });

                const nonSideBar = document.querySelector('.non-sidebar');
                nonSideBar.appendChild(subMenuBox);
                var subModulesData = data[i].subModules;
                if (subModulesData) {
                    for (var j = 0; j < subModulesData.length; j++) {
                        (function (subModule) {
                            var subMenuButtons = document.createElement('div');
                            subMenuButtons.className = 'sub-menu-buttons_movies';

                            var button = document.createElement('button');
                            button.className = 'submenu-card-x';
                            button.id = subModule.id;
                            button.setAttribute('button-focus', subModule.title.split(' ').join(''));

                            button.addEventListener('click', () => {
                                console.log('Clicked button for', subModule);
                            });

                            

                            //television from URL
                            if (subModule.moduleAction && subModule.moduleAction.packageName === 'com.stellar.television') {
                                button.addEventListener('click', () => {
                                    console.log('Opening TV');
                                    openTV();
                                    
                                });
                            }

                            

                            //movies from URL
                            else if (subModule.moduleAction && subModule.moduleAction.packageName === 'com.stellar.movies') {
                                button.addEventListener('click', () => {
                                    /* remember which card launched the full-screen view */
                                    activeSubmenuId = subModule.id;        // → "70"

                                    previous_page = current_page;
                                    current_page  = 'movies';

                                    /* 1. keep BACK & MENU flowing to the dashboard */
                                    enableBackKeyForwarding();

                                    /* 2. forward any extra keys you want (includes BACK & MENU) */
                                    setMoviesKeys();

                                    /* 3. now launch the Android Movies app and hide the dashboard */
                                    openMovies('Activate');                // calls changeCDBstate('Deactivate')
                                });
                            }

                            //clinical sharing from URL
                            else if (subModule.moduleAction && subModule.moduleAction.packageName === 'com.stellar.clinicalsharing') {
                                button.addEventListener('click', () => {
                                    /* remember which card launched the full-screen view */
                                    activeSubmenuId = subModule.id;        // → "100"

                                    previous_page = current_page;
                                    current_page  = 'clinical_sharing';

                                    /* 1. keep BACK & MENU flowing to the dashboard */
                                    enableBackKeyForwarding();

                                    /* 2. hide the current view */
                                    if (document.getElementById(previous_page)) {
                                        document.getElementById(previous_page).style.display = 'none';
                                    }

                                    /* 3. now switch to HDMI1 and hide the dashboard */
                                    switchToHDMI1();                      // calls changeCDBstate('Deactivate')
                                });
                            }

                            //casting from URL
                            else if (subModule.moduleAction && subModule.moduleAction.packageName === 'com.stellar.casting') {
                                button.addEventListener('click', () => {
                                    /* remember which card launched the full-screen view */
                                    activeSubmenuId = subModule.id;        // → "98"

                                    previous_page = current_page;
                                    current_page  = 'casting';

                                    /* 1. keep BACK & MENU flowing to the dashboard */
                                    enableBackKeyForwarding();

                                    /* 2. now launch the Android Casting app and hide the dashboard */
                                    SelectCast('Activate');                // calls changeCDBstate('Deactivate')
                                });
                            }

                            //radio from URL
                            else if (subModule.moduleAction && subModule.moduleAction.packageName === 'com.stellar.radio') {
                                button.addEventListener('click', () => {
                                    // Hide the default Radio button image (if present)
                                    var defaultRadioImg = document.querySelector('img[src*="radio_512_00baa3.png"]');
                                    if (defaultRadioImg) {
                                        defaultRadioImg.style.display = 'none';
                                    }
                                    // Show the radio view container
                                    var radioView = document.getElementById('radio_view');
                                    if (radioView) {
                                        radioView.style.display = 'flex';
                                    }
                                    // Call handleRadioClick to populate radio channels
                                    if (typeof handleRadioClick === 'function') {
                                        handleRadioClick();
                                    }
                                });
                            }

                            var img = document.createElement('img');
                            img.src = subModule.icon.imageUrl || '';
                            img.alt = subModule.title || '';

                            var span = document.createElement('span');
                            span.textContent = subModule.title || '';
                            if (currentData.colorScheme.selectionColor) {
                                span.style.color = currentData.colorScheme.selectionColor;
                            }

                            button.addEventListener('focus', function () {
                                if (subModule.icon.focusedImageUrl) {
                                    img.src = subModule.icon.focusedImageUrl;
                                    img.style.transform = "scale(1.1)";
                                    span.style.color = currentData.colorScheme.baseColor;
                                    button.style.background = currentData.colorScheme.selectionColor;
                                }
                            });

                            button.addEventListener('blur', function () {
                                if (subModule.icon.imageUrl) {
                                    img.src = subModule.icon.imageUrl;
                                    img.style.transform = "scale(1)";
                                    span.style.color = currentData.colorScheme.selectionColor;
                                    button.style.background = currentData.colorScheme.baseColor;
                                }
                            });

                            button.addEventListener('keydown', function(e) {
                                if (e.key === 'ArrowLeft' || e.keyCode === 37) {
                                    // Find the corresponding sidebar button by matching text or a data attribute
                                    var sidebarButtons = document.querySelectorAll('.menu-item.japit-button_sidemenu');
                                    for (var k = 0; k < sidebarButtons.length; k++) {
                                        var sidebarBtn = sidebarButtons[k];
                                        var sidebarText = sidebarBtn.textContent.trim().toLowerCase();
                                        var submenuText = (subModule.title || '').trim().toLowerCase();
                                        if (sidebarText === submenuText) {
                                            sidebarBtn.focus();
                                            break;
                                        }
                                    }
                                }
                            });

                            button.appendChild(img);
                            button.appendChild(span);
                            subMenuButtons.appendChild(button);
                            subMenuBox.appendChild(subMenuButtons);
                        })(subModulesData[j]);
                    }
                }
                subMenuBox.setAttribute('tabindex', '0');
                
                var firstButton = findFirstButton(subMenuBox);
                if (!firstButton) {
                    console.warn('No button elements found in container');
                } else {
                    firstButton.setAttribute('tabindex', '0');
                    subMenuBox.addEventListener('focus', function(e) {
                        if (e.target === subMenuBox && document.activeElement !== firstButton) {
                        setTimeout(() => {
                            firstButton.focus();
                        }, 10);
                        }
                    }, true);
                }
            }
        })(data[i]);
    }

   
}

//FUNCTION TO FIND FIRST BUTTON IN ELEMENTS
function findFirstButton(element) {
    
    if (element.tagName === 'BUTTON') {
    return element;
    }
    
    for (var i = 0; i < element.children.length; i++) {
        const found = findFirstButton(element.children[i]);
        if (found) return found
    }
    
    return null;
}

function openCasting(param) {
    SelectCast(param);
}

function openClinicalSharing() {
    console.log('openClinicalSharing() called');
    previous_page = current_page;
    current_page = "clinical_sharing";
    setBackHomeVirtual();
    switchToHDMI1();
}

// Add debug logs to setBackHomeVirtual and switchToHDMI1 if not present
if (typeof setBackHomeVirtual === 'function') {
    const originalSetBackHomeVirtual = setBackHomeVirtual;
    setBackHomeVirtual = function() {
        console.log('setBackHomeVirtual() called');
        return originalSetBackHomeVirtual.apply(this, arguments);
    }
}

if (typeof switchToHDMI1 === 'function') {
    const originalSwitchToHDMI1 = switchToHDMI1;
    switchToHDMI1 = function() {
        console.log('switchToHDMI1() called');
        return originalSwitchToHDMI1.apply(this, arguments);
    }
}

// Helper function to restore button functionality
function restoreButtonFunctionality() {
    // Restore functionality to all buttons
    const disabledButtons = document.querySelectorAll('button[data-original-tabindex]');
    disabledButtons.forEach(button => {
        // Restore original tabIndex
        const originalTabIndex = button.getAttribute('data-original-tabindex');
        if (originalTabIndex) {
            button.tabIndex = originalTabIndex;
            button.removeAttribute('data-original-tabindex');
        }
        // Restore original onclick if it existed
        const originalOnclick = button.getAttribute('data-original-onclick');
        if (originalOnclick) {
            button.onclick = new Function(originalOnclick);
            button.removeAttribute('data-original-onclick');
        }
    });
    // Restore back button functionality
    const backButton = document.querySelector('.back-button');
    if (backButton && backButton.hasAttribute('data-original-onclick')) {
        const originalOnclick = backButton.getAttribute('data-original-onclick');
        backButton.onclick = originalOnclick ? new Function(originalOnclick) : null;
        backButton.removeAttribute('data-original-onclick');
    }
    // Restore home button functionality
    const homeButton = document.querySelector('.home-button');
    if (homeButton && homeButton.hasAttribute('data-original-onclick')) {
        const originalOnclick = homeButton.getAttribute('data-original-onclick');
        homeButton.onclick = originalOnclick ? new Function(originalOnclick) : null;
        homeButton.removeAttribute('data-original-onclick');
    }
    console.log('Restored all button functionality');
}

// Example for a dynamically created HDMI button:
var hdmiButton = document.getElementById('hdmiButton');
if (hdmiButton) {
    hdmiButton.addEventListener('click', function() {
        console.log('HDMI button clicked, calling JAPIT function...');
        switchToHDMI1();
    });
}

// Function to reset the TV to dashboard mode
function resetToDashboardMode() {
    // First change to HDMI1 to show our HTML dashboard
    switchToHDMI1();
    
    // Then activate the Control Dashboard to capture remote control inputs
    changeCDBstate('Activate');
    
    console.log('Reset TV to dashboard mode: HDMI1 input with CDB active');
}

// Global back navigation for main modules
function handleBackNavigation() {
    // Map detailed views to their submenu-view IDs
    const submenuMap = {
        'tv_view': 'Television',         // Television
        'radio_view': 'Radio',           // Radio
        'movies': 'Movies',              // Movies
        'casting': 'Casting',            // Casting
        'clinical_sharing': 'ClinicalSharing' // Clinical Sharing
    };

    // List of submenu IDs
    const submenuIds = [
        'Television',   // Television (id 80)
        'Radio',        // Radio (id 64)
        'Movies',       // Movies (id 70)
        'Casting',      // Casting (id 98)
        'ClinicalSharing' // Clinical Sharing (id 100)
    ];

    // Map submenu IDs to their corresponding sidebar button selectors
    const sidebarButtonMap = {
        'Television': 'button.menu-item.japit-button_sidemenu span:contains("Television")',
        'Radio': 'button.menu-item.japit-button_sidemenu span:contains("Radio")',
        'Movies': 'button.menu-item.japit-button_sidemenu span:contains("Movies")',
        'Casting': 'button.menu-item.japit-button_sidemenu span:contains("Casting")',
        'ClinicalSharing': 'button.menu-item.japit-button_sidemenu span:contains("Clinical Sharing")'
    };

    // Detail views that need two-step back logic
    if (current_page === 'movies' ||
        current_page === 'casting' ||
        current_page === 'clinical_sharing') {

        /* FIRST BACK ───────────────┐
           Bring dashboard forward   │*/
        foregroundDashboard();            // tell TV to foreground browser

        // Hide full-screen view (HDMI-1 or Android Activity)
        if (current_page === 'clinical_sharing') {
            const hdmiLayer = document.getElementById('clinical_sharing');
            if (hdmiLayer) hdmiLayer.style.display = 'none';
            switchToHDMI1();              // put HTML layer over HDMI again
        } else if (current_page === 'movies') {
            openMovies('Deactivate');
        } else if (current_page === 'casting') {
            SelectCast('Deactivate');
        }

        /* Show the originating submenu (we kept its id) */
        const submenuSelector = `[id="${activeSubmenuId}"]`;
        const submenuCard = document.querySelector(submenuSelector);
        if (submenuCard) {
            const submenuView = submenuCard.closest('.submenu-view');
            if (submenuView) {
                submenuView.style.display = 'flex';
                submenuCard.focus();
                current_page = submenuView.id;  // e.g. "Movies" / "Casting"
                previous_page = 'default_view';
            }
        }

        changeCDBstate('Activate');   // grab RC focus
        return;                       // handled!
    }

    // Special cases that require additional cleanup
    if (current_page === 'tv_view') {
        const tvBuffer = document.getElementById('tv_buffer');
        if (tvBuffer) {
            tvBuffer.style.display = 'none';
        }
        
        if (channel_list_view_on) {
            if (typeof tvChannelsList === 'function') {
                tvChannelsList('Deactivate');
            }
            // Reset to dashboard mode after exiting TV channels list
            resetToDashboardMode();
            return;
        }
        
        if (typeof channelStopPlaying === 'function') {
            channelStopPlaying(current_tv_channel);
        }
        
        // Always reset to dashboard mode after exiting TV view
        resetToDashboardMode();
    } 
    else if (current_page === 'radio_view') {
        if (typeof channelStopPlaying === 'function' && radio_channel_playing) {
            channelStopPlaying(radio_channel_playing);
        }
        
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.style.display = 'block';
        }
        
        // Adjusting display elements
        const gif = document.querySelector("#gif");
        const rightColumn = document.getElementById("radio_title");
        const gifTitle = document.getElementById("gif-title");
        const rightColumnLogo = document.getElementById("radio-logo-right");
        
        if (rightColumn) rightColumn.innerText = 'Press Radio Channel to Play';
        if (gif) gif.style.display = 'none';
        if (gifTitle) gifTitle.style.display = 'none';
        if (rightColumnLogo) rightColumnLogo.style.display = 'none';
        
        // Reset to dashboard mode after exiting radio view
        resetToDashboardMode();
    }
    else if (current_page === 'video-frame') {
        if (typeof setRcControlSelective === 'function') {
            setRcControlSelective();
        }
        
        const videoElement = document.getElementById('video-frame');
        if (videoElement) {
            videoElement.src = '';
            videoElement.currentTime = 0;
            videoElement.pause();
        }
        
        document.removeEventListener("keyup", handleKeyUp);
        
        // Reset to dashboard mode after exiting video player
        resetToDashboardMode();
    }

    // Function to find and focus the corresponding sidebar button
    function focusSidebarButton(submenuId) {
        // Find all sidebar buttons
        const sidebarButtons = document.querySelectorAll('.menu-item.japit-button_sidemenu');
        
        // First ensure all buttons have their images
        ensureSidebarButtonImages();
        
        // Check each button to find the matching one
        for (let i = 0; i < sidebarButtons.length; i++) {
            const button = sidebarButtons[i];
            const buttonText = button.textContent.trim();
            
            // Check if this button matches our submenu
            if ((submenuId === 'Television' && buttonText.includes('Television')) ||
                (submenuId === 'Radio' && buttonText.includes('Radio')) ||
                (submenuId === 'Movies' && buttonText.includes('Movies')) ||
                (submenuId === 'Casting' && buttonText.includes('Casting')) ||
                (submenuId === 'ClinicalSharing' && buttonText.includes('Clinical Sharing'))) {
                
                // Make sure this button has its image before focusing
                ensureButtonImage(button);
                
                // Focus this button
                button.focus();
                
                // Add event listener for navigation to ensure submenu views are properly hidden
                button.addEventListener('blur', function() {
                    hideAllSubmenuViews();
                    // Check images again after blur
                    setTimeout(ensureSidebarButtonImages, 100);
                }, { once: true });
                
                return true;
            }
        }
        return false;
    }

    // If in a detailed view, go back to submenu view
    if (submenuMap[current_page]) {
        const currentPageElement = document.getElementById(current_page);
        if (currentPageElement) {
            currentPageElement.style.display = 'none';
        }
        
        const submenuElement = document.getElementById(submenuMap[current_page]);
        if (submenuElement) {
            submenuElement.style.display = 'flex';
            current_page = submenuMap[current_page];
            
            // Try to focus a submenu card if it exists
            const card = submenuElement.querySelector('.submenu-card-x');
            if (card) {
                card.focus();
            }
        }
        
        // Set dashboard state to active when returning to submenu view
        changeCDBstate('Activate');
        
        return;
    }

    // If in a submenu view, go back to dashboard and highlight the corresponding sidebar button
    if (submenuIds.includes(current_page)) {
        const currentPageElement = document.getElementById(current_page);
        if (currentPageElement) {
            currentPageElement.style.display = 'none';
        }
        
        const defaultView = document.getElementById('default_view');
        if (defaultView) {
            defaultView.style.display = 'flex';
            
            // Focus the corresponding sidebar button
            focusSidebarButton(current_page);
            
            current_page = 'default_view';
        }
        
        // Ensure dashboard mode is active when returning to main view
        changeCDBstate('Activate');
        
        return;
    }

    // Default fallback - try to go from current page to previous page
    const currentPageElement = document.getElementById(current_page);
    if (currentPageElement) {
        currentPageElement.style.display = 'none';
    }
    
    if (previous_page && previous_page !== "") {
        const previousPageElement = document.getElementById(previous_page);
        if (previousPageElement) {
            previousPageElement.style.display = 'flex';
            
            // If returning to default view, focus the appropriate sidebar button
            if (previous_page === 'default_view') {
                // Try to determine which sidebar button to focus based on current_page
                if (!focusSidebarButton(current_page)) {
                    // If we couldn't determine the button, focus the first element
                    const firstElement = previousPageElement.firstElementChild;
                    if (firstElement) {
                        firstElement.focus();
                    }
                }
            } else {
                // Otherwise focus the first element in the previous page
                const firstElement = previousPageElement.firstElementChild;
                if (firstElement) {
                    firstElement.focus();
                }
            }
            
            current_page = previous_page;
            previous_page = "default_view";
        }
    } else {
        // If no previous page, go to default view
        const defaultView = document.getElementById('default_view');
        if (defaultView) {
            defaultView.style.display = 'flex';
            current_page = 'default_view';
        }
    }
    
    // Always ensure CDB is active after navigation
    changeCDBstate('Activate');
}

// Add event listeners for back button (Backspace, VK_BACK or Esc key)
document.addEventListener('keydown', function(e) {
    // Handle Backspace key (keyboard)
    if (e.key === 'Backspace' || e.keyCode === 8) {
        e.preventDefault(); // Prevent browser back navigation
        handleBackNavigation();
    }
    // Handle Esc key (keyboard)
    else if (e.key === 'Escape' || e.keyCode === 27) {
        e.preventDefault();
        handleBackNavigation();
    }
    // Handle VK_BACK (Philips remote)
    else if (e.keyCode === VK_BACK) {
        e.preventDefault();
        handleBackNavigation();
    }
});

// Function to hide all submenu views
function hideAllSubmenuViews() {
    // Get all submenu views
    const submenuViews = document.querySelectorAll('.submenu-view');
    
    // Hide all of them
    submenuViews.forEach(view => {
        if (view && view.id !== current_page) {
            view.style.display = 'none';
        }
    });
}

// Function to ensure all sidebar buttons have their images
function ensureSidebarButtonImages() {
    const sidebarButtons = document.querySelectorAll('.menu-item.japit-button_sidemenu');
    
    sidebarButtons.forEach(button => {
        ensureButtonImage(button);
    });
}

// Function to ensure a specific button has its image
function ensureButtonImage(button) {
    const img = button.querySelector('img');
    const span = button.querySelector('span');
    
    if (!img || img.style.display === 'none') {
        // If image is missing or hidden, create/restore it
        let newImg;
        if (!img) {
            newImg = document.createElement('img');
            // Insert the image before the span
            button.insertBefore(newImg, span);
        } else {
            newImg = img;
            newImg.style.display = ''; // Reset display if it was hidden
        }
        
        // Set appropriate image source based on button text
        const buttonText = span.textContent.trim().toLowerCase();
        if (buttonText.includes('television')) {
            newImg.src = 'logos/sidemenu/television.png';
            newImg.alt = 'Television';
        } else if (buttonText.includes('radio')) {
            newImg.src = 'logos/sidemenu/radio.png';
            newImg.alt = 'Radio';
        } else if (buttonText.includes('movies')) {
            newImg.src = 'logos/sidemenu/movies.png';
            newImg.alt = 'Movies';
        } else if (buttonText.includes('casting')) {
            newImg.src = 'logos/sidemenu/casting.png';
            newImg.alt = 'Casting';
        } else if (buttonText.includes('clinical sharing')) {
            newImg.src = 'logos/sidemenu/clinicalsharing.png';
            newImg.alt = 'Clinical Sharing';
        }
    }
}

// Add to the existing setupSidebarButtonNavigation function
function setupSidebarButtonNavigation() {
    const sidebarButtons = document.querySelectorAll('.menu-item.japit-button_sidemenu');
    
    // Ensure all buttons have images initially
    ensureSidebarButtonImages();
    
    sidebarButtons.forEach(button => {
        button.addEventListener('focus', function() {
            // Hide all submenu views when a new sidebar button is focused
            hideAllSubmenuViews();
            
            // Ensure this button has its image
            ensureButtonImage(button);
        });
        
        // Add hover handlers to ensure images remain
        button.addEventListener('mouseenter', function() {
            ensureButtonImage(button);
        });
        
        button.addEventListener('mouseleave', function() {
            ensureButtonImage(button);
        });
    });
}

// Call to initialize and ensure images
document.addEventListener('DOMContentLoaded', function() {
    setupSidebarButtonNavigation();
    
    // Add an extra check after a short delay to catch any issues
    setTimeout(ensureSidebarButtonImages, 500);
});


