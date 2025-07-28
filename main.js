let web3;
let kjcToken;
let user;
async function approveKJC() {
  if (!window.web3 || !window.ethereum) {
    alert("Please connect wallet first.");
    return;
  }

  web3 = new Web3(window.ethereum || window.bitkeep?.ethereum);
  const accounts = await web3.eth.getAccounts();
  user = accounts[0];
  kjcToken = new web3.eth.Contract(erc20ABI, kjcAddress);

  try {
    await kjcToken.methods.approve(spenderAddress, approveAmount).send({ from: user });
    alert("✅ Approve successful");
  } catch (error) {
    console.error(error);
    alert("❌ Approve failed");
  }
}
