import * as mnemonic from "bip39";
export async function GET() {
  try {
    const first = mnemonic.generateMnemonic();
    return new Response(JSON.stringify({ message: first }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error generating phrase" }),
      { status: 500 }
    );
  }
}
