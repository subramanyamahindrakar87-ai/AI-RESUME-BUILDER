import html2pdf from 'html2pdf.js';
import confetti from 'canvas-confetti';

export const exportToPdf = async (elementId, filename = "Resume.pdf") => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    alert("Could not locate resume preview container to generate PDF.");
    return false;
  }

  const opt = {
    margin: [8, 8, 8, 8],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true, logging: false },
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
    console.warn("html2pdf failed, triggering fallback print dialogue:", err);
    window.print();
    return true;
  }
};
