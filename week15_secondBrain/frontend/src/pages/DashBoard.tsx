import { useState } from "react";
import { Button } from "../components/ui/Button";
// import { Card } from "../components/ui/Card";
import { CreateContentModel } from "../components/ui/CreateContentModel";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/ui/Sidebar";
import { DisplayCard } from "../components/ui/DisplayCard";

export function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 min-h-screen w-full border-2 border-gray-400 bg-gray-300">
        <div className="flex justify-end gap-4">
          <Button
            variant="primary"
            size="md"
            text="Add Content"
            startIcon={<PlusIcon size="lg" />}
            onClick={() => setOpen(true)}
          />
          <Button
            variant="secondary"
            size="md"
            text="Share Brqin"
            startIcon={<ShareIcon size="lg" />}
            onClick={() => console.log("Clicked")}
          />
        </div>

        <div className="ml-64 p-6">
          <DisplayCard />
        </div>

        <CreateContentModel isOpen={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
}
