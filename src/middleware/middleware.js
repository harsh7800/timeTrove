import { useStore } from "@/app/store/zustandStore";
import { useRouter } from "next-nprogress-bar";
import { useShallow } from "zustand/react/shallow";

export default async function CheckAuth() {
  const router = useRouter;
  let user = useStore(useShallow((state) => state.user));
  let token = user.token;
  console.log(token);

  if (token) {
    router.push("/shop");
  } else {
    router.push("/authentication");
  }
}
