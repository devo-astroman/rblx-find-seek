-- Compiled with roblox-ts v2.3.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
--[[
	 
	Methods related to player in the server
	
]]
local _constants_module = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "constants.module")
local PLAYER_CHARACTER_TAG = _constants_module.PLAYER_CHARACTER_TAG
local PLAYER_UPPER_TORSO_TAG = _constants_module.PLAYER_UPPER_TORSO_TAG
local setTagToChildNamed = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "utils", "tags.module").setTagToChildNamed
local Players = game:GetService("Players")
local function onCharacterAdded(character)
	--const player = Players.GetPlayerFromCharacter(character);
	character:AddTag(PLAYER_CHARACTER_TAG)
	setTagToChildNamed(character, PLAYER_UPPER_TORSO_TAG, "UpperTorso")
end
local function onPlayerAdded(player)
	print("player added ", player.Name)
	player.CharacterAdded:Connect(onCharacterAdded)
end
return {
	onPlayerAdded = onPlayerAdded,
}
