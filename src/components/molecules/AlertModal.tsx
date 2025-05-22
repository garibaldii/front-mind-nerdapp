import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props = {
  onClose: () => void;
  title: string;
  description: any;
  open: boolean;
};

export function AlertModal({ onClose, title, description, open }: Props) {
  return (
    <AlertDialog open={open} >
      <AlertDialogContent className="flex flex-col items-center ">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-8 text-center">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-lg">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full flex justify-center ">
          <AlertDialogCancel onClick={onClose}>Ok</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
