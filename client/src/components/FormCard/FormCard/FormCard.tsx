import { FC } from "react";
import { LuView } from "react-icons/lu";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { Form } from "../../../types/form.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

interface Props {
  form: Form;
}

const FormCard: FC<Props> = ({ form }) => {
  return (
    <Card className="flex flex-col h-[190px] max-h-[190px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
          {form.isPublished ? (
            <Badge>Published</Badge>
          ) : (
            <Badge variant="destructive">Draft</Badge>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.isPublished ? (
            <span className="flex items-center gap-2">
              <LuView></LuView>
            </span>
          ) : null}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] flex-1 truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.isPublished ? (
          <Button asChild className="w-full text-md gap-4">
            <Link to={`/forms/${form._id}`}>
              View Submissions <BiRightArrowAlt />
            </Link>
          </Button>
        ) : (
          <Button variant="secondary" asChild className="w-full text-md gap-4">
            <Link to={`/builder/${form._id}`}>
              Edit form <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FormCard;
