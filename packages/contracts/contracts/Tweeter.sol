// SPDX-License-Identifier: CC0-1.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Tweeter {
    using Counters for Counters.Counter;

    struct Tweet {
        address from;
        uint256 timestamp;
        string message;
    }

    Counters.Counter private id;
    mapping(uint256 => Tweet) public tweets;

    event Tweeted(address indexed from, uint256 id, uint256 timestamp, string message);

    function tweet(string calldata message) external {
        id.increment();
        tweets[id.current()] = Tweet(msg.sender, block.timestamp, message);
        emit Tweeted(msg.sender, id.current(), block.timestamp, message);
    }
}
