// // Store original plugin reference
// let originalJAPITWIXPPlugin = null;

// // Plugin initialization
// function pluginLoaded() {
//     try {
//         originalJAPITWIXPPlugin = document.getElementById('JAPITWIXPPlugin');
//         console.log('JAPIT Plugin loaded successfully');
        
//         if (originalJAPITWIXPPlugin && typeof originalJAPITWIXPPlugin.WebIxpSend === 'function') {
//             window.JAPITWIXPPlugin = originalJAPITWIXPPlugin;
//             initializeJAPITPlugin();
//         } else {
//             initializeMockJAPITPlugin();
//         }
//     } catch (e) {
//         console.error('Error initializing JAPIT Plugin:', e);
//         initializeMockJAPITPlugin();
//     }
// }

// // Initialize the real JAPIT plugin
// function initializeJAPITPlugin() {
//     // Initialize JAPIT with proper parameters
//     const initParams = {
//         "ApplicationName": "Dashboard",
//         "ApplicationType": "HTML",
//         "KeyHandling": "Absolute",
//         "KeyMask": "0xFFFFFFFF",
//         "ButtonHandling": "Absolute",
//         "ButtonMask": "0xFFFFFFFF",
//         "FocusHandling": true,
//         "SelectHandling": true
//     };

//     // Register key event handler
//     window.JAPITWIXPPlugin.WebIXPOnKeyPress = function(keyCode) {
//         console.log("Key pressed through JAPIT:", keyCode);
//         return handleRemoteKeyPress(keyCode);
//     };

//     // Register select event handler
//     window.JAPITWIXPPlugin.WebIXPOnSelect = function(elementId) {
//         console.log("Select event on:", elementId);
//         const element = document.getElementById(elementId);
//         if (element) {
//             const action = element.getAttribute('data-action');
//             handleJapitButtonClick(elementId);
//             return 0;
//         }
//         return 1;
//     };

//     // Initialize JAPIT
//     window.JAPITWIXPPlugin.WebIxpInit(JSON.stringify(initParams));

//     // Register for JAPIT events
//     window.JAPITWIXPPlugin.WebIxpRegisterForEvent("OnSelect");
//     window.JAPITWIXPPlugin.WebIxpRegisterForEvent("OnKeyPress");
    
//     console.log("Real JAPIT Plugin initialized successfully");
// }

// // Initialize the mock JAPIT plugin for testing
// function initializeMockJAPITPlugin() {
//     window.JAPITWIXPPlugin = {
//         WebIXPOnReceive: null,
//         WebIXPOnKeyPress: null,
//         WebIXPOnButtonClick: null,
        
//         WebIxpSend: function(command) {
//             try {
//                 const parsedCommand = typeof command === 'string' ? JSON.parse(command) : command;
                
//                 // Only log essential information
//                 if (parsedCommand.Fun === "UserInputControl") {
//                     if (parsedCommand.CommandDetails.FocusSettings) {
//                         console.log('Focus command:', {
//                             type: 'Focus',
//                             target: parsedCommand.CommandDetails.FocusSettings.SetFocusTo
//                         });
//                     } else if (parsedCommand.CommandDetails.VirtualKeyDetails) {
//                         console.log('Key command:', {
//                             type: 'VirtualKey',
//                             key: parsedCommand.CommandDetails.VirtualKeyDetails.VirtualKey
//                         });
//                     }
//                 } else if (parsedCommand.Fun === "ApplicationControl") {
//                     console.log('App control:', {
//                         type: 'AppControl',
//                         app: parsedCommand.CommandDetails?.ApplicationDetails?.ApplicationName,
//                         state: parsedCommand.CommandDetails?.ApplicationState
//                     });
//                 }
//             } catch (e) {
//                 console.warn('Non-critical WIXP parse error:', e.message);
//             }
//         }
//     };

//     // Map keyboard events to JAPIT virtual keys
//     // document.addEventListener('keydown', function(event) {
//     //     if (window.JAPITWIXPPlugin.WebIXPOnKeyPress) {
//     //         const keyMap = {
//     //             37: 'HBBTV_VK_LEFT',   // Left
//     //             38: 'HBBTV_VK_UP',     // Up
//     //             39: 'HBBTV_VK_RIGHT',  // Right
//     //             40: 'HBBTV_VK_DOWN',   // Down
//     //             8: 'VK_BACK',          // Backspace
//     //             27: 'VK_EXIT',         // Escape
//     //             13: 'VK_RETURN',       // Enter
//     //             80: 'VK_PORTAL',       // P key
//     //             49: 'HBBTV_VK_1',      // 1 key
//     //             50: 'HBBTV_VK_2'       // 2 key
//     //         };

//     //         const mappedKey = keyMap[event.keyCode];
//     //         if (mappedKey) {
//     //             window.JAPITWIXPPlugin.WebIXPOnKeyPress(mappedKey);
//     //             event.preventDefault();
//     //         }
//     //     }
//     // });

//     console.log("Mock JAPIT Plugin initialized successfully");
// }

// // Initialize on load
// // if (document.readyState === 'loading') {
// //     document.addEventListener('DOMContentLoaded', pluginLoaded);
// // } else {
// //     pluginLoaded();
// // } 