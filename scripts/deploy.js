//imports
const { ethers, run, network } = require("hardhat")
//async main

async function verify(contractAddress, args) {
  try {
    console.log("wait verifying...")
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase() == "already verified") {
      console.log("Already Verified yayy")
    } else {
      console.log(e, e.message)
    }
  }
}

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("deployingg contract...")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.waitForDeployment()
  console.log("deployed contract to:", simpleStorage.target)

  if (network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("waiting for 1 block confirmation")
    await simpleStorage.deploymentTransaction().wait(1)
    await verify(simpleStorage.target, [])
  }

  const currentValue = await simpleStorage.retrieve()
  console.log("Current Value is", currentValue)

  //update the current value
  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)

  const updatedValue = await simpleStorage.retrieve()
  console.log("the updated Value is", updatedValue)
}

//main call
main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
