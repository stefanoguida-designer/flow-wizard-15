import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      {...props}
      theme="light"
      richColors
      position="bottom-center"
      offset={{ bottom: "1rem" }}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast w-full text-sm leading-normal shadow-[0_8px_28px_-6px_rgba(15,23,42,0.22)]",
          title: "text-sm font-semibold",
          description: "text-sm leading-snug opacity-90",
          actionButton: "bg-primary text-primary-foreground text-sm",
          cancelButton: "bg-muted text-muted-foreground text-sm",
        },
      }}
    />
  );
};

export { Toaster, toast };
