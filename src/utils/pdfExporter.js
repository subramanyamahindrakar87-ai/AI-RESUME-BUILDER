import html2pdf from 'html2pdf.js';
import confetti from 'canvas-confetti';

export const exportToPdf = async (elementId, filename = "Resume.pdf") => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    alert("Could not locate resume container to generate PDF.");
    return false;
  }

  const opt = {
    margin: [6, 6, 6, 6],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true, 
      allowTaint: true, 
      letterRendering: true, 
      logging: false,
      scrollX: 0,
      scrollY: 0
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    // Trigger confetti celebration!
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });

    await html2pdf().set(opt).from(element).save();
    return true;
  } catch (err) {
    console.warn("html2pdf error, launching print dialogue:", err);
    window.print();
    return true;
  }
};
