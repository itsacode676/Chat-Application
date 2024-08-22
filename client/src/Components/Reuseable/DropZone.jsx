import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { VscCloudUpload } from "react-icons/vsc";

function DropZone({ getFile, text }) {
  const onDrop = useCallback((acceptedFiles) => {
    getFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div className="border-dashed border-2 mx-6 border-[black] p-5 w-[80%] flex gap-3 h-full px-7 my-4 rounded-md items-center">
          <p className="text-lg text-black">{text} </p>
          <VscCloudUpload className="h-9 w-9"/>
        </div>
      )}
    </div>
  );
}

export default DropZone;
