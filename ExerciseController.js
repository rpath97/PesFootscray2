/* 
*
* This can be reused in as is or even modified freely.
*
*/

/* a function to initialize our module */
function init() {
	UtilityInit();

	//rawAflexData = apiGetCall("http://10.5.5.244/moduleData.php", 'mainMenu');
	apiGetCall('http://10.5.5.244/moduleData.php', 'mainMenu', function(response) {
		if (response) {
			console.log('API Response:', response);
			// Process the response here (e.g., parse JSON)
			rawAflexData = JSON.parse(response);
			//loadSubMenu(data);
		} else {
			console.log('API request failed');
		}
	});
	
	// Add datetime update function
	function updateDateTime() {
		const now = new Date();
		const options = { 
			weekday: 'long', 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric', 
			hour: '2-digit', 
			minute: '2-digit',
			hour12: false, // Use 24-hour format
			timeZone: 'Australia/Victoria'
		};
		
		// Format the date for Victoria timezone
		const formatter = new Intl.DateTimeFormat('en-AU', options);
		const headerTime = document.querySelector('.time');
		if (headerTime) {
			headerTime.innerText = formatter.format(now);
		}
	}

	// Update every second
	setInterval(updateDateTime, 1000);

	// Run immediately
	updateDateTime();

	// Rest of init code...
	setTimeout(function() {
		try {
			document.addEventListener("keydown", keyDownHandler, true);
			document.addEventListener("OnKeyReceived", OnKeyReceivedHandler, false);
		} catch(e) {
			console.log(e);
		}
	}, 5000);

	console.log("Utility init done");
	Exercise01ModelInit();
	// Exercise01ViewInit();
	
	
	// Register for JAPIT key events
	// if (window.JAPITWIXPPlugin && typeof window.JAPITWIXPPlugin.WebIxpKeyPress === 'function') {
	// 	window.JAPITWIXPPlugin.WebIxpKeyPress = handleRemoteKeyPress;
	// }
}
