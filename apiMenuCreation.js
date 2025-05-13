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
                                    console.log('Opening movies');
                                    openMovies('Activate');
                                    
                                });
                            }

                            //clinical sharing from URL
                            else if (subModule.moduleAction && subModule.moduleAction.packageName === 'com.stellar.clinicalsharing') {
                                button.addEventListener('click', () => {
                                    console.log('Opening clinical sharing');
                                    openClinicalSharing('Activate');
                                    
                                });
                            }

                            //casting from URL
                            else if (subModule.moduleAction && subModule.moduleAction.packageName === 'com.stellar.casting') {
                                button.addEventListener('click', () => {
                                    console.log('Opening casting');
                                    openCasting('Activate')
                                   
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

function openClinicalSharing(param) {
    //nsole.log('openClinicalSharing called with param:', param);
    var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
    JAPITObjForWIXPSvc.Cookie = 119;
    JAPITObjForWIXPSvc.CmdType = "Change";
    JAPITObjForWIXPSvc.Fun = "ApplicationControl";
    JAPITObjForWIXPSvc.CommandDetails = {
        "ApplicationDetails": {
            "ApplicationAndroidPackageName": "com.stellar.clinicalsharing"
        },
        "ApplicationState": param
    };
    sendWIxPCommand(JAPITObjForWIXPSvc);
    delete JAPITObjForWIXPSvc;
}


