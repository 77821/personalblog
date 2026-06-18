export function getFileNameFromDisposition(
  disposition: string | undefined,
  fallback = "download",
): string {
  if (!disposition) return fallback;

  const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match?.[1]) {
    return decodeURIComponent(utf8Match[1]);
  }

  const quotedMatch = disposition.match(/filename="([^"]+)"/i);
  if (quotedMatch?.[1]) {
    return quotedMatch[1];
  }

  const plainMatch = disposition.match(/filename=([^;]+)/i);
  if (plainMatch?.[1]) {
    return plainMatch[1].trim();
  }

  return fallback;
}

export function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

export async function parseBlobErrorMessage(blob: Blob): Promise<string> {
  try {
    const text = await blob.text();
    const json = JSON.parse(text) as { msg?: string; message?: string };
    return json.msg || json.message || "请求失败";
  } catch {
    return "请求失败";
  }
}
