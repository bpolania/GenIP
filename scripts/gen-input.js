const fs = require("fs");
const { buildMimc7 } = require("circomlibjs");

function stringToBigInt(input) {
  return BigInt("0x" + Buffer.from(input, "utf8").toString("hex"));
}

(async () => {
  const smiles = process.argv[2];
  if (!smiles) {
    console.error("Usage: node scripts/gen-input.js <SMILES>");
    process.exit(1);
  }

  const preimage = stringToBigInt(smiles);
  const mimc = await buildMimc7();
  const hash = mimc.hash(preimage, BigInt(0));
  const hashField = mimc.F.toObject(hash);

  const inputJson = {
    preimage: preimage.toString(),
    hash: hashField.toString()
  };

  fs.writeFileSync("input.json", JSON.stringify(inputJson, null, 2));
  console.log("✅ input.json generated");
})();