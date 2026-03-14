import { Badge } from "@/components/ui/badge";

export default function ClosingVideoSection() {
  return (
    <section className="border-t bg-muted/20 py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-3">Un message pour porter l'activité</Badge>
          {/* <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Un message pour porter l'activité
          </h2> */}
          {/* <p className="mt-4 text-lg text-muted-foreground">
            Cette vidéo presente la vision du Salon Betsaleel et rappelle le bien-fondé de
            l'initiative.
          </p> */}
        </div>

        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl border bg-black shadow-sm">
          <video
            className="aspect-video w-full"
            controls
            preload="metadata"
            poster="/homepage/affiche%20salon.jpeg"
          >
            <source src="/homepage/video%20salon%20betsaleel.mp4" type="video/mp4" />
            Votre navigateur ne prend pas en charge la lecture video.
          </video>
        </div>
      </div>
    </section>
  );
}