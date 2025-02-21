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
				return "将字母增益 x"+format(tmp.OR.buyables[11].effect)+"<br>花费 "+format(Decimal.pow(2,getBuyableAmount("OR",11)))+" 字母源<br>你有 "+format(getBuyableAmount("OR",11))+" 制造机"
			},
		    canAfford(){
				return player.OR.points.gte(Decimal.pow(2,getBuyableAmount("OR",11)))
		    },
			buy(){
				player.OR.points=player.OR.points.minus(Decimal.pow(2,getBuyableAmount("OR",11)))
				setBuyableAmount("OR",11,getBuyableAmount("OR",11).add(1))
			},
			effect(){
				if(getBuyableAmount("OR",11).gte(1))eff=new Decimal(1).mul(getBuyableAmount("OR",11).mul(2)).mul(tmp.OR.buyables[12].effect)
				else eff=1
				return eff=eff
			},
			style:{
				"width":"150px",
				"height":"150px"
			}
		},
		12:{
		    title:"增益机",
		    display(){
				return "将制造机增益 x"+format(tmp.OR.buyables[12].effect)+"<br>花费 "+format(Decimal.pow(2.5,getBuyableAmount("OR",12).add(6)))+" 字母源<br>你有 "+format(getBuyableAmount("OR",12))+" 增益"
			},
		    canAfford(){
				return player.OR.points.gte(Decimal.pow(2.5,getBuyableAmount("OR",12).add(6)))
		    },
			buy(){
				player.OR.points=player.OR.points.minus(Decimal.pow(2.5,getBuyableAmount("OR",12).add(6)))
				setBuyableAmount("OR",12,getBuyableAmount("OR",12).add(1))
			},
			effect(){
				if(getBuyableAmount("OR",12).gte(1))eff=new Decimal(1).mul(getBuyableAmount("OR",12).mul(2.5)).mul(tmp.OR.buyables[21].effect)
				else eff=1
				return eff=eff
			},
			style:{
				"width":"150px",
				"height":"150px"
			},
			unlocked(){return hasUpgrade("OR",13)}
		},
		21:{
		    title:"字母冲击",
		    display(){
				return "将增益机增益 x"+format(tmp.OR.buyables[21].effect)+"，将字母增益 x"+format(new Decimal(1).mul(getBuyableAmount("OR",21).mul(1.25)).add(1))+"<br>购买时将重置前面所有内容<br>花费 "+format(Decimal.pow(2.5,getBuyableAmount("OR",21).add(10)))+" 字母源<br>你经历了 "+format(getBuyableAmount("OR",21))+" 次字母冲击"
			},
		    canAfford(){
				return player.OR.points.gte(Decimal.pow(2.5,getBuyableAmount("OR",21).add(10)))
		    },
			buy(){
				player.OR.points=player.OR.points.minus(Decimal.pow(2.5,getBuyableAmount("OR",21).add(10)))
				setBuyableAmount("OR",21,getBuyableAmount("OR",21).add(1))
				player.points=new Decimal(0)
				player.OR.points=new Decimal(0)
				setBuyableAmount("OR",12,new Decimal(0))
				setBuyableAmount("OR",11,new Decimal(0))
				
			},
			effect(){
				if(getBuyableAmount("OR",21).gte(1))eff=new Decimal(1).mul(getBuyableAmount("OR",21).mul(1.25))
				else eff=1
				return eff=eff
			},
			style:{
				"width":"150px",
				"height":"150px"
			},
			unlocked(){return hasUpgrade("OR",15)}
		}
	},
	upgrades:{
		11:{
			title:"更快的",
			description:"字母获得增益 x1.5",
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
			title:"我认为这个不错",
			description:"字母源增益字母",
			cost:new Decimal(5000),
			effect(){return player.OR.points.add(1).pow(0.125)},
			effectDisplay(){return "x"+format(upgradeEffect("OR",14))},
			unlocked(){return hasUpgrade("OR",13)}
		},
		15:{
			title:"极地大冲击",
			description:"解锁“字母冲击”",
			cost:new Decimal(15000),
			unlocked(){return hasUpgrade("OR",14)}
		},
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