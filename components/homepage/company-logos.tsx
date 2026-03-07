export default function CompanyLogos() {
  const names = ["Jeunesse de l'Église", "Mentors", "Entrepreneurs", "Partenaires", "Exposants"];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
      {names.map((name) => (
        <span key={name} className="rounded-full border px-4 py-2 text-sm text-muted-foreground bg-background">
          {name}
        </span>
      ))}
    </div>
  );
}
