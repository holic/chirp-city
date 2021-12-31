import { expect } from "chai";
import { ethers } from "hardhat";

describe("ChirpCity contract", () => {
  it("should store messages", async () => {
    const [deployer] = await ethers.getSigners();
    const ChirpCityFactory = await ethers.getContractFactory("ChirpCity");

    const chirpCity = await ChirpCityFactory.deploy();

    await Promise.all(
      [
        chirpCity.chirp("hello", 0, []),
        chirpCity.chirp("hello", 0, []),
        chirpCity.chirp("hello", 1, [deployer.address]),
        chirpCity.chirp("hello", 2, [
          deployer.address,
          deployer.address,
          deployer.address,
        ]),
      ].map((txPromise) => txPromise.then((tx) => tx.wait()))
    );

    expect(await chirpCity.messages(3)).to.have.property("body", "hello");
  }).timeout(1000 * 60);
});
