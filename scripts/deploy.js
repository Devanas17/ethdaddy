const hre = require("hardhat");

async function main() {
  const ETHDaddy = await hre.ethers.getContractFactory("ETHDaddy");
  const ethDaddy = await ETHDaddy.deploy();

  await ethDaddy.deployed();

  console.log(` deployed to ${lock.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
