import {CantinaRoyaleApes} from "../typechain-hardhat/CantinaRoyaleApes";
import {account, contract, useChaiBN} from "@defi.org/web3-candies";
import {deployArtifact, resetNetworkFork, tag} from "@defi.org/web3-candies/dist/hardhat";
import '@nomiclabs/hardhat-ethers';
import '@openzeppelin/hardhat-upgrades';

import { ethers, upgrades } from 'hardhat';
import {CantinaRoyaleApesBreeding} from "../typechain-hardhat/CantinaRoyaleApesBreeding";

export let deployer: string;
export let address1: string;
export let address2: string;
export let devWallet: string;
export let cantinaRoyaleApes: CantinaRoyaleApes;
export let cantinaRoyaleApesBreeding: CantinaRoyaleApesBreeding;

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

  const CantinaRoyaleApes = await ethers.getContractFactory('CantinaRoyaleApes');
  const _cantinaRoyaleApes = await upgrades.deployProxy(CantinaRoyaleApes, ['https://catalinaroyale.io/assets/nft/jsons/'], { initializer: 'initialize(string)' });
  await _cantinaRoyaleApes.deployed();
  cantinaRoyaleApes = contract<CantinaRoyaleApes>(require('../artifacts/contracts/CantinaRoyaleApes.sol/CantinaRoyaleApes.json').abi, _cantinaRoyaleApes.address);

  const CantinaRoyaleApesBreeding = await ethers.getContractFactory('CantinaRoyaleApesBreeding');
  const _cantinaRoyaleApesBreeding = await upgrades.upgradeProxy(cantinaRoyaleApes.options.address, CantinaRoyaleApesBreeding);
  cantinaRoyaleApesBreeding = contract<CantinaRoyaleApesBreeding>(require('../artifacts/contracts/CantinaRoyaleApesBreeding.sol/CantinaRoyaleApesBreeding.json').abi, _cantinaRoyaleApesBreeding.address);

}
