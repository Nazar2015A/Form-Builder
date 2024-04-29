import { FC } from "react";
import { format } from "date-fns";
import { ElementsType } from "../FormElements/FormElements";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { TableCell } from "../ui/table";
interface Props {
  value: string;
  type: ElementsType;
}

const RowCell: FC<Props> = ({ value, type }) => {
  if (type === "DateField") {
    if (!value)
      return (
        <TableCell>
          <Badge variant={"outline"}>No time</Badge>
        </TableCell>
      );
    const date = new Date(value);
    return (
      <TableCell>
        <Badge variant={"outline"}>{format(date, "dd/MM/yyyy")}</Badge>
      </TableCell>
    );
  }
  if (type === "CheckBoxField") {
    const checked = value === "true";
    return (
      <TableCell>
        <Checkbox checked={checked} disabled />
      </TableCell>
    );
  }
  return <TableCell>{value}</TableCell>;
};

export default RowCell;
