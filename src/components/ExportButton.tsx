import * as htmlToImage from "html-to-image";
import { FC } from "react";

interface ExportButtonProps {
  elementId: string;
}

const ExportButton: FC<ExportButtonProps> = ({ elementId }) => {
  const exportAsImage = () => {
    const node = document.getElementById(elementId);
    if (!node) {
      console.error(`Element with id ${elementId} not found`);
      return;
    }

    htmlToImage
      .toPng(node)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "tierlist.png";
        link.click();
      })
      .catch((error) => {
        console.error("Erreur lors de l'export en image", error);
      });
  };

  return (
    <button
      onClick={exportAsImage}
      className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition-colors"
    >
      Exporter en image
    </button>
  );
};

export default ExportButton;
