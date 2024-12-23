export function normalizePhone(phone: string): string {
  return phone.replace(/\s+/g, '').replace('+', '');
}
