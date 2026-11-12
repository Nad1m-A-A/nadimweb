import Image from "next/image";
import type { StageCardProps } from "@/types/ui";

/** Project card: identical branded stage; the screenshot bleeds off bottom-right. */
export default function StageCard({
  name,
  caption,
  image,
  href,
}: StageCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-[2px] border border-b-0 border-border bg-(--grain-wash) bg-(image:--grain)">
        {image && (
          <div className="absolute top-[9%] left-[11%] h-full w-full origin-top-left overflow-hidden rounded-[2px] border border-border shadow-[0_12px_32px_-6px_rgb(61_57_41/0.4),0_2px_6px_rgb(61_57_41/0.15)] transition-transform duration-500 ease-calm group-hover:-translate-x-[1%] group-hover:-translate-y-[1%] motion-reduce:transition-none">
            <Image
              src={image}
              alt={`${name} screenshot`}
              fill
              sizes="(min-width: 640px) 360px, 100vw"
              className="object-cover object-left-top"
            />
          </div>
        )}
      </div>
      <div className="flex-1 rounded-b-[2px] border border-t-0 border-border bg-surface/50 px-4 py-4">
        <h3>{name}</h3>
        {caption && <p className="mt-2 text_body text-muted">{caption}</p>}
      </div>
    </a>
  );
}
