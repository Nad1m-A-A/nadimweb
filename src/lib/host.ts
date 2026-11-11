/** `https://www.example.com/en` → `example.com` */
export function host(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}
