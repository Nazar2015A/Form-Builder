import { FC } from "react";
import { Button } from "./ui/button";

interface Props {
  shareUrl: string;
}

const VisitBtn: FC<Props> = ({ shareUrl }) => {
  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  const handleOpenLink = () => {
    window.open(shareLink, "_blank");
  };
  return <Button className="w-[250px] max-w-[250px]" onClick={handleOpenLink}>Visit</Button>;
};

export default VisitBtn;
