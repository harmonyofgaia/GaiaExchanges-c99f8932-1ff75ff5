// Example: IPFS upload using Pinata
export async function uploadToIPFS(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PINATA_JWT}`
    },
    body: formData
  });
  const data = await response.json();
  return data.IpfsHash;
}
