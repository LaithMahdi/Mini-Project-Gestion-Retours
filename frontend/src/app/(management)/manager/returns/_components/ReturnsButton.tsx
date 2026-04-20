interface Props {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const ReturnsButton = (props: Props) => {
  const { label, isSelected, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
        isSelected
          ? "bg-sky-500 text-white shadow-sm shadow-sky-500/30"
          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
      }`}
    >
      {label}
    </button>
  );
};

export default ReturnsButton;
