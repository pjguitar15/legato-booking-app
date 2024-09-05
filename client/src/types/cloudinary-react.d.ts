// src/cloudinary-react.d.ts
declare module "cloudinary-react" {
  import { ReactNode } from "react";

  export const CloudinaryContext: React.FC<{
    cloudName: string;
    children?: ReactNode;
  }>;

  export const Image: React.FC<{
    publicId: string;
    width?: number;
    crop?: string;
  }>;

  export const Transformation: React.FC<{
    quality?: string;
    fetchFormat?: string;
  }>;
}
