import jsPDF from "jspdf";

export const exportNotesToPdf = (text) => {
  const doc = new jsPDF();
  doc.text(text, 10, 10);
  doc.save("canvas_notes.pdf");

  // remove state from locastorage after export
  localStorage.removeItem("learnslate-editor");
};

export const exportCombinePdf = (text, canvas) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  doc.text(text, 10, 10);
  doc.addPage();
  const data = canvas.toDataURL();
  doc.addImage(data, "PNG", 0, 0, canvas.width, canvas.height);
  doc.save("canvas_notes_combine.pdf");

  // remove state from locastorage after export
  localStorage.removeItem("learnslate-editor");
  localStorage.removeItem("learnslate-canvas");
};
