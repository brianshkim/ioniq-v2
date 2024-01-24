import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/app/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw, ShieldCheck } from "lucide-react";
import { useOrigin } from "@/app/hooks/use-origin";
import { useState } from "react";
import axios from "axios";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import { UserAvatar } from "../user-avatar";

const roleIconMap = {
  "GUEST":null,
  "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  "ADMIN": <ShieldCheck className="h-4 w-4 text-rose-500" />
}

export const MembersModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "members";
  const { server } = data as { server: ServerWithMembersWithProfiles };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>

       <ScrollArea className="mt-8 max-h-[420px] pr-6">
        {server?.members?.map((member)=>(
          <div key={member.id} className="flex items-center gap-x-2 mb-6">
            <UserAvatar src={member.profile.imageUrl}/>
            <div className="flex flex-col gap-y-1">
              <div className="text-xs font-semibold flex items-center">
                {member.profile.name}
                {roleIconMap[member.role]}
              </div>
            </div>
          </div>
        )
        )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
