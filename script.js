// Check if MetaMask is installed
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    const web3 = new Web3(window.ethereum);

    // Smart Contract Details
    const contractAddress = "0x48B947d2ec223d374fEa13c18CF82cC4E49F5066"; // Your deployed contract address
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
        },
        {
            "inputs": [],
            "name": "storedNumber",
            "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const contract = new web3.eth.Contract(abi, contractAddress);

    // Function to connect MetaMask wallet
    async function connectMetaMask() {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const selectedAccount = accounts[0];
            console.log('Connected Account:', selectedAccount);
            document.getElementById('blockchain-message').textContent = `Connected: ${selectedAccount}`;

            // Get Ethereum balance
            const balance = await web3.eth.getBalance(selectedAccount);
            console.log('Balance:', web3.utils.fromWei(balance, 'ether'), 'ETH');
        } catch (error) {
            console.error('Connection error:', error);
            alert('Failed to connect to MetaMask. Please try again.');
        }
    }

    // Listen for account changes
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
            const selectedAccount = accounts[0];
            document.getElementById('blockchain-message').textContent = `Connected: ${selectedAccount}`;
        } else {
            document.getElementById('blockchain-message').textContent = 'Connect Wallet';
        }
    });

    // Interact with Smart Contract
    async function storeNumber() {
        try {
            const number = parseInt(document.getElementById('number-input').value);
            const accounts = await web3.eth.getAccounts();
            const receipt = await contract.methods.storeNumber(number).send({ from: accounts[0] });
            console.log('Transaction Receipt:', receipt);
            alert('Number stored successfully!');
        } catch (error) {
            console.error('Error storing number:', error);
            alert('Failed to store number. See console for details.');
        }
    }

    async function getStoredNumber() {
        try {
            const storedNumber = await contract.methods.getStoredNumber().call();
            console.log('Stored Number:', storedNumber);
            document.getElementById('stored-number').textContent = `Stored Number: ${storedNumber}`;
        } catch (error) {
            console.error('Error retrieving number:', error);
            alert('Failed to retrieve number. See console for details.');
        }
    }

    // Connect Wallet event listener
    document.getElementById('connect-wallet').addEventListener('click', connectMetaMask);

    // Store Number event listener
    document.getElementById('store-btn').addEventListener('click', storeNumber);

    // Retrieve Number event listener
    document.getElementById('retrieve-btn').addEventListener('click', getStoredNumber);

    // Handle the "Copy Address" button
    document.getElementById('copy-btn').addEventListener('click', () => {
        const walletAddress = document.getElementById('wallet-address').textContent;
        navigator.clipboard.writeText(walletAddress).then(() => {
            document.getElementById('copy-msg').style.display = 'block';
            setTimeout(() => {
                document.getElementById('copy-msg').style.display = 'none';
            }, 2000);
        });
    });

    // Droplet animation using GSAP
    const arry = new Array(200).fill();
    arry.forEach(() => {
        const droplet = document.createElement('div');
        droplet.className = 'droplet';

        const pos = Math.random() * 100;
        const delay = Math.random() * 10;
        const speed = Math.random() * 18 + 14;
        const size = Math.random() * 12 + 4;
        const blurVal = Math.random() * 4 + 1;

        droplet.style.left = `${pos}%`;
        droplet.style.height = `${size}px`;
        droplet.style.width = `${size}px`;

        gsap.set(droplet, { opacity: Math.random() * 0.8 + 0.5 });
        gsap.to(droplet, {
            y: 1520,
            delay: delay,
            duration: speed,
            filter: `blur(${blurVal}px)`,
            repeat: -1,
            ease: 'power1.inOut',
        });

        document.getElementById('container').appendChild(droplet);
    });

    // Function to create snowflakes
    function createSnowflakes() {
        const container = document.getElementById('container');

        for (let i = 0; i < 100; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';

            snowflake.style.left = `${Math.random() * 100}vw`;
            snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
            snowflake.style.animationDelay = `${Math.random() * 5}s`;
            snowflake.style.opacity = `${Math.random() * 0.8 + 0.2}`;

            container.appendChild(snowflake);
        }
    }

    // Call createSnowflakes function to add snowflakes to the page
    createSnowflakes();
} else {
    console.log('MetaMask is not installed!');
    alert('Please install MetaMask to interact with the blockchain.');
}
