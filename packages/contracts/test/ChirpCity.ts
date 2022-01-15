import { expect } from "chai";
import { ethers } from "hardhat";

describe("ChirpCity contract", () => {
  it("can send chirp", async () => {
    const [deployer] = await ethers.getSigners();
    const ChirpCityFactory = await ethers.getContractFactory("ChirpCity");

    const chirpCity = await ChirpCityFactory.deploy();

    await Promise.all(
      [
        chirpCity.chirp("hello"),
        chirpCity.chirp("hello"),
        chirpCity.chirp("hello"),
        chirpCity.chirp(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam rutrum, tellus elementum porttitor egestas, justo odio vehicula purus, et semper neque libero vel neque. Nulla vel condimentum ligula. Curabitur molestie rhoncus quam, feugiat finibus est consequat quis. Donec tortor quam, accumsan nec efficitur et, tempor ut nisl. Praesent et porta orci. Ut ex lorem, condimentum et accumsan at, consectetur vel leo. Phasellus auctor porttitor sem. Mauris egestas mi quis consequat scelerisque. Cras sit amet tempor erat.\n\nProin pharetra, lectus eget pellentesque aliquam, mauris ligula commodo odio, sagittis laoreet tortor felis id diam. Vestibulum interdum ex id nibh aliquet blandit. Quisque finibus pretium porttitor. Aenean urna ligula, mattis ut enim sed, efficitur cursus velit. Etiam id dictum tellus. Etiam molestie posuere augue non dapibus. Curabitur porttitor dui eu enim vestibulum mattis. Aliquam interdum iaculis placerat. Aliquam sollicitudin interdum scelerisque. Maecenas sagittis semper urna, ac cras amet."
        ),
        chirpCity.chirp(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam rutrum, tellus elementum porttitor egestas, justo odio vehicula purus, et semper neque libero vel neque. Nulla vel condimentum ligula. Curabitur molestie rhoncus quam, feugiat finibus est consequat quis. Donec tortor quam, accumsan nec efficitur et, tempor ut nisl. Praesent et porta orci. Ut ex lorem, condimentum et accumsan at, consectetur vel leo. Phasellus auctor porttitor sem. Mauris egestas mi quis consequat scelerisque. Cras sit amet tempor erat.\n\nProin pharetra, lectus eget pellentesque aliquam, mauris ligula commodo odio, sagittis laoreet tortor felis id diam. Vestibulum interdum ex id nibh aliquet blandit. Quisque finibus pretium porttitor. Aenean urna ligula, mattis ut enim sed, efficitur cursus velit. Etiam id dictum tellus. Etiam molestie posuere augue non dapibus. Curabitur porttitor dui eu enim vestibulum mattis. Aliquam interdum iaculis placerat. Aliquam sollicitudin interdum scelerisque. Maecenas sagittis semper urna, ac cras amet."
        ),
      ].map((txPromise) => txPromise.then((tx) => tx.wait()))
    );

    // expect((await chirpCity.currentId()).toNumber()).to.equal(3);
  }).timeout(1000 * 60);
});
