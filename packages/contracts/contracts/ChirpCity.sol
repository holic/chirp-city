/*

      a lil birb told me

  _ |_  o ._ ._     _ o _|_    
 (_ | | | |  |_) o (_ |  |_ \/ 
             |              /  

*/

// SPDX-License-Identifier: CC0-1.0

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@opengsn/contracts/src/BaseRelayRecipient.sol";
import "./PublicChannel.sol";

contract ChirpCity is Ownable, BaseRelayRecipient, PublicChannel {
    function chirp(string calldata message) external {
        emit PublicMessage(_msgSender(), message);
    }


    function versionRecipient() public override pure returns (string memory) {
        return "1.0.0";
    }

    function setTrustedForwarder(address forwarder) external onlyOwner {
        BaseRelayRecipient._setTrustedForwarder(forwarder);
    }

    function _msgData() internal view override(Context, BaseRelayRecipient) returns (bytes calldata) {
        return BaseRelayRecipient._msgData();
    }

    function _msgSender() internal view override(Context, BaseRelayRecipient) returns (address sender) {
        return BaseRelayRecipient._msgSender();
    }
}
