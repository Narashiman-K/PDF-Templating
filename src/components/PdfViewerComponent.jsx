import { useEffect, useRef } from "react";

export default function PdfViewerComponent(props) {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);
  const PSPDFKitRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    (async function () {
      const PSPDFKit = await import("pspdfkit");
      PSPDFKitRef.current = PSPDFKit;
      PSPDFKit.unload(container);

      // Load JSON data from public folder or from your custom API/database
      const response = await fetch("/data.json");
      const data = await response.json();

      const instance = await PSPDFKit.load({
        //licenseKey: import.meta.env.VITE_lkey, // Your License is fetched from .env file comment this if you want to use the trial version
        container,
        document: props.document,
        baseUrl: `${window.location.protocol}//${window.location.host}/${
          import.meta.env.PUBLIC_URL ?? ""
        }`,
        toolbarItems: PSPDFKit.defaultToolbarItems,
      });

      instanceRef.current = instance;

      // Placeholder replacement mapping
      const replacements = {
        "{{designedby}}": data.designedby,
        "{{drawnby}}": data.drawnby,
        "{{checkedby}}": data.checkedby,
        "{{approvedby}}": data.approvedby,
        "{{CurrentDateTime}}": new Date().toLocaleString(),
      };

      // Function to replace placeholders
      const updateAnnotations = async () => {
        const annotations = await instance.getAnnotations(0); // Get annotations on page 0
        const updatedAnnotations = annotations
          .filter(
            (annotation) =>
              annotation instanceof PSPDFKit.Annotations.TextAnnotation
          )
          .map((annotation) => {
            const newValue = replacements[annotation.text.value];
            if (newValue) {
              return annotation.set("text", {
                format: annotation.text.format,
                value: newValue,
              });
            }
            return annotation;
          });

        const completed = await instance.update(updatedAnnotations);
        console.log(completed);
      };

      const comp = await updateAnnotations();
      if (comp && instance) {
        await instance.applyOperations({
          type: "flattenAnnotations",
        });
          console.log("Document updated successfully");
          const content = await instance.exportPDF({ flatten: true });
          const blob = new Blob([content], { type: "application/pdf" });
              const objectUrl = window.URL.createObjectURL(blob);
              downloadPdf(objectUrl);
              window.URL.revokeObjectURL(objectUrl);

          function downloadPdf(blob) {
            const a = document.createElement("a");
            a.href = blob;
            a.style.display = "none";
            a.download = "output.pdf";
            a.setAttribute("download", "output.pdf"); // here instead of download, you can directly use the blob data and save the file as pdf in your desired location.
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        } else {
          console.log("Document update failed");
        }

      return () => {
        PSPDFKit.unload(container);
      };
    })();
  }, [props.document]);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}