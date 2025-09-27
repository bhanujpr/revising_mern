import { DocumentIcon } from "../../icons/DocumentIcon";
import { LinkIcon } from "../../icons/LinkIcon";
import { TagsIcon } from "../../icons/TagsIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SideBarItem } from "./SideBarItem";

export function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-center h-16 border-b border-gray-300">
        <h1 className="text-xl font-bold text-gray-800">BhanuBrain</h1>
      </div>

      {/* Items */}
      <div className="pt-4">
        <SideBarItem text="Twitter" icon={<TwitterIcon />} />
        <SideBarItem text="Youtube" icon={<YoutubeIcon />} />
        <SideBarItem text="Document" icon={<DocumentIcon />} />
        <SideBarItem text="Link" icon={<LinkIcon />} />
        <SideBarItem text="Tags" icon={<TagsIcon />} />
      </div>
    </div>
  );
}

