import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import QRCode from 'qrcode';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route for the certificate page
app.get('/noc/Ecertificate', (req, res) => {
    const certId = req.query.q || 'NPTEL24HS101S24400138902671928';
    res.render('index', { certId });
});

// Root route
app.get('/', (req, res) => {
    const certId = req.query.q || 'NPTEL24HS101S24400138902671928';
    res.render('index', { certId });
});

// QR Code Route
app.get('/qr', async (req, res) => {
    const certId = req.query.q || 'NPTEL24HS101S24400138902671928';
    // The user wants to redirect to nptel.ac.fun with the cert ID
    const targetUrl = `https://nptel.ac.fun/noc/Ecertificate/?q=${certId}`;
    const displayUrl = `https://nptel.ac.in/noc/Ecertificate/?q=${certId}`;
    try {
        const qrImage = await QRCode.toDataURL(targetUrl);
        res.render('qr', { qrImage, targetUrl, displayUrl, certId });
    } catch (err) {
        console.error('Error generating QR code:', err);
        res.status(500).send('Internal Server Error');
    }
});

// API route to serve the PDF
app.get('/content/noc/NOC24/SEM2/Ecertificates/109/noc24-hs101/Course/:pdfName', (req, res) => {
    const pdfName = req.params.pdfName;
    // Construct the path to the PDF file
    // We assume the content folder is inside the current directory (cert/cert/content/...)
    const filePath = path.join(__dirname, 'content', 'noc', 'NOC24', 'SEM2', 'Ecertificates', '109', 'noc24-hs101', 'Course', pdfName);
    
    // res.download forces a download, so we use res.sendFile with headers for inline viewing
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${pdfName}"`);

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            // Only send status if headers haven't been sent
            if (!res.headersSent) {
                res.status(404).send('File not found');
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
