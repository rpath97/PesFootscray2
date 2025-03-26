

function loadMainMenu(data) {
    const mainMenuButtons = [];
    for (var i = 0; i < data.length; i++) {
        const title = data[i].title;
        mainMenuButtons.push(title);

        const entertainmentButton = document.getElementById('entertainmentButton');
        if (title.toLowerCase().includes('entertainment')) {
            entertainmentButton.style.display = 'flex';
            const img = entertainmentButton.getElementsByTagName("img")[0];
            if (data[i].icon.imageUrl){
                img.src = data[i].icon.imageUrl;
            }
            
        } else {
            //
            //entertainmentButton.style.display = 'none';
        }
    }

    console.log(mainMenuButtons); // Output: ["Alice", "Bob", "Charlie"]
}