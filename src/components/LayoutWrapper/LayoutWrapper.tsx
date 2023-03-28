import React from "react";
import MainContent from "../../components/LayoutWrapper/MainContent/MainContent";
import UserMenu from "../../components/LayoutWrapper/UserMenu/UserMenu";

interface LayoutWrapperProps {
  userType: string;
  children: React.ReactNode;
}

export default function LayoutWrapper({ userType, children }: LayoutWrapperProps) {
  return (
    <>
      <UserMenu userType={userType} />
      <MainContent>{children}</MainContent>
    </>
  );
}
