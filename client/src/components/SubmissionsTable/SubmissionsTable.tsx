import { FC } from "react";
import { ElementsType } from "../FormElements/FormElements";
import { Form } from "../../types/form.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatDistance } from "date-fns";
import RowCell from "./RowCell";

interface Props {
  form: Form;
}

type Row = any;

const SubmissionsTable: FC<Props> = ({ form }) => {
  const columns: (
    | {
        id: string;
        label: string;
        required: boolean;
        type: ElementsType;
        options?: string[];
      }
    | { id: string; title: string; type: ElementsType }
  )[] = [];

  form.content.forEach((element) => {
    switch (element.type) {
      case "TextField":
      case "CheckBoxField":
      case "DateField":
      case "NumberField":
      case "TextAreaField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;
      case "ParagraphField":
      case "TitleField":
        columns.push({
          id: element.id,
          title: element.extraAttributes?.title,
          type: element.type,
        });
        break;
      case "SelectField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
          options: element.extraAttributes?.options,
        });
        break;
      default:
        break;
    }
  });
  const rows: Row[] = [];
  form.submissions.forEach((item) => {
    rows.push({
      ...item.content,
      submittedAt: item.createdAt,
    });
  });
  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className="capitalize">
                  {column.type}
                </TableHead>
              ))}
              <TableHead className="text-muted-foreground text-right capitalize">
                Submitted at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column, columnIndex) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[columnIndex].title}
                  />
                ))}
                <TableCell className="text-muted-foreground text-right">
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default SubmissionsTable;
