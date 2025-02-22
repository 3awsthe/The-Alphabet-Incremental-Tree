addLayer("OR",{
	name:"Origin",
	symbol:"OR",
	position:0,
	row:0,
	startData(){return{
		unlocked:true,
		points:new Decimal(0)
		}
	},
	color:"#33aa00",
	baseResource:"字母",
	baseAmount(){return player.points},
	resource:"字母源",
	requires:new Decimal(1),
	type:"normal",
	exponent:0.8,
	buyables:{
		11:{
		    title:"制造机",
		    display(){
				if(hasUpgrade("IM",15))return "将字母增益 x"+format(tmp.OR.buyables[11].effect)+"<br>花费 "+format(Decimal.pow(2,getBuyableAmount("OR",11).add(1)))+" 字母源<br>你有 "+format(getBuyableAmount("OR",11))+" 制造机"
				else return "将字母增益 x"+format(tmp.OR.buyables[11].effect)+"<br>花费 "+format(Decimal.exp(getBuyableAmount("OR",11)))+" 字母源<br>你有 "+format(getBuyableAmount("OR",11))+" 制造机"
			},
		    canAfford(){
				if(hasUpgrade("IM",15))return player.OR.points.gte(Decimal.pow(2,getBuyableAmount("OR",11).add(1)))
				else return player.OR.points.gte(Decimal.exp(getBuyableAmount("OR",11)))
		    },
			buy(){
				if(hasUpgrade("IM",15))player.OR.points=player.OR.points.minus(Decimal.pow(2,getBuyableAmount("OR",11).add(1)))
				else player.OR.points=player.OR.points.minus(Decimal.exp(getBuyableAmount("OR",11)))
				setBuyableAmount("OR",11,getBuyableAmount("OR",11).add(1))
			},
			effect(){
				if(getBuyableAmount("OR",11).gte(1)){
					if(hasUpgrade("IM",13))eff=new Decimal(1).mul(getBuyableAmount("OR",11).mul(4)).mul(tmp.OR.buyables[12].effect)
					else eff=new Decimal(1).mul(getBuyableAmount("OR",11).mul(3)).mul(tmp.OR.buyables[12].effect)
				}
				else eff=1
				return eff=eff
			},
			buyMax(){
				return Decimal.floor(Decimal.log2(player.points))
			},
			style:{
				"width":"150px",
				"height":"150px"
			}
		},
		12:{
		    title:"增益机",
		    display(){
				return "将制造机增益 x"+format(tmp.OR.buyables[12].effect)+"<br>花费 "+format(Decimal.pow(2.5,getBuyableAmount("OR",12).add(6)))+" 字母源<br>你有 "+format(getBuyableAmount("OR",12))+" 增益机"
			},
		    canAfford(){
				return player.OR.points.gte(Decimal.pow(2.5,getBuyableAmount("OR",12).add(6)))
		    },
			buy(){
				player.OR.points=player.OR.points.minus(Decimal.pow(2.5,getBuyableAmount("OR",12).add(6)))
				setBuyableAmount("OR",12,getBuyableAmount("OR",12).add(1))
			},
			effect(){
				if(getBuyableAmount("OR",12).gte(1))eff=new Decimal(1).mul(getBuyableAmount("OR",12).mul(2.5))
				else eff=1
				return eff=eff
			},
			style:{
				"width":"150px",
				"height":"150px"
			},
			unlocked(){return hasUpgrade("OR",13)}
		},
	},
	upgrades:{
		11:{
			title:"更快的",
			description:"字母增益 x1.5",
			cost:new Decimal(100)
		},
		12:{
			title:"自增",
			description:"字母增益字母获得",
			cost:new Decimal(150),
			effect(){return player.points.add(1).pow(0.1)},
			effectDisplay(){return "x"+format(upgradeEffect("OR",12))},
			unlocked(){return hasUpgrade("OR",11)}
		},
		13:{
			title:"打破时间墙的秘密",
			description:"解锁“增益机”",
			cost:new Decimal(200),
			unlocked(){return hasUpgrade("OR",12)}
		},
		14:{
			title:"打破时间墙的超级大秘密！",
			description:"每秒获得重置时 5% 的字母源",
			cost(){
				if(hasUpgrade("IM",12))return new Decimal(0)
				return new Decimal(500)
			},
			unlocked(){return hasUpgrade("OR",13)}
		},
		15:{
			title:"我认为这个不错",
			description:"字母源增益字母",
			cost:new Decimal(5000),
			effect(){return player.OR.points.add(1).pow(0.125)},
			effectDisplay(){return "x"+format(upgradeEffect("OR",15))},
			unlocked(){return hasUpgrade("OR",14)}
		}
	},
	passiveGeneration()
	{
		if(hasUpgrade("IM",12))return 0.2
		if(hasUpgrade("OR",14))return 0.05
	},
	automateStuff(){
		if(layers.OR.buyables[11].canAfford()&&hasUpgrade("IM",15))setBuyableAmount("OR",11,layers.OR.buyables[11].buyMax())
	},
	tabFormat:{
		"Buyables&Upgrades":{
			content:[
				"main-display",
				"blank",
				["prestige-button",function(){return ""}],
				"blank",
				"buyables",
				"blank",
				"blank",
				"upgrades"
			]
		}
	}
})
addLayer("IM",{
	name:"Impact",
	symbol:"IM",
	position:0,
	row:1,
	startData(){return{
		unlocked:true,
		points:new Decimal(0)
		}
	},
	color:"#ff5d00",
	baseResource:"字母源",
	baseAmount(){return player.OR.points},
	resource:"冲击点数",
	requires:new Decimal(1000000),
	canBuyMax(){return false},
	type:"normal",
	exponent:0.5,
	branches:["OR"],
	resetDescription(){return "大冲击以获得 "},
	upgrades:{
		11:{
			title:"加速！",
			description:"字母增益 x1.75",
			cost:new Decimal(1)
		},
		12:{
			title:"打破时间墙的超超超级大大大秘密！",
			description:"每秒获得重置时 20% 的字母源",
			cost:new Decimal(2)
		},
		13:{
			title:"疯狂制造",
			description:"增强制造机的增益效果",
			cost:new Decimal(4)
		},
		14:{
			title:"正确的",
			description:"冲击点数增益字母",
			cost:new Decimal(8),
			effect(){return player.IM.points.add(1).pow(0.4)},
			effectDisplay(){return "x"+format(upgradeEffect("IM",14))}
		},
		15:{
			title:"游戏变得越来越简单了",
			description:"修改制造机的价格公式",
			cost:new Decimal(16),
		}
	},
	tabFormat:{
		"Upgrades":{
			content:[
				"main-display",
				"blank",
				["prestige-button",function(){return ""}],
				"blank",
				"upgrades"
			]
		}
	}
})