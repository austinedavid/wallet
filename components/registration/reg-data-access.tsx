export const useMnemonic = () => {
  const Strings =
    "nothing repair tragic mantion jungle private ghost van acid access card winter";
  // lets break the strings into an arrays
  const mnemoicArray = Strings.split(" ");
  console.log(mnemoicArray);
  return { mnemoicArray };
};
