-- Compiled with roblox-ts v2.3.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local TimerClock
do
	TimerClock = setmetatable({}, {
		__tostring = function()
			return "TimerClock"
		end,
	})
	TimerClock.__index = TimerClock
	function TimerClock.new(...)
		local self = setmetatable({}, TimerClock)
		return self:constructor(...) or self
	end
	function TimerClock:constructor()
		self.totalSecs = 0
		self.cancelPromise = false
		self.isClockRunning = false
		self.promiseFn = function(resolve, reject)
			do
				local _i = 0
				local _shouldIncrement = false
				while true do
					local i = _i
					if _shouldIncrement then
						i += 1
					else
						_shouldIncrement = true
					end
					if not (i < self.totalSecs) then
						break
					end
					if self.cancelPromise then
						reject(i)
						i = self.totalSecs
					end
					wait(1)
					self.onOneSecDoFn(i)
					_i = i
				end
			end
			resolve("")
		end
	end
	function TimerClock:onOneSecDo(cb)
		self.onOneSecDoFn = cb
	end
	function TimerClock:onTimeCompleted(cb)
		self.onTimeCompletedFn = cb
	end
	function TimerClock:startTime(totalSecs)
		self.cancelPromise = false
		self.isClockRunning = true
		self.totalSecs = totalSecs
		self.activePromise = TS.Promise.new(self.promiseFn)
		local resolve = function()
			self.onTimeCompletedFn()
			self.isClockRunning = false
		end
		local reject = function(msg)
			print("Time cancelled at sec: ", msg)
			self.isClockRunning = false
		end
		self.activePromise:andThen(resolve, reject)
	end
	function TimerClock:stop()
		self.cancelPromise = true
	end
	function TimerClock:isTimerRunning()
		return self.isClockRunning
	end
end
return {
	TimerClock = TimerClock,
}
