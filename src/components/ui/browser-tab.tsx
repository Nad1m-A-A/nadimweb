type BrowserTabProps = {
  title: string;
  active: boolean;
  onSelect: () => void;
};

export function BrowserTab({ title, active, onSelect }: BrowserTabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onSelect}
      className={`min-w-0 flex-1 truncate rounded-t px-3 py-2 text-sm transition-colors ${
        active ? "bg-white text-black" : "text-gray hover:text-black"
      }`}
    >
      {title}
    </button>
  );
}
