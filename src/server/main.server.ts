import { PREGAME_ZONE_TAG } from "shared/constants.module";
import { onPlayerAdded } from "shared/server/player-server.module";
import { PregameZone } from "shared/server/pregame-zone/pregame-zone.module";

const collectionService = <CollectionService>game.GetService("CollectionService");
const pregameZonePartCollection = collectionService.GetTagged(PREGAME_ZONE_TAG) as BasePart[];
pregameZonePartCollection.forEach((pregameZonePart) => {
	const pregameZone = new PregameZone(pregameZonePart);
});

const Players = game.GetService("Players");
Players.PlayerAdded.Connect(onPlayerAdded);
