import { ROOM_GAME_TAG } from "shared/constants.module";
import { onPlayerAdded } from "shared/server/player-server.module";

import { RoomGame } from "shared/server/room-game/room-game.module";

print("-Server-");

const collectionService = <CollectionService>game.GetService("CollectionService");

const roomGameModelCollection = collectionService.GetTagged(ROOM_GAME_TAG) as Model[];
const roomGames = roomGameModelCollection.map((roomGameModel) => {
	return new RoomGame(roomGameModel);
});

roomGames.forEach((roomGame) => {
	roomGame.activate();
});

const Players = game.GetService("Players");
Players.PlayerAdded.Connect(onPlayerAdded);
