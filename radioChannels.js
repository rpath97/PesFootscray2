// Convert excel with radio channel details to json format, then extracts information about each channels
// Then creates JAPIT objects for each radio channel and sends it to the tv
// Author: Hanson Wilson
// Date: 03/10/2024


var default_chan_no = 200;
var channel_list = [];
var radio_channel_list = [];
var radio_channel_playing = 0;
var radio_channel_num_list = [];

var radioChannelsAflexdata = [];

// Function to remove radio channels from TV channels list
function removeRadioChannelsFromTV() {
    // Get the list of radio channel numbers to remove
    var radioChannelNumbers = radio_channel_num_list;
    
    if (radioChannelNumbers.length > 0) {
        console.log('Removing radio channels:', radioChannelNumbers);
        removeRadioChannels(radioChannelNumbers);
        
        // Clear the radio channel list
        radio_channel_num_list = [];
        channel_list = [];
    }
}

// Make sure to remove radio channels when switching back to TV
function handleRadioToTVSwitch() {
    // First remove any existing radio channels from TV
    removeRadioChannelsFromTV();
    
    // Then perform normal TV channel setup
    if (typeof openTV === 'function') {
        openTV();
    }
}

// function to check if channel logo exists in library
function checkImageExists(imageUrl, callback) {
    var img = new Image();
    img.onload = function () {
        // Image loaded successfully
        callback(true);
    };
    img.onerror = function () {
        // Image failed to load
        callback(false);
    };
    img.src = imageUrl;
}

// Function to remove only radio channels (channels 101-200 range typically used for radio)
function removeOnlyRadioChannels() {
    var radioChannelRange = [];
    
    // Assuming radio channels are in the 101-200 range
    for (var i = 101; i <= 200; i++) {
        radioChannelRange.push(i);
    }
    
    if (radioChannelRange.length > 0) {
        console.log('Removing radio channel range:', radioChannelRange);
        removeRadioChannels(radioChannelRange);
    }
}

