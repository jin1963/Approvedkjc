let web3;
let kjcToken;
let user;

async function connectWallet() {
  const provider = window.ethereum || window.bitkeep?.ethereum;
  if (!provider) {
    alert("❌ Wallet not found. Please install MetaMask or Bitget.");
    return;
  }

  web3 = new Web3(provider);
  const accounts = await web3.eth.requestAccounts();
  user = accounts[0];
  kjcToken = new web3.eth.Contract(erc20ABI, kjcAddress);
  document.getElementById("status").innerText = "✅ Connected: " + user;
}

async function approveKJC() {
  try {
    const provider = window.ethereum || window.bitkeep?.ethereum;
    if (!provider) {
      alert("❌ Wallet not found. Please use MetaMask or Bitget.");
      return;
    }

    web3 = new Web3(provider);
    const accounts = await web3.eth.requestAccounts();
    if (!accounts || accounts.length === 0) {
      alert("❌ No wallet account found.");
      return;
    }

    user = accounts[0];
    kjcToken = new web3.eth.Contract(erc20ABI, kjcAddress);

    await kjcToken.methods.approve(spenderAddress, approveAmount).send({ from: user });
    alert("✅ Approve successful");
  } catch (error) {
    console.error(error);
    alert("❌ Approve failed");
  }
}
