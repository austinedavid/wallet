" use client";

export const useDownload = () => {
  // download an image
  const handleDownload = async (imageUrl: string, name: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name} Nft`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  //   access the solscan link
  const goToExplorer = (address: string) => {
    window.open(
      `https://explorer.solana.com/address/${address}?cluster=devnet`,
      "_blank"
    );
  };

  return { handleDownload, goToExplorer };
};

export const useSubstringFour = (address: string) => {
  const firstPath = address.substring(0, 4);
  const lastPart = address.substring(address.length - 4, address.length);
  const joinString = `${firstPath}...${lastPart}`;
  return { joinString };
};
