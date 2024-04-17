import clsx from "clsx";

const getColor = (type: string) => {
  switch (type) {
    case "gray":
      return {
        span: "bg-gray-50 text-gray-600 ring-gray-500/10",
        button: "hover:bg-gray-500/20",
        svg: "stroke-gray-600/50 group-hover:stroke-gray-600/75",
      };
    case "red":
      return {
        span: "bg-red-50 text-red-600 ring-red-500/10",
        button: "hover:bg-red-500/20",
        svg: "stroke-red-600/50 group-hover:stroke-red-600/75",
      };
    case "yellow":
      return {
        span: "bg-yellow-50 text-yellow-600 ring-yellow-500/10",
        button: "hover:bg-yellow-500/20",
        svg: "stroke-yellow-600/50 group-hover:stroke-yellow-600/75",
      };
    case "green":
      return {
        span: "bg-green-50 text-green-600 ring-green-500/10",
        button: "hover:bg-green-500/20",
        svg: "stroke-green-600/50 group-hover:stroke-green-600/75",
      };
    case "blue":
      return {
        span: "bg-blue-50 text-blue-600 ring-blue-500/10",
        button: "hover:bg-blue-500/20",
        svg: "stroke-blue-600/50 group-hover:stroke-blue-600/75",
      };
    case "indigo":
      return {
        span: "bg-indigo-50 text-indigo-600 ring-indigo-500/10",
        button: "hover:bg-indigo-500/20",
        svg: "stroke-indigo-600/50 group-hover:stroke-indigo-600/75",
      };
    case "purple":
      return {
        span: "bg-purple-50 text-purple-600 ring-purple-500/10",
        button: "hover:bg-purple-500/20",
        svg: "stroke-purple-600/50 group-hover:stroke-purple-600/75",
      };
    case "pink":
      return {
        span: "bg-pink-50 text-pink-600 ring-pink-500/10",
        button: "hover:bg-pink-500/20",
        svg: "stroke-pink-600/50 group-hover:stroke-pink-600/75",
      };
    default:
      return {
        span: "bg-gray-50 text-gray-600 ring-gray-500/10",
        button: "hover:bg-gray-500/20",
        svg: "stroke-gray-600/50 group-hover:stroke-gray-600/75",
      };
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

interface ITag {
  text: string;
  type?: string;
  onClick?: () => void;
}

export const Tag = (props: ITag) => {
  const { type, text } = props;

  const color = getColor(type || getColorBasedOnText(text));

  return (
    <span
      className={clsx(
        color.span,
        "inline-flex items-center gap-x-0.5 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
      )}
      onClick={props.onClick}
    >
      {text}
      <button
        type="button"
        className={clsx(
          color.button,
          "group relative -mr-1 h-3.5 w-3.5 rounded-sm"
        )}
      >
        <span className="sr-only">Remove</span>
        <svg viewBox="0 0 14 14" className={clsx(color.svg, "h-3.5 w-3.5")}>
          <path d="M4 4l6 6m0-6l-6 6" />
        </svg>
        <span className="absolute -inset-1" />
      </button>
    </span>
  );
};
