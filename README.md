# Instructions

Case Study (Web3 Frontend) - Developing a Vault withdrawal app :
<https://morpho-labs.notion.site/Case-Study-Web3-Frontend-Developing-a-Vault-withdrawal-app-fc0230e148c94b76bc09740f264c2838> 

# Solution

Firstly, thank you for taking the time to review my work.

I'll try and keep this as concise as possible..

Because I know the stack you're using at Morpho, I started a new Next.js app, with viem, wagmi and react.

I split the app into only two screens. In hindsight, I would pull out "withdraw03/04/05" into their own page and would use a context to pass the transaction data from withdraw01/02. Still, it works perfectly as is. 

Decided to make some components:
- some templates for the containers (boxCard, transactionCard, withdrawCard)
- the rainbow button
- custom input field with the icons
- top nav component

Have one data hook for fetching data from the vault (useVaultData).

One util function "roundToDecimals", and I couldn't have that in without adding a unit test. 

I chose to store the abi data in .ts files instead of .json because viem expects abi to be declared "as const". 
If I had dozens of abis that have a potential to be changed in the future, I would store them as .json and write a small util function to import them as const. 

I used tailwind for styling. Not a huge fan of Tailwind myself, but I'm actually starting to warm up to it after using it for the last few days.
TODO: Pull some constants, like colors, into variables and reuse them. I didn't want to waste time on this at this stage. 

# Blockchain connections

I used viem and wagmi interchangeably. If I wanted to make a simple call like "isMetaMorpho" I used wagmi, as it conveniently already wraps the underlying logic into a react hook. For more complicated situations, especially with multiple calls, I used viem (e.g. useVaultData).

I tested all the functionality on Tenderly and 60% of the time it worked 100% of the time. ;D
# Other

There is an .env.example file that shows which variables should be present.

# Possible improvements

- use variables with tailwind
- Validate some of the strings that should be addresses, I did a dirty "as `0x${string}`" in few places
- When showing how much was withdrawn from the vault (waithdraw04), parse the data from the tx receipt instead of the vault data

# Final thoughts

This was fun. I hope it was enough to land the job... 

Best,

Tiho
