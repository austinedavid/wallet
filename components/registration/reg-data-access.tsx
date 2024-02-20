import { useRouter } from "next/navigation";
export const useMnemonic = () => {
  const route = useRouter();
  const Strings =
    "nothing repair tragic mantion jungle private ghost van acid access card winter";
  // lets break the strings into an arrays
  const mnemoicArray = Strings.split(" ");
  // to copy the seed phrase
  const handleCopy = () => {
    navigator.clipboard.writeText(Strings);
  };
  // to set item to the local storage
  const setLocalStorage = () => {
    localStorage.setItem("seed-phrase", Strings);
  };
  const savePassword = (item: string) => {
    localStorage.setItem("wallet-password", item);
    route.push("/wallet/portfilo");
  };
  return { mnemoicArray, handleCopy, setLocalStorage, savePassword };
};
