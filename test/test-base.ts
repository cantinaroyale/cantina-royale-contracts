import {CantinaRoyaleSpecies} from "../typechain-hardhat/CantinaRoyaleSpecies";
import {account, contract, useChaiBN} from "@defi.org/web3-candies";
import {resetNetworkFork, tag} from "@defi.org/web3-candies/dist/hardhat";
import '@nomiclabs/hardhat-ethers';
import '@openzeppelin/hardhat-upgrades';

import { ethers, upgrades } from 'hardhat';

export let deployer: string;
export let address1: string;
export let address2: string;
export let devWallet: string;
export let cantinaRoyaleSpecies: CantinaRoyaleSpecies;

useChaiBN();

export async function prepareForTests() {
  while (true) {
    try {
      return await doInitState();
    } catch (e) {
      console.error(e, "\ntrying again...");
    }
  }
}

async function doInitState() {
  await resetNetworkFork();

  deployer = await account(0);
  tag(deployer, "deployer");

  address1 = await account(1);
  address2 = await account(3);
  devWallet = await account(2);

  const CantinaRoyaleSpecies = await ethers.getContractFactory('CantinaRoyaleSpecies');
  const _cantinaRoyaleSpecies = await upgrades.deployProxy(CantinaRoyaleSpecies, ['https://cantinaroyale.io/nft/species/jsons/'], { initializer: 'initialize(string)' });
  await _cantinaRoyaleSpecies.deployed();
  cantinaRoyaleSpecies = contract<CantinaRoyaleSpecies>(require('../artifacts/contracts/CantinaRoyaleSpecies.sol/CantinaRoyaleSpecies.json').abi, _cantinaRoyaleSpecies.address);

}
