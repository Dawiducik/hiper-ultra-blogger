export default function friendlyDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleString();
}
