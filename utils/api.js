module.exports = {
  isInstall:function(){
  	return process.env.baseUrl + "install/isInstall";
  },
  typechoInstall:function(){
  	return process.env.baseUrl + 'install/typechoInstall';
  },
  apiNewVersion:function(){
  	return process.env.baseUrl + 'system/apiNewVersion';
  },
  newInstall:function(){
  	return process.env.baseUrl + 'install/newInstall';
  },
  isKey:function(){
  	return process.env.baseUrl + 'system/isKey';
  },
  getConfig:function(){
  	return process.env.baseUrl + 'system/getConfig';
  },
  setupMysql:function(){
  	return process.env.baseUrl + 'system/setupMysql';
  },
  setupRedis:function(){
  	return process.env.baseUrl + 'system/setupRedis';
  },
  setupEmail:function(){
  	return process.env.baseUrl + 'system/setupEmail';
  },
  setupWebKey:function(){
  	return process.env.baseUrl + 'system/setupWebKey';
  },
  setupConfig:function(){
  	return process.env.baseUrl + 'system/setupConfig';
  },
  allConfig:function(){
  	return process.env.baseUrl + 'system/allConfig';
  },
  getRuleNews:function(){
  	return 'https://api.ruletree.club/typechoMetas/selectContents';
  },
  
}
