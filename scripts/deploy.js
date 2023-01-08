const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  const [deployer] = await ethers.getSigners();

  const ETHDaddy = await hre.ethers.getContractFactory("ETHDaddy");
  const ethDaddy = await ETHDaddy.deploy("ETH Daddy", "ETHD");

  await ethDaddy.deployed();

  console.log(` deployed to ${ethDaddy.address}`);

  // List 6 domains
  const names = [
    "jack.eth",
    "john.eth",
    "henry.eth",
    "cobalt.eth",
    "oxygen.eth",
  ];
  const costs = [
    tokens(0.1),
    tokens(0.02),
    tokens(0.003),
    tokens(0.04),
    tokens(0.06),
  ];

  for (var i = 0; i < costs.length; i++) {
    const transaction = await ethDaddy
      .connect(deployer)
      .list(names[i], costs[i]);
    await transaction.wait();

    console.log(`Listed Domain ${i + 1}: ${names[i]}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
