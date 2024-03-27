import { useStore } from "../store/zustandStore";
export async function updateAccountCred(
  emailandusername,
  password,
  newData,
  states
) {
  // states.newEmail = newEmail;
  let values = {
    email: states.email?.toString(),
    updatedEmail: newData.email,
    updatedUsername: newData.username,
    password: newData.password,
    newPassword: newData.newPassword,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/account?emailOrUsername=${emailandusername}&password=${password}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: states.token,
      },
      body: JSON.stringify(values),
    }
  );
  if (!res.ok) {
    // throw new Error("Failed to Update Account");
  }
  let data = await res.json();
  return data;
}
