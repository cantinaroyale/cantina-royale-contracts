// the breeding is not active on launch
// the purpose of this file is to demonstrate in tests how it will be added later

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol";

contract CantinaRoyaleSpeciesBreeding is ERC721PresetMinterPauserAutoIdUpgradeable {

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        string memory path = super.tokenURI(tokenId);
        return string(abi.encodePacked(path, ".json"));
    }

    function breed() external {
        // Doing nothing right now
    }
}
