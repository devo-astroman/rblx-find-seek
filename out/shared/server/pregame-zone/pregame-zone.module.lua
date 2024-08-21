-- Compiled with roblox-ts v2.3.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local isPlayerUpperTorso = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "utils", "player-utils.module").isPlayerUpperTorso
local TimerClock = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "utils", "timer.module").TimerClock
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
	function PregameZone:constructor(part, cb)
		self.playersInZone = {}
		self.part = part
		self:activate()
		self.timerClock = TimerClock.new()
		self.timerClock:onOneSecDo(function(sec)
			print("SECS: ", 15 - sec)
		end)
		self.timerClock:onTimeCompleted(function()
			cb(self.playersInZone)
		end)
	end
	function PregameZone:activate()
		self.touchedConnection = self.part.Touched:Connect(function(touchedPart)
			if isPlayerUpperTorso(touchedPart) then
				local _playersInZone = self.playersInZone
				local _parent = touchedPart.Parent
				table.insert(_playersInZone, _parent)
				local _ = not self.timerClock:isTimerRunning() and self.timerClock:startTime(15)
				print("this.playersInZone: - ", self.playersInZone)
			end
		end)
		self.touchedEndedConnection = self.part.TouchEnded:Connect(function(touchedPart)
			if isPlayerUpperTorso(touchedPart) then
				local _exp = self.playersInZone
				-- ▼ ReadonlyArray.filter ▼
				local _newValue = {}
				local _callback = function(player)
					local _exp_1 = player.Name
					local _result = touchedPart.Parent
					if _result ~= nil then
						_result = _result.Name
					end
					return _exp_1 ~= _result
				end
				local _length = 0
				for _k, _v in _exp do
					if _callback(_v, _k - 1, _exp) == true then
						_length += 1
						_newValue[_length] = _v
					end
				end
				-- ▲ ReadonlyArray.filter ▲
				self.playersInZone = _newValue
				if #self.playersInZone == 0 then
					self.timerClock:stop()
				end
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
