import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Trash } from "lucide-react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { useStore } from "../store/zustandStore";
import { useShallow } from "zustand/react/shallow";
import { useRouter } from "next-nprogress-bar";

export function DeleteAddress({ addressName, id }) {
  const { toast } = useToast();
  const email = useStore(useShallow((state) => state.user.email));
  const updateField = useStore(useShallow((state) => state.updateField));

  const router = useRouter();
  async function onSubmit(data) {
    toast({
      title: (
        <div className="flex items-center gap-3 text-black text-md">
          <Loader2 className="animate-spin" />
          <p>Loading..</p>
        </div>
      ),
      duration: 10000, // Adjust the duration as needed
      className: "bg-white",
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/account/deleteAddress`,
      {
        method: "DELETE",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ email, addressId: id }),
      }
    );
    if (response.ok) {
      let address = await response.json();
      updateField({ billingAddress: address.billingAddress });
      toast({
        title: (
          <div className="flex items-center gap-2">
            <FaCircleCheck size={15} color="#2eb82e" /> Address Deleted
          </div>
        ),
        duration: "3000",
        className: "bg-white",
        variant: "success",
      });
      router.refresh();
    } else {
      toast({
        title: (
          <div className="flex items-center gap-2">
            <IoMdCloseCircle size={15} color="#ff1a1a" /> Error Occurred Try
            Again
          </div>
        ),
        duration: "3000",
        className: "bg-white",
      });
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash
          size={20}
          className="cursor-pointer hover:text-[#808080] transition-all"
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white max-w-[90%] rounded-lg sm:max-w-[450px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete <span className="font-bold">{addressName}</span>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            address and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className=" hover:opacity-70 transition-all">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-[#cc0000] text-white hover:opacity-70 transition-all"
            onClick={onSubmit}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
