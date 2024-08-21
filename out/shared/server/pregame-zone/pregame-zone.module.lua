-- Compiled with roblox-ts v2.3.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local isPlayerUpperTorso = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "utils", "player-utils.module").isPlayerUpperTorso
local PregameZone
do
	PregameZone = setmetatable({}, {
		__tostring = function()
			return "PregameZone"
		end,
	})
	PregameZone.__index = PregameZone
	function PregameZone.new(...)
		local self = setmetatable({}, PregameZone)
		return self:constructor(...) or self
	end
	function PregameZone:constructor(part)
		self.part = part
		self:activate()
	end
	function PregameZone:activate()
		self.touchedConnection = self.part.Touched:Connect(function(touchedPart)
			if isPlayerUpperTorso(touchedPart) then
				local _result = touchedPart.Parent
				if _result ~= nil then
					_result = _result.Name
				end
				print("base part touched ", _result, touchedPart)
			end
		end)
		self.touchedEndedConnection = self.part.TouchEnded:Connect(function(touchedPart)
			if isPlayerUpperTorso(touchedPart) then
				local _result = touchedPart.Parent
				if _result ~= nil then
					_result = _result.Name
				end
				print("base part touchedended ", _result, touchedPart)
			end
		end)
	end
	function PregameZone:dactivate()
		local _ = self.touchedConnection and self.touchedConnection:Disconnect()
		local _1 = self.touchedEndedConnection and self.touchedEndedConnection:Disconnect()
	end
end
return {
	PregameZone = PregameZone,
}
