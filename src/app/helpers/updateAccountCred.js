import { useStore } from "../store/zustandStore";
export async function updateAccountCred(
  emailandusername,
  password,
  values,
  token
) {
  console.log(values);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/account?emailOrUsername=${emailandusername}&password=${password}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(values),
    }
  );
  if (!res.ok) {
    // throw new Error("Failed to Update Account");
  }
  let data = await res.json();
  console.log(data);
  return data;
}
