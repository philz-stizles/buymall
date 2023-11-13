import { toast } from 'react-hot-toast';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// import { Badge, BadgeProps } from '@/components/ui/badge';
import { LuCopy, LuServer } from 'react-icons/lu';

type Props = {
  title: string;
  description: string;
  variant: 'public' | 'admin';
};

const textMap: Record<Props['variant'], string> = {
  public: 'Public',
  admin: 'Admin',
};

// const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
//   public: 'secondary',
//   admin: 'destructive',
// };

const ApiAlert = ({ title, description, variant = 'public' }: Props) => {
  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast.success('API Route copied to clipboard.');
  };

  return (
    <div
      role="alert"
      className="bg-white flex gap-4 items-start relative w-full rounded-lg border p-4 bg-background text-foreground"
    >
      <LuServer className="mt-0.5" />
      <div className="flex-1">
        <h5 className="mb-1 font-medium leading-none text-slate-800 tracking-tight flex items-center gap-2">
          <span>{title}</span>
          <span className="inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
            Public
          </span>
        </h5>
        <div className="text-sm [&amp;_p]:leading-relaxed mt-4 flex items-center justify-between">
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            /api/categories
          </code>
          <button
            onClick={() => onCopy(description)}
            className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
          >
            <LuCopy size={18} />
          </button>
        </div>
      </div>
    </div>
    // <Alert>
    //   <IoServer className="h-4 w-4" />
    //   <AlertTitle className="flex items-center gap-x-2">
    //     {title}
    //     <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
    //   </AlertTitle>
    //   <AlertDescription className="mt-4 flex items-center justify-between">
    //     <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
    //       {description}
    //     </code>
    //     <Button
    //       variant="outlined"
    //       size="sm"
    //       onClick={() => onCopy(description)}
    //     >
    //       <IoCopy className="h-4 w-4" />
    //     </Button>
    //   </AlertDescription>
    // </Alert>
  );
};

export default ApiAlert;
