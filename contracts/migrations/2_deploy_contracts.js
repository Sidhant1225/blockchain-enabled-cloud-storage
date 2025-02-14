const FileStorage = artifacts.require("FileStorage");
const UserManager = artifacts.require("UserManager");

module.exports = async function(deployer, network, accounts) {
    const initialOwner = accounts[0]; // Set the initial owner to the first account

    // Deploy FileStorage contract
    await deployer.deploy(FileStorage, initialOwner);
    const fileStorageInstance = await FileStorage.deployed();
    console.log("FileStorage deployed at address:", fileStorageInstance.address);

    // Deploy UserManager contract
    await deployer.deploy(UserManager, initialOwner);
    const userManagerInstance = await UserManager.deployed();
    console.log("UserManager deployed at address:", userManagerInstance.address);
};