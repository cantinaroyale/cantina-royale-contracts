import {HardhatUserConfig} from "hardhat/types";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "hardhat-tracer";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-etherscan";
import {networks} from "@defi.org/web3-candies";
import "hardhat-contract-sizer";
import {deploy} from "@defi.org/web3-candies/dist/hardhat/deploy";
import {task} from "hardhat/config";
import '@nomiclabs/hardhat-ethers';
import '@openzeppelin/hardhat-upgrades';
import {contract} from "@defi.org/web3-candies";
import {CantinaRoyaleSpeciesBreeding} from "./typechain-hardhat/CantinaRoyaleSpeciesBreeding";

function configFile() {
    return require("./.config.json");
}

task("deploy").setAction(async () => {

    // const contractAddress: string = await deploy("CantinaRoyaleSpecies", [],
    //     10_000_000, 0, true, 6);

    console.log('0');

    const { ethers, upgrades } = require('hardhat');

    console.log('1');
    const CantinaRoyaleSpecies = await ethers.getContractFactory('CantinaRoyaleSpecies');
    console.log('2');
    const _cantinaRoyaleSpecies = await upgrades.deployProxy(CantinaRoyaleSpecies, ['https://cantinaroyale.io/nft/species/jsons/'], { initializer: 'initialize(string)' });
    console.log('3');
    await _cantinaRoyaleSpecies.deployed();
    console.log('4');
    //cantinaRoyaleSpecies = contract<CantinaRoyaleSpecies>(require('../artifacts/contracts/CantinaRoyaleSpecies.sol/CantinaRoyaleSpecies.json').abi, _cantinaRoyaleSpecies.address);


    console.log("Finished!");
});

task("upgrade").setAction(async () => {
    //
    const { ethers, upgrades } = require('hardhat');
    //
    console.log('0');
    const CantinaRoyaleSpeciesBreeding = await ethers.getContractFactory('CantinaRoyaleSpeciesBreeding');
    console.log('1');
    const _cantinaRoyaleSpeciesBreeding = await upgrades.upgradeProxy('0x751CBB275FFe976674002ACaDDf3996A92b43898', CantinaRoyaleSpeciesBreeding);

    console.log("Finished!");

    // console.log(await upgrades.erc1967.getImplementationAddress('0xce198cdd8517b757a683f81373394c710ccd9723'));

});

task("test").setAction(async () => {

    const { ethers, upgrades } = require('hardhat');

    // console.log(await upgrades.erc1967.getImplementationAddress('0x751cbb275ffe976674002acaddf3996a92b43898'));

    console.log('0');
    // const CantinaRoyaleSpecies = require("./typechain-hardhat/CantinaRoyaleSpecies");
    // @ts-ignore
    const cantinaRoyaleSpecies = contract<CantinaRoyaleSpeciesBreeding>(require('./artifacts/contracts/CantinaRoyaleSpeciesBreeding.sol/CantinaRoyaleSpeciesBreeding.json').abi, '0x751CBB275FFe976674002ACaDDf3996A92b43898');
    console.log('1');

    try {
        console.log(await cantinaRoyaleSpecies.methods.breed().call());
    } catch (e) {
        console.log(e);
    }
});

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: "0.8.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1,
                    },
                },
            },
            {
                version: "0.8.2",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1,
                    },
                },
            }
        ],
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            forking: {
                url: "https://bsc-dataseed2.binance.org",
            },
            blockGasLimit: 30e6,
        },
        eth: {
            chainId: 1,
            url: "https://eth-mainnet.alchemyapi.io/v2/" + configFile().alchemyKey,
        },
        rinkeby: {
            chainId: 4,
            // accounts: ['PRIVATE_KEY'],
            url: "https://eth-rinkeby.alchemyapi.io/v2/" + configFile().alchemyKey,
        },
        bsc: {
            chainId: networks.bsc.id,
            // accounts: ['PRIVATE_KEY'],
            url: "https://bsc-dataseed4.binance.org",
        },
    },
    typechain: {
        outDir: "typechain-hardhat",
        target: "web3-v1",
    },
    mocha: {
        timeout: 1_000_000,
        retries: 0,
        bail: false,
    },
    gasReporter: {
        currency: "USD",
        coinmarketcap: configFile().coinmarketcapKey,
        showTimeSpent: true,
    },
    etherscan: {
        apiKey: configFile().etherscanKey,
    },
    contractSizer: {
        runOnCompile: true
    }
};
export default config;
