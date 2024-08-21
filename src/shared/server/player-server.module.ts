/* 
Methods related to player in the server
*/

import { PLAYER_CHARACTER_TAG, PLAYER_UPPER_TORSO_TAG } from "shared/constants.module";
import { setTagToChildNamed } from "shared/utils/tags.module";

const Players = game.GetService("Players");

function onCharacterAdded(character: Model) {
	//const player = Players.GetPlayerFromCharacter(character);
	character.AddTag(PLAYER_CHARACTER_TAG);
	setTagToChildNamed(character, PLAYER_UPPER_TORSO_TAG, "UpperTorso");
}

export function onPlayerAdded(player: Player) {
	print("player added ", player.Name);
	player.CharacterAdded.Connect(onCharacterAdded);
}
