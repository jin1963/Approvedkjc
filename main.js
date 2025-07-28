let web3;
let kjcToken;
let user;

async function connectWallet() {
  if (window.ethereum || window.bitkeep?.ethereum) {
    web3 = new Web3(window.ethereum || window.bitkeep.ethereum);
    const accounts = await web3.eth.requestAccounts();
    user = accounts[0];
    document.getElementById("status").innerText = "✅ Connected: " + user;
    kjcToken = new web3.eth.Contract(erc20ABI, kjcAddress);
  } else {
    alert("Please install MetaMask or Bitget Wallet");
  }
}

async function approveKJC() {
  if (!kjcToken || !user) {
    alert("Please connect wallet first.");
    return;
  }

  try {
    await kjcToken.methods.approve(spenderAddress, approveAmount).send({ from: user });
    alert("✅ Approve successful");
  } catch (error) {
    console.error(error);
    alert("❌ Approve failed");
  }
}
