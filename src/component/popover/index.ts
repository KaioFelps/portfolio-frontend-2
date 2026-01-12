import { Popover } from "@base-ui/react/popover";
import { DroppableComponentArrow } from "../droppable-component-arrow";
import { PopoverContent } from "./content";
import { PopoverTrigger } from "./trigger";

export default {
  Root: Popover.Root,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Title: Popover.Title,
  Description: Popover.Description,
  Arrow: DroppableComponentArrow,
};
