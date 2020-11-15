import { createContext, Dispatch, SetStateAction } from "react";

const UsernameContext = createContext<
  [string | null, Dispatch<SetStateAction<string | null>>]
>([null, () => null]);

export default UsernameContext;
