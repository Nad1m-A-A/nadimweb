export function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap justify-end gap-2">
      {tags.map((tag) => (
        <li key={tag} className="rounded bg-gray/10 px-2 py-1 text-xs text-gray">
          {tag}
        </li>
      ))}
    </ul>
  );
}
