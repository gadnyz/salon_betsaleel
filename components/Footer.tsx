export default function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container flex flex-col gap-2 px-4 text-sm text-muted-foreground md:px-6 md:flex-row md:items-center md:justify-between">
        <p> © {new Date().getFullYear()} Salon Betsaleel. Tous droits réservés.</p>
        <p>Équipe d'organisation : (+243) 97 773 98 26 - 97 691 88 72</p>
      </div>
    </footer>
  );
}
