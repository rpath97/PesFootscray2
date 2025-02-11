/* 
*
* This can be reused in as is or even modified freely.
*
*/

/* a function to initialize our module */
function init() {
	UtilityInit();
	console.log("Unitility init done");
	Exercise01ModelInit();
	Exercise01ViewInit();
	
	
	// Register for JAPIT key events
	// if (window.JAPITWIXPPlugin && typeof window.JAPITWIXPPlugin.WebIxpKeyPress === 'function') {
	// 	window.JAPITWIXPPlugin.WebIxpKeyPress = handleRemoteKeyPress;
	// }
}
