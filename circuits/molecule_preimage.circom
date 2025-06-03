pragma circom 2.0.0;
include "../lib/circomlib/circuits/mimc.circom";

template MoleculePreimage() {
    signal input preimage;
    signal input hash;

    component mimc = MiMC7(91);  // 91 is the standard number of rounds
    mimc.x_in <== preimage;
    mimc.k <== 0;

    hash === mimc.out;
}

component main = MoleculePreimage();