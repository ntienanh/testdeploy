import { ServiceName } from './enums';

export interface IPagination<T = any> {
  results: T[];
  limit: number;
  page: number;
  totalPages: number;
  totalResults: number;
}

export interface ResponseData {
  [ServiceName.School]: IPagination<ISchool>;
  [ServiceName.Student]: IPagination<IStudent>;
}

export interface IFile {
  name: string;
  mimeType: string;
  originalMimeType: string;
  size: number;
  url: string;
  width: number;
  height: number;
  ext: string;
  originalExt: string;
  blurhash: string;
  alternativeText: string;
  caption: string;
  isActive: boolean;
  createdBy: any;
  updatedBy: any;
  createdAt: string;
  updatedAt: string;
  formats: IFormats;
  id: string;
}

export interface IFormats {
  url: string;
  size: number;
  width: number;
  height: number;
}

export interface ISchool {
  name: string;
  images: IFile;
}

export interface IStudent {
  name: string;
  mssv: string;
  gpa: number;
  achievements: IFile;
}
