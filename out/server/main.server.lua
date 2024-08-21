-- Compiled with roblox-ts v2.3.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local PREGAME_ZONE_TAG = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "constants.module").PREGAME_ZONE_TAG
local onPlayerAdded = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "server", "player-server.module").onPlayerAdded
local PregameZone = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "server", "pregame-zone", "pregame-zone.module").PregameZone
local collectionService = game:GetService("CollectionService")
local pregameZonePartCollection = collectionService:GetTagged(PREGAME_ZONE_TAG)
-- ▼ ReadonlyArray.forEach ▼
local _callback = function(pregameZonePart)
	local pregameZone
	pregameZone = PregameZone.new(pregameZonePart, function(players)
		pregameZone:dactivate()
		print("players that will start the game ", players)
	end)
end
for _k, _v in pregameZonePartCollection do
	_callback(_v, _k - 1, pregameZonePartCollection)
end
-- ▲ ReadonlyArray.forEach ▲
local Players = game:GetService("Players")
Players.PlayerAdded:Connect(onPlayerAdded)
