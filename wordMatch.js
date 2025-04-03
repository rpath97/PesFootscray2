function getClosestImage(targetName, folderPath) {
    if (!fs.existsSync(folderPath)) {
        console.log("Error: Folder does not exist.");
        return null;
    }

    var imageList = fs.readdirSync(folderPath) // Get all files in folder
                      .filter(file => /\.(png|jpg|jpeg|gif)$/i.test(file)); // Filter image files

    var closestMatch = null;
    var smallestDistance = Infinity; 

    for (var i = 0; i < imageList.length; i++) {
        var imageName = imageList[i];

        // If exact match, return immediately
        if (imageName.toLowerCase() === targetName.toLowerCase()) {
            return imageName;
        }

        // Calculate similarity using Levenshtein Distance
        var distance = levenshteinDistance(targetName.toLowerCase(), imageName.toLowerCase());

        // Update closest match
        if (distance < smallestDistance) {
            smallestDistance = distance;
            closestMatch = imageName;
        }
    }

    return closestMatch;
}

// Levenshtein Distance Algorithm (String Similarity)
function levenshteinDistance(a, b) {
    var m = a.length, n = b.length;
    var dp = [];

    for (var i = 0; i <= m; i++) {
        dp[i] = [i];
    }
    for (var j = 1; j <= n; j++) {
        dp[0][j] = j;
    }

    for (var i = 1; i <= m; i++) {
        for (var j = 1; j <= n; j++) {
            var cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(dp[i - 1][j] + 1,    // Deletion
                                dp[i][j - 1] + 1,    // Insertion
                                dp[i - 1][j - 1] + cost); // Substitution
        }
    }

    return dp[m][n];
}