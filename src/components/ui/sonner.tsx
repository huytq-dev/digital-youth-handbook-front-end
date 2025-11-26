import type { ComponentProps } from "react";

// Minimal stub Toaster component; replace with real implementation if you add sonner/shadcn
export type ToasterProps = ComponentProps<"div">;

export const Toaster = (props: ToasterProps) => {
  return <div {...props} />;
};


