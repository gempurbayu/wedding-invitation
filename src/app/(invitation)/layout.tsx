import BottomNav from "@/components/BottomNav";
import MobileContainer from "@/components/MobileContainer";

export default function InvitationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileContainer>
      {children}
      <BottomNav />
    </MobileContainer>
  );
}
