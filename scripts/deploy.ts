import { ethers } from "hardhat";

async function main() {
  const messageSaver = await ethers.deployContract("MessageSaver", [
    "Greetings!",
  ]);

  await messageSaver.waitForDeployment();

  console.log("MessageSaver deployed to:", messageSaver.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
