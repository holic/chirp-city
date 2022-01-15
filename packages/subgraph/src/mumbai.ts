import { Bytes } from "@graphprotocol/graph-ts";
import { Match, RegExp } from "assemblyscript-regex";

import { PublicMessage } from "../generated/ChirpCity/ChirpCity";
import { Message } from "../generated/schema";

// I couldn't figure out if there was a way to get this programmatically
// so I'm hardcoding this here for now. We'll need to change this with
// each chain indexer.
//
// Maybe a mapping from dataSource.network()?
const chainId = 80001;

export function handlePublicMessage(event: PublicMessage): void {
  const id = `chirp:${chainId}:${event.block.number}:${event.logIndex}`;

  const parents: string[] = [];
  const mentions: Bytes[] = [];

  // assemblyscript-regex doesn't properly handle multiline matches with ^$
  // so we have to split the string by line and match each line individually.
  const lines = event.params.message.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const parentRE = new RegExp("^\\s*>\\s*(chirp:\\d+:\\d+:\\d+)\\s*$");
    const match = parentRE.exec(lines[i]);
    if (!match) continue;

    // This may not work well in a decentralized environment, depending on
    // whether indexers process blocks serially. If these are processed
    // out of order, we could still pull out parent IDs without loading
    // them, but we wouldn't get reply-mentions.
    const parent = Message.load(match.matches[1]);
    if (parent) {
      parents.push(parent.id);
      mentions.push(parent.from);
    }
  }

  const mentionRE = new RegExp("(^|\\W)@(0x[0-9a-f]{40})(\\W|$)", "gmi");
  let match: Match | null = null;
  while ((match = mentionRE.exec(event.params.message))) {
    // Let graph-ts validate + normalize the address for us
    const address = Bytes.fromByteArray(Bytes.fromHexString(match.matches[2]));
    mentions.push(address);
  }

  // Messages are currently immutable so we shouldn't need to load an
  // existing message by the same ID before setting/saving.
  const message = new Message(id);

  message.timestamp = event.block.timestamp.toU32();
  message.from = event.params.from;
  message.message = event.params.message;
  message.parents = parents;
  message.mentions = mentions;

  message.save();
}
