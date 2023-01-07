const hre = require("hardhat");

async function main() {
  const ETHDaddy = await hre.ethers.getContractFactory("ETHDaddy");
  const ethDaddy = await ETHDaddy.deploy("ETH Daddy", "ETHD");

  await ethDaddy.deployed();

  console.log(` deployed to ${ethDaddy.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
