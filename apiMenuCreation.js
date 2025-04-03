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

            const colourScheme = currentData.colorScheme.selectionColor;
            const hoverColour = currentData.colorScheme.baseColor;

            if (title.toLowerCase().includes('entertainment')) {
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
                if (tvChannelsApiUrl) { // Check if moduleUrl exists
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
                
                if (radioChannelsObjects) { // Check if moduleUrl exists
                    var radioChannelsApiUrl = radioChannelsObjects[1].moduleAction.moduleUrl;
                    console.log("Radio api call", radioChannelsApiUrl);
                    apiGetCall(corsProxy+radioChannelsApiUrl, 'submenu', function (response) {
                        if (response){
                            radioChannelsAflexdata = JSON.parse(response).subModules;
                            console.log('Radio Channels API Response:', radioChannelsAflexdata);
                        } 
                    });
                    // for (var k=0; k<radioChannelsObjects.length; k++){
                    //     var radioChannelsApiUrl = radioChannelsObjects[k].moduleAction.moduleUrl;
                    //     console.log(radioChannelsApiUrl);
                    // }
                    // apiGetCall(radioChannelsApiUrl, 'submenu', function (response) {
                    //     if (response) console.log('API Response:', response);
                    // });
                }
                

            } else if (title.toLowerCase().includes('clinical')) {
                clinicalServiceButton.style.display = 'flex';
                var img = clinicalServiceButton.getElementsByTagName("img")[0];
                var span = clinicalServiceButton.getElementsByTagName("span")[0];

                if (currentData.icon.imageUrl) {
                    img.src = currentData.icon.imageUrl;
                }

                if (colourScheme) {
                    (function (hover, defaultColour, iconData) {
                        clinicalServiceButton.addEventListener("focus", function () {
                            var span = this.querySelector("span");
                            var img = this.querySelector("img");
                            if (span) span.style.color = hover;
                            if (img && iconData.focusedImageUrl) img.src = iconData.focusedImageUrl;
                        });

                        clinicalServiceButton.addEventListener("blur", function () {
                            var span = this.querySelector("span");
                            var img = this.querySelector("img");
                            if (span) span.style.color = defaultColour;
                            if (img && iconData.imageUrl) img.src = iconData.imageUrl;
                        });
                    })(hoverColour, colourScheme, currentData.icon);
                }

                

             } //else if (title.toLowerCase().includes('hospital')) {
            //     hospitalInfoButton.style.display = 'flex';
            //     var img = hospitalInfoButton.getElementsByTagName("img")[0];
            //     var span = hospitalInfoButton.getElementsByTagName("span")[0];

            //     var hospInfoView = document.getElementById('hospitalinfo_menu');
            //     // hospInfoView.setAttribute('tabindex', '0');

            //     var firstButton = findFirstButton(hospInfoView);
            //     if (!firstButton) {
            //         console.warn('No button elements found in container');
            //         return;
            //     }
            //     // Opera v32 workaround - ensure button is focusable
            //     firstButton.setAttribute('tabindex', '0');
            //     // Handle focus event
            //     hospInfoView.addEventListener('focus', function(e) {
            //         // Prevent infinite focus loop
            //         console.log('Focsing on scrollable')
            //         if (e.target === hospInfoView && document.activeElement !== firstButton) {
            //         // Opera v32 needs a small delay for focus to work properly
            //         setTimeout(() => {
            //             firstButton.focus();
            //         }, 10);
            //         }
            //     }, true); // Use capture phase for better Opera compatibility

            //     if (currentData.icon.imageUrl) {
            //         img.src = currentData.icon.imageUrl;
            //     }

            //     if (colourScheme) {
            //         (function (hover, defaultColour, iconData) {
            //             hospitalInfoButton.addEventListener("focus", function () {
            //                 var span = this.querySelector("span");
            //                 var img = this.querySelector("img");
            //                 if (span) span.style.color = hover;
            //                 if (img && iconData.focusedImageUrl) img.src = iconData.focusedImageUrl;
            //             });

            //             hospitalInfoButton.addEventListener("blur", function () {
            //                 var span = this.querySelector("span");
            //                 var img = this.querySelector("img");
            //                 if (span) span.style.color = defaultColour;
            //                 if (img && iconData.imageUrl) img.src = iconData.imageUrl;
            //             });
            //         })(hoverColour, colourScheme, currentData.icon);
            //     }

            //     // SUB MODULES
            //     var subModulesData = currentData.subModules;
            //     if (subModulesData) { // Check if subModules exists
            //         for (var j = 0; j < subModulesData.length; j++) {
            //             (function (subModule) {
            //                 var hospMenu = document.getElementById('hospitalinfo_menu');
            //                 var subMenuButtons = document.createElement('div');
            //                 subMenuButtons.className = 'sub-menu-buttons';

            //                 var button = document.createElement('button');
            //                 button.className = 'submenu-card-x';
            //                 button.id = subModule.id;
            //                 button.setAttribute('button-focus', subModule.title.split(' ').join(''));

            //                 // Module Action - with proper undefined checks
            //                 if (subModule.moduleAction.packageName &&
            //                     subModule.moduleAction.packageName.includes('video')) {

            //                     var videoApi = subModule.moduleAction.moduleUrl;
            //                     if (videoApi) { // Check if moduleUrl exists
            //                         apiGetCall(corsProxy+videoApi, 'submenu', function (response) {
            //                             if (response){
            //                                 var videoData = JSON.parse(response);
            //                                 console.log(videoData);
            //                                 var videoUrl = videoData.subModules[0].moduleAction.url;
            //                                 button.addEventListener('click', function () {
            //                                     videoPlayerHls(videoUrl);
            //                                 });
            //                             }
            //                         });
            //                     }
            //                 } else if (subModule.moduleAction.url) {
            //                     button.addEventListener('click', function () {
            //                         console.log("Opening PDF ", subModule.moduleAction.url)
            //                         openPdf(corsProxy+ subModule.moduleAction.url);
            //                     });
            //                 }

            //                 // Rest of your submodule creation code...
            //                 var img = document.createElement('img');
            //                 img.src = subModule.icon.imageUrl || ''; // Optional chaining with fallback
            //                 img.alt = subModule.title || ''; // Fallback for alt text

            //                 var span = document.createElement('span');
            //                 span.textContent = subModule.title || ''; // Fallback for text content
            //                 if (currentData.colorScheme.selectionColor) { // Check if color exists
            //                     span.style.color = currentData.colorScheme.selectionColor;
            //                 }


            //                 button.addEventListener('focus', function () {
            //                     if (subModule.icon.focusedImageUrl) { // Check if focusedImageUrl exists
            //                         img.src = subModule.icon.focusedImageUrl;
            //                         img.style.transform = "scale(1.1)";
            //                         span.style.color = currentData.colorScheme.baseColor;
            //                         button.style.background = currentData.colorScheme.selectionColor;
            //                     }
            //                 });

            //                 button.addEventListener('blur', function () {
            //                     if (subModule.icon.imageUrl) { // Check if imageUrl exists
            //                         img.src = subModule.icon.imageUrl;
            //                         img.style.transform = "scale(1)";
            //                         span.style.color = currentData.colorScheme.selectionColor;
            //                         button.style.background = currentData.colorScheme.baseColor;
            //                     }
            //                 });


            //                 button.appendChild(img);
            //                 button.appendChild(span);
            //                 subMenuButtons.appendChild(button);
            //                 hospMenu.appendChild(subMenuButtons);
            //             })(subModulesData[j]);
            //         }
            //     }

            // } 
            else {

                //MAIN MENU
                var colorScheme = currentData.colorScheme;
                var button = document.createElement('button');
                button.className = 'menu-item japit-button';
                button.style.display = 'flex';
                // button.id = currentData.title.split(' ').join('');

                // button.setAttribute('data-type', button.id);
                // button.setAttribute('data-japit-control', 'true');
                // button.setAttribute('data-japit-focusable', 'true');
                // button.setAttribute('data-action', button.id);

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
                // create menu box
                var subMenuBox = document.createElement('div');
                subMenuBox.className = 'submenu-view';
                subMenuBox.id = currentData.title.split(' ').join('');
                

                button.addEventListener("focus", function () {
                    //handleSubmenuClick(subMenuBox.id);
                    previous_page = current_page;
                    current_page = subMenuBox.id;

                    document.getElementById(previous_page).style.display = 'none';
                    document.getElementById(current_page).style.display = 'flex';
                });
                //append to parent div box
                const nonSideBar = document.querySelector('.non-sidebar');
                nonSideBar.appendChild(subMenuBox);
                var subModulesData = data[i].subModules;
                if (subModulesData) { // Check if subModules exists
                    for (var j = 0; j < subModulesData.length; j++) {
                        (function (subModule) {
                            var subMenuButtons = document.createElement('div');
                            subMenuButtons.className = 'sub-menu-buttons';

                            var button = document.createElement('button');
                            button.className = 'submenu-card-x';
                            button.id = subModule.id;
                            button.setAttribute('button-focus', subModule.title.split(' ').join(''));

                            // Module Action - with proper undefined checks
                            // Module Action - with proper undefined checks
                            if (subModule.moduleAction && subModule.moduleAction.packageName &&
                                subModule.moduleAction.packageName.includes('video')) {

                                var videoApi = subModule.moduleAction.moduleUrl;
                                if (videoApi) { // Check if moduleUrl exists
                                    apiGetCall(corsProxy+videoApi, 'submenu', function (response) {
                                         if (response){
                                            var videoData = JSON.parse(response);
                                            console.log(videoData);
                                            var videoUrl = videoData.subModules[0].moduleAction.url;
                                            button.addEventListener('click', function () {
                                                videoPlayerHls(videoUrl);
                                            });
                                        }
                                    });
                                }
                            } else if (subModule.moduleAction && subModule.moduleAction.url) {
                                button.addEventListener('click', function () {
                                    console.log("Opening PDF ", subModule.moduleAction.url)
                                    openPdf(corsProxy+subModule.moduleAction.url);
                                });
                            }


                            // Rest of your submodule creation code...
                            var img = document.createElement('img');
                            img.src = subModule.icon.imageUrl || ''; // Optional chaining with fallback
                            img.alt = subModule.title || ''; // Fallback for alt text

                            var span = document.createElement('span');
                            span.textContent = subModule.title || ''; // Fallback for text content
                            if (currentData.colorScheme.selectionColor) { // Check if color exists
                                span.style.color = currentData.colorScheme.selectionColor;
                            }


                            button.addEventListener('focus', function () {
                                if (subModule.icon.focusedImageUrl) { // Check if focusedImageUrl exists
                                    img.src = subModule.icon.focusedImageUrl;
                                    img.style.transform = "scale(1.1)";
                                    span.style.color = currentData.colorScheme.baseColor;
                                    button.style.background = currentData.colorScheme.selectionColor;
                                }
                            });

                            button.addEventListener('blur', function () {
                                if (subModule.icon.imageUrl) { // Check if imageUrl exists
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
                    // Opera v32 workaround - ensure button is focusable
                    firstButton.setAttribute('tabindex', '0');
                    // Handle focus event
                    subMenuBox.addEventListener('focus', function(e) {
                        // Prevent infinite focus loop
                        console.log('Focsing on scrollable')
                        if (e.target === subMenuBox && document.activeElement !== firstButton) {
                        // Opera v32 needs a small delay for focus to work properly
                        setTimeout(() => {
                            firstButton.focus();
                        }, 10);
                        }
                    }, true); // Use capture phase for better Opera compatibility
                }
            }



        })(data[i]); // Pass current iteration data to closure
    }
}




//FUNCTION TO FIND FIRST BUTTON IN ELEMENTS
// Find the first button child (including nested buttons)
function findFirstButton(element) {
    // Check if current element is a button
    if (element.tagName === 'BUTTON') {
    return element;
    }
    
    // Search through children
    for (var i = 0; i < element.children.length; i++) {
        const found = findFirstButton(element.children[i]);
        if (found) return found;
    }
    
    return null;
}