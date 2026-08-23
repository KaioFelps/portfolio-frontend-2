import { Collapsible } from "@base-ui/react";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export function CollapsibleContent({ children }: Props) {
  return (
    <Collapsible.Panel className="grid transition-[grid-template-rows] duration-200 ease-in-out grid-rows-[1fr] data-[starting-style]:grid-rows-[0fr] data-[ending-style]:grid-rows-[0fr] data-[closed]:grid-rows-[0fr]">
      <div className="overflow-hidden min-h-0">
        <div className="flex flex-col items-stretch">{children}</div>
      </div>
    </Collapsible.Panel>
  );
}
