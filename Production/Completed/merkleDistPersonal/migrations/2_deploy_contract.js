var Contract = artifacts.require("TokenFarm");

module.exports = async function(deployer, network, accounts) {
  deployer.deploy(Contract, "", "");
 // await tokenFarm.approve('0xbd20f89D276cC947dBca8Aeb88b2d38E080B952A', '1000000000000', { from: deployer })


};
