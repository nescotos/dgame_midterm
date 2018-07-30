# Decentralized Applications by Siraj 
## Batch #2 
### Midterm Project
#### Math Wizards:
The game generates random math operations, you'll have two minutes to solve the greatest amount of basic math operations; the results will be stored in Blockchain Network.

#### Demo: 
[Demo URL](https://gateway.ipfs.io/ipfs/QmNbeeBbPhtS79zPztS2iti15CxZXkNrqMqL3J2kr6uiYp)

#### Stack
- Ethereum Rinkeby Test Network
- Ganache CLI
- Web3
- React
- Truffle
- IPFS
- Bulma CSS
#### Instructions
- Install the dependencies
    ```
    npm install
    ```
- Compile Smart Contracts
    ```
    npm run compile
    ```
- Test Smart Contracts
    ```
    npm run test-contract
    ```
- Deploy Smart Contract
    - After the compilation inside `src` you should be able to see the `compiled` folder.
    - Inside `src` directory create a file called: `env.json` with the following properties:
        -  `address`: Account address to deploy the contract.
        -  `endpoint`: Network Node to deploy your contract.
    -  Run
        ```
        npm run deploy
        ```
    - You'll get the contract address, copy and paste it inside `env.json`, using `contractAddress` property
    
- Run Locally
    ```
        npm start
    ```