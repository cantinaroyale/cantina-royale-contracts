// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract CantinaRoyaleApes is ERC721PresetMinterPauserAutoId {

    constructor(string memory baseTokenURI) ERC721PresetMinterPauserAutoId("Cantina Royale Apes", "CRAPE", baseTokenURI) {}

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        string memory path = super.tokenURI(tokenId);
        return string(abi.encodePacked(path, ".json"));
    }
}