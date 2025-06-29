import { HorizontalVideoScroller } from "@/components/SwiftGallery/SwiftGallery";
import HorizontalScroller from "@/components/text";
import EXPERIMENTS from "@/experiments";

const items = EXPERIMENTS.map((experiment) => {
  return (
    <video
      className="exp-card-video max-w-80 outline outline-red-500"
      src={experiment.src}
      autoPlay
      loop
      muted
      controlsList="nofullscreen"
      disablePictureInPicture
      playsInline
    />
  );
});

export default function Home() {
  return (
    <main className="min-h-screen font-[family-name:var(--font-geist-sans)] p-4 pt-8 sm:pt-14  mx-auto bg-[var(--background)]">
      <HorizontalScroller>{items}</HorizontalScroller>
    </main>
  );
}
