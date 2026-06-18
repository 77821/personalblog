import request from "@/utils/request";

export interface GeneratePdfParams {
  content: string;
}

/** 生成 PDF，返回文件流 */
export function generatePdf(data: GeneratePdfParams) {
  return request.postBlob("/pdf/download", data, undefined, "document.pdf");
}
