import { stackItems } from "@/data/stack";

export function CareerStack() {
  return (
    <ul className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-4 px-6 py-6 lg:flex-nowrap lg:px-12">
      {stackItems.map(({ label, Logo }) => (
        <li key={label} className="flex items-center gap-2">
          <Logo className="size-5 shrink-0 xl:size-6" />
          <span className="text-sm tracking-tight whitespace-nowrap text-gray">{label}</span>
        </li>
      ))}
    </ul>
  );
}
