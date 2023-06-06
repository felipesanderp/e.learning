"use client";

import { useDropzone } from "react-dropzone";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { useCallback, useState } from "react";
import type { FileWithPath } from "react-dropzone";
import { generateClientDropzoneAccept } from "uploadthing/client";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();
 
export default function Uploader() {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { isUploading, startUpload, permittedFileInfo } = useUploadThing({
    endpoint: 'imageUploader',
    onClientUploadComplete: () => {
      alert("uploaded successfully!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },

  })

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: permittedFileInfo ? generateClientDropzoneAccept(permittedFileInfo.fileTypes) : undefined,
  });
  
  return (
    <>
      <div {...getRootProps()} className="border-border border-2 rounded-md border-dashed w-36 h-36">
        <p className="items-center justify-center flex relative top-[50px] flex-col text-sm">
          <span className="font-semibold mr-1">Click to upload</span>
          <span>or drag and drop.</span>
        </p>
        <input
          {...getInputProps()}
          className="block relative z-10 h-[100px] border-2 opacity-0 w-full"
        />
      </div>
      <div>
      {files.length > 0 && (
        <button type='button' onClick={() => startUpload(files)}>
          Upload {files.length} files
        </button>
      )}
    </div>
  </>
  );
}