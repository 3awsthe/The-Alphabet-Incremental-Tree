addLayer("AC",{
	name:"AC",
	symbol:"AC",
	position:0,
	row:"side",
	startData(){return{
		unlocked:true,
		display:new Decimal(0)
		}
	},
	color:"#ffff00",
	tooltip:"成就",
	achievements:{
		11:{
			name:"新的开端",
			tooltip:"获得 1 制造机",
			image(){
				if(hasAchievement("AC",11))return "./js/Pictures/11.png"
				else return ""
			},
			done(){return getBuyableAmount("OR",11).gte(1)}
		},
		12:{
			name:"100 很多了",
			tooltip:"获得 100 字母源",
			image(){
				if(hasAchievement("AC",12))return "./js/Pictures/12.png"
				else return ""
			},
			done(){return player.OR.points.gte(100)}
		},
		13:{
			name:"时间墙大师",
			tooltip:"获得 6 制造机",
			image(){
				if(hasAchievement("AC",13))return "./js/Pictures/13.png"
				else return ""
			},
			done(){return getBuyableAmount("OR",11).gte(5)}
		},
		14:{
			name:"哇，好多字母",
			tooltip:"获得 1 增益机",
			image(){
				if(hasAchievement("AC",14))return "./js/Pictures/14.png"
				else return ""
			},
			done(){return getBuyableAmount("OR",12).gte(1)}
		},
		15:{
			name:"值得称赞的耐心",
			tooltip:"获得 10,000 字母",
			image(){
				if(hasAchievement("AC",15))return "./js/Pictures/15.png"
				else return ""
			},
			done(){return player.points.gte(10000)}
		},
		16:{
			name:"这不好玩！",
			tooltip:"大冲击 1 次",
			image(){
				if(hasAchievement("AC",16))return "./js/Pictures/16.png"
				else return ""
			},
			done(){return player.IM.points.gte(1)}
		},
		17:{
			name:"这太好玩了",
			tooltip:"获得 10 冲击点数",
			image(){
				if(hasAchievement("AC",17))return "./js/Pictures/17.png"
				else return ""
			},
			done(){return player.IM.points.gte(10)}
		},
	},
})