export function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full bg-white/15 px-3 py-1 text-xs text-white"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
