"use client";

import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import ContentCard from "@/components/ContentCard/ContentCard";

const ResumeDownload = () => {
  const downloadFile = (format: string) => {
    // Construct the URL for the file based on the format
    const filePath = `/resumes/resume.${format}`;
    // Utilize window.location.origin to get the domain
    const fileUrl = `${window.location.origin}${filePath}`;

    // Create a temporary anchor element and trigger the download
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `resume.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ContentCard
      show={false}
      title="Resume"
      content={
        <div>
          <p className="py-1 max-w-2xl font-light text-gray-500 dark:text-gray-300 mb-4">
            Download my resume in .MD, .PDF, or .DOCX format.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-3">
            {["md", "pdf", "docx"].map((format) => (
              <li
                key={format}
                className="col-span-1 flex items-center justify-center py-2 px-2"
              >
                <Button
                  onClick={() => downloadFile(format)}
                  className="group bg-white dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md px-4 py-2 border border-gray-700 dark:border-gray-700 flex items-center justify-center"
                >
                  <DocumentArrowDownIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-yellow-400 dark:group-hover:text-yellow-400 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-300 font-medium group-hover:text-yellow-400 dark:group-hover:text-yellow-400">
                    {format.toUpperCase()}
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      }
    />
  );
};

export default ResumeDownload;
