import React, { useState, PropsWithChildren } from "react";
import { UnBlockButton } from "./UnBlockButton";
import { BlockButton } from "./BlockButton";

interface IUser {
  user: string;
  relation?: string;
}

export const BlockUnBlock: React.FC<PropsWithChildren<IUser>> = ({
  user,
  relation,
  children,
}) => {
  // swich case
  const buttonType = (relation: string | undefined) => {
    {
      switch (relation) {
        case "blocked":
          return <UnBlockButton user={user} />;
        case "twoWayBlocked":
          return <UnBlockButton user={user} />;
        default:
          return <BlockButton user={user} />;
      }
    }
  };

  return (
    <>
      <section>{buttonType(relation)}</section>
    </>
  );
};
