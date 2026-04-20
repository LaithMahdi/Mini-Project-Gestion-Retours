type Props = {
  initials: string;
  displayName: string;
  displayEmail: string;
};

export default function AvatarDropdownHeader({
  initials,
  displayName,
  displayEmail,
}: Props) {
  return (
    <>
      <div className="relative h-14 bg-linear-to-r from-sky-400 via-blue-500 to-indigo-500">
        <div className="absolute -bottom-5 left-4">
          <div className="h-10 w-10 rounded-full ring-2 ring-white dark:ring-[#16181c] bg-linear-to-br from-sky-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow">
            {initials}
          </div>
        </div>
      </div>

      <div className="pt-7 px-4 pb-3">
        <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
          {displayName}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {displayEmail}
        </p>
      </div>
    </>
  );
}
