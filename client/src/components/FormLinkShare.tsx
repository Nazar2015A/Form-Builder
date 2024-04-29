import { FC } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImShare } from "react-icons/im";
import { toast } from "./ui/use-toast";

interface Props {
  shareUrl: string;
}

const FormLinkShare: FC<Props> = ({ shareUrl }) => {
  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  const handleClipboardWrite = () => {
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Copied",
      description: "Link copied to clipboard",
    });
  };
  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input readOnly value={shareLink} />
      <Button onClick={handleClipboardWrite} className="w-[250px] max-w-[250px]">
        <ImShare className="mr-2 h-4 w-4" />
        Copy Link
      </Button>
    </div>
  );
};

export default FormLinkShare;
