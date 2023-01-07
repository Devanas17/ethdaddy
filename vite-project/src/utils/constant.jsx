const contractABI = ""
const contractAddress = []
import  {ethers}  from "ethers"

export const ethereumClient = async() => {
    try {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          return contract
  
        }
      } catch (error) {
        console.log("Create Post Failed", error);
      }
}