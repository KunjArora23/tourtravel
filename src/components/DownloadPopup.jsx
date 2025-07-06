import { useEffect, useState } from "react";

export default function DownloadPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 5000); // show after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <>
      {/* Overlay with blur effect */}
      <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/30" />

      {/* Popup box */}
      <div className="fixed z-50 top-1/2 left-1/2 w-[90vw] max-w-sm md:max-w-md transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 rounded-xl p-5 shadow-2xl border border-gray-300">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="text-3xl">📥</div>
          <h2 className="text-base md:text-lg font-semibold">
            Tips to Travel to India
          </h2>
          <p className="text-sm text-gray-600">
            Download our short guide to stay safe, travel smart, and make the most of your trip.
          </p>
          <a
            href="/india-tips.pdf"
            download
            className="mt-2 inline-block bg-gray-800 text-white px-4 py-2 text-sm rounded hover:bg-gray-900 transition"
          >
            Download PDF
          </a>
          <button
            onClick={() => setShow(false)}
            className="text-xs text-gray-500 hover:text-red-500 mt-2"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}