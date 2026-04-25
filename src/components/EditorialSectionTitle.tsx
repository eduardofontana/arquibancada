interface EditorialSectionTitleProps {
  title: string;
  editoria: string;
  live?: boolean;
  as?: "h1" | "h2";
  center?: boolean;
}

export function EditorialSectionTitle({
  title,
  editoria,
  live = false,
  as = "h2",
  center = false,
}: EditorialSectionTitleProps) {
  const HeadingTag = as;

  return (
    <div className={`section-editorial ${center ? "section-editorial-center" : ""}`}>
      <div className="section-editorial-kicker-wrap">
        <span className={`section-editorial-dot ${live ? "animate-pulse" : ""}`} />
        <span className="section-editorial-kicker">{editoria}</span>
      </div>
      <HeadingTag className="section-editorial-title">{title}</HeadingTag>
    </div>
  );
}
