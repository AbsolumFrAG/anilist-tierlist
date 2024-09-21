import html2canvas from "html2canvas";
import { FC, RefObject, useState } from "react";

interface ExportButtonProps {
  targetRef: RefObject<HTMLDivElement>;
  imagesLoaded: boolean;
}

export const ExportButton: FC<ExportButtonProps> = ({
  targetRef,
  imagesLoaded,
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (targetRef.current && imagesLoaded) {
      setIsExporting(true);
      try {
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
      } catch (error) {
        console.error("Error exporting image:", error);
        alert("Failed to export image. Please try again.");
      } finally {
        setIsExporting(false);
      }
    }
  };

  return (
    <button
      onClick={handleExport}
      className={`
        relative px-4 py-2 font-bold text-white rounded
        transition-all duration-200 ease-in-out
        ${
          imagesLoaded && !isExporting
            ? "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      disabled={!imagesLoaded || isExporting}
    >
      {isExporting && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      )}
      <span className={isExporting ? "invisible" : ""}>
        {imagesLoaded ? "Export as Image" : "Loading images..."}
      </span>
    </button>
  );
};
