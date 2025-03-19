
//url: pdf file url
//canvas: html canvas block
async function renderPDF(url, pdf_container_id) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "pdf.worker.js";

    const container = document.getElementById(pdf_container_id);
    container.innerHTML = ''; // Clear previous content

    try {
        const pdf = await pdfjsLib.getDocument(url).promise;
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            //console.log("page num ", page)
            const scale = 1.5;
            const viewport = page.getViewport({ scale });
    
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
    
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            await page.render(renderContext).promise; // Ensure rendering completes
    
            // Convert Canvas to Image
            const img = document.createElement('img');
            img.src = canvas.toDataURL('image/png');
            img.style.width = '100%'; // Fit within container
            container.appendChild(img);
            document.getElementById("logmsgcallback").value += '\n' + "Finished rendering pdf" + '\n';
            document.getElementById("logmsgcallback").scrollTop = document.getElementById("logmsgcallback").scrollHeight;  
        }
    } catch (err) {
        document.getElementById("logmsgcallback").value += '\n' + "Erro fetch pdf url" + err + '\n';
		document.getElementById("logmsgcallback").scrollTop = document.getElementById("logmsgcallback").scrollHeight;  
    }
    
}
//non-canvas: html canvas block
async function renderPDF2(url, pdf_container_id) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "pdf.worker.js";

    const container = document.getElementById(pdf_container_id);
    container.innerHTML = ''; // Clear previous content

    try {
        const pdf = await pdfjsLib.getDocument(url).promise;
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            //console.log("page num ", page)
            const scale = 1.5;
            const viewport = page.getViewport({ scale });
    
            // Create an OffscreenCanvas
            const offscreenCanvas = new OffscreenCanvas(viewport.width, viewport.height);
            const context = offscreenCanvas.getContext('2d');
            // canvas.width = viewport.width;
            // canvas.height = viewport.height;
    
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            await page.render(renderContext).promise; // Ensure rendering completes
    
           // Convert the OffscreenCanvas to an image (e.g., PNG)
            const imageBitmap = await offscreenCanvas.transferToImageBitmap();
            const blob = await offscreenCanvas.convertToBlob({ type: 'image/png' });
            const imageUrl = URL.createObjectURL(blob);

            // Display the image on the page
            const img = document.createElement('img');
            img.src = imageUrl;
            img.style.width = '100%';
            container.appendChild(img);


            document.getElementById("logmsgcallback").value += '\n' + "Finished rendering pdf" + '\n';
            document.getElementById("logmsgcallback").scrollTop = document.getElementById("logmsgcallback").scrollHeight;  
        }
    } catch (err) {
        document.getElementById("logmsgcallback").value += '\n' + "Erro fetch pdf url" + err + '\n';
		document.getElementById("logmsgcallback").scrollTop = document.getElementById("logmsgcallback").scrollHeight;  
    }
    
}

//non-canvas: html canvas block
function renderPDF3(url, pdf_container_id) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "pdf.worker.js";

    const container = document.getElementById(pdf_container_id);
    container.innerHTML = ''; // Clear previous content

    pdfjsLib.getDocument(url).promise.then(pdf => {
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            pdf.getPage(pageNum).then(page => {
                const scale = 1.5;
                const viewport = page.getViewport({ scale });

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext).promise.then(() => {
                    // Convert Canvas to Image
                    const img = document.createElement('img');
                    img.src = canvas.toDataURL('image/png');
                    img.style.width = '100%'; // Fit within container
                    container.appendChild(img);
                });
            });
        }
    });
    
}


