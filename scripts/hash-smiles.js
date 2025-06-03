// hash-smiles.js
const { buildMimc7 } = require('circomlibjs');

function stringToBigInt(input) {
  return BigInt('0x' + Buffer.from(input, 'utf8').toString('hex'));
}

(async () => {
  const input = process.argv[2];
  if (!input) {
    console.error("Usage: node hash-smiles.js <SMILES>");
    process.exit(1);
  }

  const preimage = stringToBigInt(input);
  const mimc = await buildMimc7();
  const hash = mimc.hash(preimage, BigInt(0));
  const hashField = mimc.F.toObject(hash);

  console.log(`✅ SMILES: ${input}`);
  console.log(`📦 Preimage bigint: ${preimage}`);
  console.log(`🔐 MiMC Hash: ${hashField}`);
})();