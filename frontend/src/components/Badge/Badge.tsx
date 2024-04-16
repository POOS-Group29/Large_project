import clsx from "clsx";

const getColor = (type: string) => {
  switch (type) {
    case "gray":
      return "bg-gray-50 text-gray-600 ring-gray-500/10";
    case "red":
      return "bg-red-50 text-red-700 ring-red-600/10";
    case "yellow":
      return "bg-yellow-50 text-yellow-800 ring-yellow-600/20";
    case "green":
      return "bg-green-50 text-green-700 ring-green-600/20";
    case "blue":
      return "bg-blue-50 text-blue-700 ring-blue-700/10";
    case "indigo":
      return "bg-indigo-50 text-indigo-700 ring-indigo-700/10";
    case "purple":
      return "bg-purple-50 text-purple-700 ring-purple-700/10";
    case "pink":
      return "bg-pink-50 text-pink-700 ring-pink-700/10";
    default:
      return "bg-gray-50 text-gray-600 ring-gray-500/10";
  }
};

const getColorDark = (type: string) => {
  switch (type) {
    case "gray":
      return "bg-gray-400/10 text-gray-400 ring-gray-400/20";
    case "red":
      return "bg-red-400/10 text-red-400 ring-red-400/20";
    case "yellow":
      return "bg-yellow-500/10 text-yellow-500 ring-yellow-400/20";
    case "green":
      return "bg-green-500/10 text-green-400 ring-green-500/20";
    case "blue":
      return "bg-blue-400/10 text-blue-400 ring-blue-400/30";
    case "indigo":
      return "bg-indigo-400/10 text-indigo-400 ring-indigo-400/30";
    case "purple":
      return "bg-purple-400/10 text-purple-400 ring-purple-400/30";
    case "pink":
      return "bg-pink-400/10 text-pink-400 ring-pink-400/20";
    default:
      return "bg-gray-400/10 text-gray-400 ring-gray-400/20";
  }
};

const getColorBasedOnText = (text: string) => {
  const color = text.charCodeAt(0) % 8;
  switch (color) {
    case 0:
      return "gray";
    case 1:
      return "red";
    case 2:
      return "yellow";
    case 3:
      return "green";
    case 4:
      return "blue";
    case 5:
      return "indigo";
    case 6:
      return "purple";
    case 7:
      return "pink";
    default:
      return "gray";
  }
};

interface IBadge {
  text: string;
  type?: string;
  dark?: boolean;
}

export const Badge = (props: IBadge) => {
  const { type, text, dark } = props;

  const getColorFn = dark ? getColorDark : getColor;

  return (
    <span
      className={clsx(
        getColorFn(type || getColorBasedOnText(text)),
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
      )}
    >
      {text}
    </span>
  );
};
