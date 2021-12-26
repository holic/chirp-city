// SPDX-License-Identifier: CC0-1.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract ChirpCity {
    using Counters for Counters.Counter;

    struct Chirp {
        address from;
        uint256 timestamp;
        string message;
    }

    Counters.Counter private id;
    mapping(uint256 => Chirp) public chirps;

    event Chirped(address indexed from, uint256 id, uint256 timestamp, string message);

    function chirp(string calldata message) external {
        id.increment();
        chirps[id.current()] = Chirp(msg.sender, block.timestamp, message);
        emit Chirped(msg.sender, id.current(), block.timestamp, message);
    }
}
