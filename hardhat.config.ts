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

function configFile() {
    return require("./.config.json");
}

task("deploy").setAction(async () => {

    const contractAddress: string = await deploy("CantinaRoyaleSpecies", [],
        10_000_000, 0, true, 6);

    console.log("Finished!");
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
            url: "https://eth-rinkeby.alchemyapi.io/v2/" + configFile().alchemyKey,
        },
        bsc: {
            chainId: networks.bsc.id,
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
