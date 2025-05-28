// Check if MetaMask is installed
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    const web3 = new Web3(window.ethereum);

    const contractAddress = "0x48B947d2ec223d374fEa13c18CF82cC4E49F5066";
    const abi = [
        {
            "inputs": [{ "internalType": "uint256", "name": "_number", "type": "uint256" }],
            "name": "storeNumber",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getStoredNumber",
            "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const contract = new web3.eth.Contract(abi, contractAddress);

    async function connectMetaMask() {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const selectedAccount = accounts[0];
            document.getElementById('blockchain-message').textContent = `Connected: ${selectedAccount}`;
        } catch (error) {
            console.error('Connection error:', error);
            alert('Failed to connect to MetaMask. Please try again.');
        }
    }

    async function storeNumber() {
        try {
            const number = parseInt(document.getElementById('number-input').value);
            const accounts = await web3.eth.getAccounts();
            await contract.methods.storeNumber(number).send({ from: accounts[0] });
            alert('Number stored successfully!');
        } catch (error) {
            console.error('Error storing number:', error);
            alert('Failed to store number.');
        }
    }

    async function getStoredNumber() {
        try {
            const number = await contract.methods.getStoredNumber().call();
            document.getElementById('stored-number').textContent = `Stored Number: ${number}`;
        } catch (error) {
            console.error('Error retrieving number:', error);
            alert('Failed to retrieve number.');
        }
    }

    document.getElementById('connect-wallet').addEventListener('click', connectMetaMask);
    document.getElementById('store-btn').addEventListener('click', storeNumber);
    document.getElementById('retrieve-btn').addEventListener('click', getStoredNumber);
} else {
    alert('Please install MetaMask to use this app.');
}
