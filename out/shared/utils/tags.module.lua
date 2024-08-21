-- Compiled with roblox-ts v2.3.0
local setTagToChildren
setTagToChildren = function(inst, tag, exceptPartNames)
	if exceptPartNames == nil then
		exceptPartNames = {}
	end
	local _exp = inst:GetDescendants()
	-- ▼ ReadonlyArray.forEach ▼
	local _callback = function(i)
		local _condition = i:IsA("BasePart")
		if _condition then
			-- ▼ ReadonlyArray.some ▼
			local _result = false
			local _callback_1 = function(name)
				return i.Name == name
			end
			for _k, _v in exceptPartNames do
				if _callback_1(_v, _k - 1, exceptPartNames) then
					_result = true
					break
				end
			end
			-- ▲ ReadonlyArray.some ▲
			_condition = not _result
		end
		if _condition then
			i:AddTag(tag)
		end
		setTagToChildren(i, tag, exceptPartNames)
	end
	for _k, _v in _exp do
		_callback(_v, _k - 1, _exp)
	end
	-- ▲ ReadonlyArray.forEach ▲
end
local setTagToChildNamed = function(inst, tag, childName)
	local _exp = inst:GetDescendants()
	-- ▼ ReadonlyArray.forEach ▼
	local _callback = function(i)
		if i:IsA("BasePart") and i.Name == childName then
			i:AddTag(tag)
		end
	end
	for _k, _v in _exp do
		_callback(_v, _k - 1, _exp)
	end
	-- ▲ ReadonlyArray.forEach ▲
end
return {
	setTagToChildren = setTagToChildren,
	setTagToChildNamed = setTagToChildNamed,
}
