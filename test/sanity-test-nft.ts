import {address1, cantinaRoyaleApes, deployer, devWallet, prepareForTests} from "./test-base";
import {bn, expectRevert, zero} from "@defi.org/web3-candies";
import {expect} from "chai";

describe("---------- Cantina Royale NFT Tests ---------- ", () => {
    beforeEach(async () => {
        await prepareForTests();
    });

    it("Testing E2E", async () => {
        await expectRevert(async () => await cantinaRoyaleApes.methods.mint(address1).send({ from: address1}), 'ERC721PresetMinterPauserAutoId: must have minter role to mint');
        await cantinaRoyaleApes.methods.mint(address1).send({from: deployer});
        await expect(await cantinaRoyaleApes.methods.balanceOf(address1).call()).bignumber.eq(bn(1));
        await expect(await cantinaRoyaleApes.methods.tokenURI(0).call()).eq('https://catalinaroyale.io/assets/nft/jsons/0.json');
    });
});
