import html2canvas from "html2canvas";
import { FC, RefObject } from "react";

interface ExportButtonProps {
  targetRef: RefObject<HTMLDivElement>;
  imagesLoaded: boolean;
}

export const ExportButton: FC<ExportButtonProps> = ({
  targetRef,
  imagesLoaded,
}) => {
  const handleExport = async () => {
    if (targetRef.current && imagesLoaded) {
      const canvas = await html2canvas(targetRef.current, {
        backgroundColor: "#fff",
        useCORS: true,
        allowTaint: true,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "animes-tierlist.png";
      link.click();
    }
  };

  return (
    <button
      onClick={handleExport}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      disabled={!imagesLoaded}
    >
      {imagesLoaded ? "Exporter en image" : "Chargement des images..."}
    </button>
  );
};
