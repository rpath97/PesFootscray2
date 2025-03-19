
//url: pdf file url
//canvas: html canvas block
async function renderPDF(url, pdf_container_id) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "pdf.worker.js";

    const container = document.getElementById(pdf_container_id);
    container.innerHTML = ''; // Clear previous content

    const pdf = await pdfjsLib.getDocument(url).promise;
    
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        console.log("page num ", page)
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
    }
}