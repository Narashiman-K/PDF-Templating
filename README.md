PDF Templating
This project provides a React-based PDF viewer and editor using PSPDFKit, allowing dynamic replacement of placeholders in PDFs with real-time data and exporting the updated document.

📌 Features
PDF Viewing: Load and display PDF documents using PSPDFKit.
Dynamic Text Replacement: Replace placeholders in the PDF with real-time values from a JSON file/API/Database.
Annotation Handling: Modify and flatten text annotations on the first page of the document.
PDF Export & Download: Automatically save the updated PDF after processing.

🚀 Getting Started
Prerequisites
Ensure you have the following installed:
```
Node.js (v16+ recommended)
npm or yarn
```
PSPDFKit License (for full functionality, otherwise use the trial version)

📥 Installation
Clone the Repository

```
git clone https://github.com/Narashiman-K/PDF-Templating.git
cd PDF-Templating
```
Install Dependencies
```
npm install
```
or
```
yarn install
```

🔧 Configuration
Add a Sample PDF
Place your document.pdf file inside the public folder to load it initially.

Update the Placeholder Data
Modify or create public/data.json with your custom key-value pairs:
```
{
  "designedby": "John Doe",
  "drawnby": "Jane Smith",
  "checkedby": "Michael Brown",
  "approvedby": "Sarah White"
}
```
Set Up Environment Variables (Optional)

If using a licensed version of PSPDFKit, create a .env file in the root directory and add:
```
VITE_lkey=your-license-key-here
```
📂 Project Structure
```
PDF-Templating/
│── public/
│   ├── document.pdf        # Default PDF file (optional)
│   ├── data.json           # Placeholder data file
│── src/
│   ├── components/
│   │   ├── PdfViewerComponent.jsx  # Handles PDF viewing and processing
│   ├── App.jsx             # Main application entry
│   ├── App.css             # Styling for the app
│── .env                    # Environment variables (if needed)
│── package.json            # Project dependencies
│── README.md               # This README file
```

🚀 Running the Application
Start the development server with:
```
npm start
```
or
```
yarn start
```

This will launch the app in your default browser at:

```
http://localhost:3000
```

📖 How It Works
Load PDF: The default document.pdf is loaded, or users can select another PDF file using the file picker.
Fetch Data & Replace Placeholders:

The app fetches data.json and replaces placeholders like {{designedby}} and {{checkedby}} with real values.
Update Annotations:

The script scans page 0 of the PDF and modifies only text annotations.
Flatten & Export PDF: The annotations are flattened, and the final version is automatically downloaded as output.pdf.

🔧 Customization 📌 Modify Placeholder Keys
To change the placeholders recognized by the app, update the replacements object in PdfViewerComponent.jsx:

```
const replacements = {
  "{{designedby}}": data.designedby,
  "{{drawnby}}": data.drawnby,
  "{{checkedby}}": data.checkedby,
  "{{approvedby}}": data.approvedby,
  "{{CurrentDateTime}}": new Date().toLocaleString(),
};
```

License
This project is licensed under the BSD license. See the LICENSE file for more details.

Contributing
Please ensure you have signed our CLA so that we can accept your contributions.

Support, Issues and License Questions
Nutrient offers support for customers with an active SDK license via https://www.nutrient.io/support/request/

Are you evaluating our SDK? That's great, we're happy to help out! To make sure this is fast, please use a work email and have someone from your company fill out our sales form: https://www.nutrient.io/contact-sales/

About
Get all annotations coordinates, create annotations from clipboard data, cut, copy, and paste annotations between pages, and jump and zoom into annotations or just jump to the next annotation without zooming in.

Author
Narashiman Krishnamurthy
