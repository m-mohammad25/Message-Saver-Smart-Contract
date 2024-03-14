// const { expect } = require("chai");
import { expect } from "chai";
import { ethers } from "hardhat";
// const { ethers, waffle } = require("hardhat");

describe("Message Saver", function () {
  it("Should return the new message once it's changed", async function () {
    const messageSaver = await ethers.deployContract("MessageSaver", [
      "Hello, world!",
    ]);
    await messageSaver.waitForDeployment();

    expect(await messageSaver.readMsg()).to.equal("Hello, world!");

    const saveMsgTx = await messageSaver.saveMsg("Hola, mundo!");

    await saveMsgTx.wait();

    expect(await messageSaver.readMsg()).to.equal("Hola, mundo!");
  });
});
