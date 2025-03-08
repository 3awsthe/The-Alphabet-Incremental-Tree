addLayer("OR",{
	name:"Origin",
	symbol:"OR",
	position:0,
	row:0,
	startData(){return{
		unlocked:true,
		points:new Decimal(0),
		jq:0,
		jq2:0
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
			effect()
			{
				if(hasUpgrade("OR",16))return player.points.add(1).pow(0.15)
				else return player.points.add(1).pow(0.1)
			},
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
			effect()
			{
				if(hasUpgrade("OR",21))return player.OR.points.add(1).pow(0.2)
				else return player.OR.points.add(1).pow(0.125)
			},
			effectDisplay(){return "x"+format(upgradeEffect("OR",15))},
			unlocked(){return hasUpgrade("OR",14)}
		},
		16:{
			title:"古希腊掌管增益的神",
			description:"增强“自增”",
			cost:new Decimal(2e6),
			unlocked(){return hasUpgrade("IM",16)&&hasUpgrade("OR",15)}
		},
		21:{
			title:"古希腊掌管增益的神 II",
			description:"增强“我认为这个不错”",
			cost:new Decimal(1e7),
			unlocked(){return hasUpgrade("OR",16)}
		}
	},
	clickables:{
		11:{
			title:"1-1",
			onClick(){
				player.OR.jq=1;
			},
			canClick(){return 1}
		},
		12:{
			title:"1-1",
			onClick(){
				player.OR.jq2=1;
			},
			canClick(){return 1},
			unlocked(){return hasUpgrade("OR",13)}
		}
	},
	passiveGeneration()
	{
		if(hasUpgrade("IM",12))return 0.2
		if(hasUpgrade("OR",14))return 0.05
	},
	automateStuff(){
		if(player.OR.points.gte(Decimal.pow(2,getBuyableAmount("OR",11).add(1)))&&hasUpgrade("IM",15)){setBuyableAmount("OR",11,Decimal.floor(Decimal.log2(player.OR.points)))}/*if(player.OR.jq==1)
		{
			alert("为什么……")
			alert("为什么我会来到这个地方……")
			alert("这究竟是一个梦还是彻彻底底的现实……")
			alert("……")
			alert("我多少次对着那泛满白光的墙壁思考这个问题。")
			alert("不过显然这对我逃出这里并没有什么用处。")
			alert("……")
			alert("我希望再也没有人会来到这个房间，尽管有人来是最好的。"),
			player.OR.jq=0
		}
		if(player.OR.jq2==1)
		{
			alert("增益机？")
			alert("眼前那个大型的机子吸引了我的注意。")
			alert("我试着购买了这个叫“增益机”的东西，越来越多的字母从天而降，出现在我的面前。")
			player.OR.jq2=0
		}
		*/
	},
	tabFormat:{
		"升级和可购买项":{
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
		},
		/*
		"剧情":{
			content:[
				"clickables"
			]
		}
		*/
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
	gainMult()
	{
		mult=new Decimal(1)
		mult=mult.mul(tmp.IM.buyables[11].effect)
		return mult
	},
	upgrades:{
		11:{
			title:"加速！",
			description:"字母增益 x1.75",
			cost:new Decimal(1),
		},
		12:{
			title:"打破时间墙的超超超级大大大秘密！",
			description:"每秒获得重置时 20% 的字母源",
			cost:new Decimal(2),
			unlocked(){return hasUpgrade("IM",11)}
		},
		13:{
			title:"疯狂制造",
			description:"增强制造机的增益效果并将字母增益 x3",
			cost:new Decimal(3),
			unlocked(){return hasUpgrade("IM",12)}
		},
		14:{
			title:"正确的",
			description:"冲击点数增益字母",
			cost:new Decimal(4),
			effect(){return player.IM.points.add(1).pow(0.4)},
			effectDisplay(){return "x"+format(upgradeEffect("IM",14))},
			unlocked(){return hasUpgrade("IM",13)}
		},
		15:{
			title:"EASY",
			description:"修改制造机的价格公式，自动购买制造机而不花费字母源",
			cost:new Decimal(4),
			unlocked(){return hasUpgrade("IM",14)}
		},
		16:{
			title:"这么多吗",
			description:"解锁一些 OR 层升级",
			cost:new Decimal(6),
			unlocked(){return hasUpgrade("IM",15)}
		},
		21:{
			title:"看，是挑战",
			description:"解锁一个 IM 层挑战",
			cost:new Decimal(20),
			unlocked(){return hasUpgrade("IM",16)}
		}
	},
	buyables:{
		11:{
		    title:"冲击精华",
		    display(){
				return "将冲击点数增益 x"+format(tmp.IM.buyables[11].effect)+"<br>花费 "+format(Decimal.pow(5,getBuyableAmount("IM",11)))+" 冲击点数<br>你有 "+format(getBuyableAmount("IM",11))+" 制造机"
			},
		    canAfford(){
				return player.IM.points.gte(Decimal.pow(5,getBuyableAmount("IM",11)))
		    },
			buy(){
				player.IM.points=player.IM.points.minus(Decimal.pow(5,getBuyableAmount("IM",11)))
				setBuyableAmount("IM",11,getBuyableAmount("IM",11).add(1))
			},
			effect(){
				if(getBuyableAmount("IM",11).gte(1)){
					eff=Decimal.pow(2,getBuyableAmount("IM",11))
				}
				else eff=1
				return eff=eff
			},
			style:{
				"width":"150px",
				"height":"150px"
			},
			//unlocked(){return hasUpgrade("IM",16)}
		},
	},
	challenges:{
		11:{
			name:"^_^",
			challengeDescription:"字母 ^0.75",
			rewardDescription:"字母增益 ^1.1",
			canComplete(){return player.OR.points.gte(1000000)},
			goalDescription:"1,000,000 字母源",
			unlocked(){return hasUpgrade("IM",21)}
		},
	},
	tabFormat:{
		"升级":{
			content:[
				"main-display",
				"blank",
				["prestige-button",function(){return ""}],
				"blank",
				"upgrades",
			]
		},
		"可购买项":{
			content:[
			"blank",
			"buyables"
			],
			//unlocked(){return hasUpgrade("IM",16)}
		},
		"挑战":{
			content:[
				"blank",
				"challenges"
			]
		}
	}
})