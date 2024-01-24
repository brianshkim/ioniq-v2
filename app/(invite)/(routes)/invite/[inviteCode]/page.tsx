import { db } from "@/lib/db";
import { OrganizationMembershipPublicUserData } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface InvitecodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage = async ({ params }: InvitecodePageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  const existingServer = await db.server.findfirst({
    where: {
      inviteCode: params.inviteCode,
      OrganizationMembershipPublicUserData: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if(server){
    return redirect(`/servers/${server.id}`)
  }

  return <div></div>;
};

export default InviteCodePage;
