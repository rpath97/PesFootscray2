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

                button.addEventListener("focus", function () {
                    previous_page = current_page;
                    current_page = subMenuBox.id;

                    document.getElementById(previous_page).style.display = 'none';
                    document.getElementById(current_page).style.display = 'flex';
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

                            //openTV from URL
                            // if (subModule.moduleAction && subModule.moduleAction.packageName === 'com.stellar.television') {
                            //     button.addEventListener('click', () => {
                            //         openTV();
                            //     });
                            // }

                            //television from URL
                            if (subModule.moduleAction && subModule.moduleAction.packageName === 'com.stellar.television') {
                                button.addEventListener('click', () => {
                                    console.log('Opening TV');
                                    openTV();
                                    // apiGetCall(corsProxy + 'https://prov01.stellar.care/aflex5/footscray.php', 'television', function(response) {
                                    //     if (response) {
                                    //         console.log('TV API Response:', response);
                                    //         const data = JSON.parse(response);
                                    //         // After getting the TV data, open the TV interface
                                    //         openTV(data);
                                    //     }
                                    // });
                                });
                            }

                            //movies from URL
                            else if (subModule.moduleAction && subModule.moduleAction.packageName === 'com.stellar.movies') {
                                button.addEventListener('click', () => {
                                    console.log('Opening movies');
                                    openMovies('Activate');
                                    // apiGetCall(corsProxy + 'https://prov01.stellar.care/aflex5/footscray.php', 'movies', function(response) {
                                    //     if (response) {
                                    //         console.log('Movies API Response:', response);
                                    //         const data = JSON.parse(response);
                                    //         // After getting the movies data, open the movies interface
                                    //         openMovies(data);
                                    //     }
                                    // });
                                });
                            }

                            //clinical sharing from URL
                            else if (subModule.moduleAction && subModule.moduleAction.packageName === 'com.stellar.clinicalsharing') {
                                button.addEventListener('click', () => {
                                    console.log('Opening clinical sharing');
                                    openClinicalSharing('Activate');
                                    // apiGetCall(corsProxy + 'https://prov01.stellar.care/aflex5/footscray.php', 'clinicalsharing', function(response) {
                                    //     if (response) {
                                    //         console.log('Clinical Sharing API Response:', response);
                                    //         const data = JSON.parse(response);
                                    //     }
                                    // });
                                });
                            }

                            //casting from URL
                            else if (subModule.moduleAction && subModule.moduleAction.packageName === 'com.stellar.casting') {
                                button.addEventListener('click', () => {
                                    console.log('Opening casting');
                                    openCasting('Activate')
                                    // apiGetCall(corsProxy + 'https://prov01.stellar.care/aflex5/footscray.php', 'casting', function(response) {
                                    //     if (response) {
                                    //         console.log('Casting API Response:', response);
                                    //         const data = JSON.parse(response);
                                            
                                    //     }
                                    // });
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

    // Remove blue focus outline from submenu-card-x buttons
    // if (!document.getElementById('remove-blue-outline-style')) {
    //     const style = document.createElement('style');
    //     style.id = 'remove-blue-outline-style';
    //     style.innerHTML = `.submenu-card-x:focus { outline: none; box-shadow: none; }`;
    //     document.head.appendChild(style);
    // }
}

//FUNCTION TO FIND FIRST BUTTON IN ELEMENTS
function findFirstButton(element) {
    
    if (element.tagName === 'BUTTON') {
    return element;
    }
    
    for (var i = 0; i < element.children.length; i++) {
        const found = findFirstButton(element.children[i]);
        if (found) return found;
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


