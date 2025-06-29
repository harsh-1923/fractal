"use client";

interface VideoCardProps {
  title: string;
  tag: string;
  src: string;
  link: string;
  scale: number;
  isScaling: boolean;
}

export function VideoCard({
  title,
  tag,
  src,
  link,
  scale,
  isScaling,
}: VideoCardProps) {
  return (
    <div
      className="flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
      style={{
        width: "320px",
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        willChange: isScaling ? "transform" : "auto",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="relative">
        <video
          className="w-full h-48 object-cover"
          src={src}
          autoPlay
          loop
          muted
          controlsList="nofullscreen"
          disablePictureInPicture
          playsInline
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{tag}</p>
        <a
          href={link}
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 text-sm"
        >
          View Experiment
        </a>
      </div>
    </div>
  );
}
