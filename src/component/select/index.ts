import { Select } from "@base-ui/react/select";
import { DroppableComponentArrow } from "../droppable-component-arrow";
import { SelectContent } from "./content";
import { SelectItem } from "./item";
import { SelectRawTrigger } from "./raw-trigger";
import { SelectTrigger } from "./trigger";

export default {
  Root: Select.Root,
  Trigger: SelectTrigger,
  RawTrigger: SelectRawTrigger,
  Content: SelectContent,
  Item: SelectItem,
  Arrow: DroppableComponentArrow,
};
