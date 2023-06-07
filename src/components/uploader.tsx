import { useCallback, useState, Dispatch, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { FileWithPath } from "react-dropzone";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { OurFileRouter } from "@/app/api/uploadthing/core";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Icons } from "@/components/icons";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

type UserImage = {
  fileUrl: string,
  fileKey: string
}


 
interface UploaderProps {
  userImage: UserImage | undefined
  setUserImage: Dispatch<SetStateAction<UserImage | undefined>>
}

export default function Uploader({
  userImage, setUserImage
}: UploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing({
    endpoint: 'imageUploader',
    onClientUploadComplete: () => {
      toast({
        title: "Upload da foto completo.",
        description: "Não esqueça de salvar as suas informações!",
      })
    }, 
    onUploadError: () => {
      toast({
        title: "Algo deu errado.",
        description: "o upload da sua foto não deu certo! Tente novamente.",
        variant: "destructive",
      })
    },
  })

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: permittedFileInfo ? generateClientDropzoneAccept(permittedFileInfo.fileTypes) : undefined,
  });
  
  return (
    <>
      {files.length > 0 ? (
        <button
          disabled={isUploading} 
          type='button' 
          className={cn(buttonVariants())} 
          onClick={async () => {
            setIsUploading(true)

            const res = await startUpload(files)

            setIsUploading(false)
            setFiles([])
            
            if (res) {
              setUserImage({
                fileUrl: res[0].fileUrl,
                fileKey: res[0].fileKey,
              })
            }
          }}
        >
          {isUploading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Upload photo
        </button>
      ) : (
        <div {...getRootProps()} className={cn(buttonVariants({ variant: "link" }), 'p-0 border-none focus:border-none focus:ring-0')}>
        <span>
          Alterar Foto
        </span>
        <input
          {...getInputProps()}
          type='button'
        />
      </div>
      )}
  </>
  );
}