import type { ReactElement } from "react";

export function SideBarItem({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex items-center text-gray-700 p-2 rounded-md hover:bg-gray-200 cursor-pointer transition-colors">
      <div className="p-2">{icon}</div>
      <div className="p-2">{text}</div>
    </div>
  );
}
