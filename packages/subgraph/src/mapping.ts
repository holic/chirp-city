import { ChirpCityMessage } from "../generated/ChirpCity/ChirpCity";
import { Message } from "../generated/schema";

export function handleChirpCityMessage(event: ChirpCityMessage): void {
  const id = `chirp:${event.block.number}:${event.logIndex}`;

  // Messages are currently immutable so we shouldn't need to load an
  // existing message by the same ID before setting/saving.
  const message = new Message(id);

  message.timestamp = event.block.timestamp.toU32();
  message.from = event.params.from.toHexString();
  message.message = event.params.message;

  message.save();
}
