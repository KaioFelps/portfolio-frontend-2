export function FloatingInputError({ error }: { error?: string }) {
  if (!error) return null;
  return <span className="alert danger mb-2 mt-4 sm">{error}</span>;
}
