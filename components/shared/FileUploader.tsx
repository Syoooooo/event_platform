import {
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";

type FileUploadProps = {
  imageUrl: string;
  onFieldChange: (value: string) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "../ui/button";
import { convertFileToUrl } from "@/lib/utils";

const FileUploader = ({
  onFieldChange,
  imageUrl,
  setFiles,
}: FileUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFiles(acceptedFiles);
      onFieldChange(convertFileToUrl(acceptedFiles[0]))
    },
    []
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*"
      ? generateClientDropzoneAccept(["image/*"])
      : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflew-hidden rounded-xl bg-grey-50"
    >
      <input
        {...getInputProps()}
        className="cursor-pointer"
      />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex-center flex-col py-5 text-gray-500">
          <img
            src="/assets/icons/upload.svg"
            width={77}
            height={77}
            alt="file upload"
          />
          <h3 className="mb-2 mt-2">Drop photo here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full">
            Select from
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
