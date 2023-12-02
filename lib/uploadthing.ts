import { generateComponents } from '@uploadthing/react';
import type { OurFileRouter } from '@/pages/api/upload-thing/server/uploadthing';

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<OurFileRouter>();
