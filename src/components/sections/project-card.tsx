import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

export type Project = {
  title: string;
  description: string;
  image: string;
  href: string;
};

export function ProjectCard({ title, description, image, href }: Project) {
  return (
    <article className="flex h-full flex-col gap-4 rounded bg-white p-4 shadow-rest transition-shadow hover:shadow-hover">
      <div className="relative aspect-video overflow-hidden rounded bg-gray/10">
        <Image src={image} alt={title} fill
          unoptimized={image.endsWith(".svg")}
          className="object-cover"
        />
      </div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray">{description}</p>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-auto inline-flex w-fit items-center gap-1 rounded bg-black px-4 py-2 text-sm text-white shadow-rest transition-shadow hover:shadow-hover"
      >
        Visit
        <FiArrowUpRight />
      </a>
    </article>
  );
}
