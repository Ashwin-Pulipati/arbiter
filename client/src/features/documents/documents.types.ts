import type { Document, DocumentCreate } from "@/types";
export type DocumentsDialogMode = "create" | "edit";
export type DocumentsDialogState = {
  open: boolean;
  mode: DocumentsDialogMode;
  doc?: Document;
};
export type DocumentUpsert = DocumentCreate;
