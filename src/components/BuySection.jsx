import { useState } from 'react';
import { ethers } from 'ethers';
import hsnSaleAbi from '../abi/hsnSale.json';

const SALE_CONTRACT = '0xYourSaleContractAddress';
const HSN_PRICE_ETH = 0.00003;

function BuySection() {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const handleBuy = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(SALE_CONTRACT, hsnSaleAbi, signer);
      const value = ethers.parseUnits((amount * HSN_PRICE_ETH).toFixed(18), 'ether');
      const tx = await contract.buyTokens({ value });
      await tx.wait();
      setStatus('✅ Purchase complete');
    } catch (err) {
      console.error(err);
      setStatus('❌ Transaction failed');
    }
  };

  return (
    <section className="py-12 px-6 bg-black text-center">
      <h2 className="text-3xl font-bold text-gold mb-4">Buy HSN</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="px-4 py-2 rounded mr-2 text-black"
      />
      <button onClick={handleBuy} className="bg-gold text-black px-6 py-2 rounded hover:bg-yellow-400">
        Buy Now
      </button>
      <p className="mt-4 text-green-400">{status}</p>
    </section>
  );
}

export default BuySection;
