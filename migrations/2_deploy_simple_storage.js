const Collectible = artifacts.require("Collectible");
const Helper = artifacts.require("Helper");

module.exports = async function (deployer) {
  const commision = 10;
  const ref_benefits = 10;
  await deployer.deploy(Helper);
  await deployer.link(Helper, Collectible);
  await deployer.deploy(Collectible, commision, ref_benefits);
};
