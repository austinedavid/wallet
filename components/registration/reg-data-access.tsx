import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
export const useMnemonic = () => {
  const route = useRouter();
  const Strings =
    "nothing repair tragic mantion jungle private ghost van acid access card winter";
  // lets break the strings into an arrays
  const mnemoicArray = Strings.split(" ");
  // to copy the seed phrase
  const handleCopy = () => {
    navigator.clipboard.writeText(Strings);
    toast.success("Phrase copied successfully!!");
  };
  // to set item to the local storage
  const setLocalStorage = () => {
    localStorage.setItem("seed-phrase", Strings);
  };
  const savePassword = (item: string) => {
    localStorage.setItem("wallet-password", item);
    route.push("/wallet/portfilo");
  };
  // this function downloads the seed phrase when clicked with the name
  // seed-phrase.txt
  const handleDownload = () => {
    const blob = new Blob([Strings], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "seed-phrase.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("seed phrase downloaded");
  };
  return {
    mnemoicArray,
    handleCopy,
    setLocalStorage,
    savePassword,
    handleDownload,
  };
};
