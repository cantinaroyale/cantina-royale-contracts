import {
    address1,
    cantinaRoyaleSpecies,
    deployer,
    prepareForTests
} from "./test-base";
import {bn, contract, expectRevert, zero} from "@defi.org/web3-candies";
import {expect} from "chai";
import {ethers, upgrades} from "hardhat";
import {CantinaRoyaleSpeciesBreeding} from "../typechain-hardhat/CantinaRoyaleSpeciesBreeding";

describe("---------- Cantina Royale NFT Tests ---------- ", () => {
    beforeEach(async () => {
        await prepareForTests();
    });

    it("Testing E2E", async () => {
        await expectRevert(async () => await cantinaRoyaleSpecies.methods.mint(address1).send({ from: address1}), 'ERC721PresetMinterPauserAutoId: must have minter role to mint');
        await cantinaRoyaleSpecies.methods.mint(address1).send({from: deployer});
        await expect(await cantinaRoyaleSpecies.methods.balanceOf(address1).call()).bignumber.eq(bn(1));
        await expect(await cantinaRoyaleSpecies.methods.tokenURI(0).call()).eq('https://cantinaroyale.io/nft/species/jsons/0.json');
        // @ts-ignore
        await expectRevert(async () => await cantinaRoyaleSpecies.methods.breed().send({ from: address1}),'breed is not a function');
        const CantinaRoyaleSpeciesBreeding = await ethers.getContractFactory('CantinaRoyaleSpeciesBreeding');
        const _cantinaRoyaleSpeciesBreeding = await upgrades.upgradeProxy(cantinaRoyaleSpecies.options.address, CantinaRoyaleSpeciesBreeding);
        const cantinaRoyaleSpeciesBreeding: CantinaRoyaleSpeciesBreeding = contract<CantinaRoyaleSpeciesBreeding>(require('../artifacts/contracts/CantinaRoyaleSpeciesBreeding.sol/CantinaRoyaleSpeciesBreeding.json').abi, _cantinaRoyaleSpeciesBreeding.address);

        await expect(await cantinaRoyaleSpeciesBreeding.methods.balanceOf(address1).call()).bignumber.eq(bn(1));
        await cantinaRoyaleSpeciesBreeding.methods.breed().call();
    });
});
