export function GradientText({ id, children }: { id: string; children: string }) {
  return <h2 className="gradient-text" id={id}>{children}</h2>;
}
