// SPDX-License-Identifier: CC0-1.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Tweeter {
    using Counters for Counters.Counter;

    Counters.Counter private id;
    mapping(uint256 => string) public tweets;

    event Tweet(address indexed from, uint256 id, uint256 timestamp, string message);

    function tweet(string calldata message) external {
        id.increment();
        tweets[id.current()] = message;
        emit Tweet(msg.sender, id.current(), block.timestamp, message);
    }
}
