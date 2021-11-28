// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol";

contract CantinaRoyaleSpecies is ERC721PresetMinterPauserAutoIdUpgradeable {

    function initialize(string memory baseTokenURI) initializer public {
        initialize("Cantina Royale Species", "CRSPECIES", baseTokenURI);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        string memory path = super.tokenURI(tokenId);
        return string(abi.encodePacked(path, ".json"));
    }
}
