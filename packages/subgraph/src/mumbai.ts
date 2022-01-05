import { RegExp } from "assemblyscript-regex";

import { ChirpCityMessage } from "../generated/ChirpCity/ChirpCity";
import { Message } from "../generated/schema";

// I couldn't figure out if there was a way to get this programmatically
// so I'm hardcoding this here for now. We'll need to change this with
// each chain indexer.
const chainId = 80001;

export function handleChirpCityMessage(event: ChirpCityMessage): void {
  const id = `chirp:${chainId}:${event.block.number}:${event.logIndex}`;

  // Messages are currently immutable so we shouldn't need to load an
  // existing message by the same ID before setting/saving.
  const message = new Message(id);

  message.timestamp = event.block.timestamp.toU32();
  message.from = event.params.from.toHexString();
  message.message = event.params.message;

  const parents: string[] = [];
  // assemblyscript-regex doesn't properly handle multiline matches with ^$
  // so we have to split the string by line and match each line individually.
  const lines = event.params.message.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const re = new RegExp("^\\s*>\\s*(chirp:\\d+:\\d+:\\d+)\\s*$");
    const match = re.exec(lines[i]);
    if (match) {
      parents.push(match.matches[1]);
    }
  }
  message.parents = parents;

  message.save();
}
