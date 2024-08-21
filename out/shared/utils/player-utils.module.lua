-- Compiled with roblox-ts v2.3.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local PLAYER_CHARACTER_TAG = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "constants.module").PLAYER_CHARACTER_TAG
local isPlayer = function(candidate)
	local tags = candidate:GetTags()
	-- ▼ ReadonlyArray.some ▼
	local _result = false
	local _callback = function(tag)
		return tag == PLAYER_CHARACTER_TAG
	end
	for _k, _v in tags do
		if _callback(_v, _k - 1, tags) then
			_result = true
			break
		end
	end
	-- ▲ ReadonlyArray.some ▲
	return _result
end
local isPlayerUpperTorso = function(possibleTorso)
	local possiblePlayer = possibleTorso.Parent
	local tags = possiblePlayer:GetTags()
	-- ▼ ReadonlyArray.some ▼
	local _result = false
	local _callback = function(tag)
		return tag == PLAYER_CHARACTER_TAG
	end
	for _k, _v in tags do
		if _callback(_v, _k - 1, tags) then
			_result = true
			break
		end
	end
	-- ▲ ReadonlyArray.some ▲
	local isPlayer = _result
	if isPlayer then
		return possibleTorso.Name == "UpperTorso"
	end
	return false
end
return {
	isPlayer = isPlayer,
	isPlayerUpperTorso = isPlayerUpperTorso,
}
