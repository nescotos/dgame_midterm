const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../src/compiled/Wizards.json');

let accounts, scrow;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    wizards = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode
        })
        .send({
            from: accounts[0],
            gas: '3000000'
        });
    await wizards.methods.registerUser('XUser')
        .send({
            from: accounts[1]
        });
});

describe('Wizards Smart Contract', () => {
    it('the contract should be deployed', async () => {
        assert(wizards.options.address);
    });

    it('the contract should be able to register users', async () => {
        await wizards.methods.registerUser('MyUser')
        .send({
            from: accounts[0]
        });
        const nickName = await wizards.methods.nickName(accounts[0]).call();
        assert(nickName === 'MyUser');
    });

    it('the contract should be able to avoid overwrite nickname', async () => {
        await wizards.methods.registerUser('MyUser')
            .send({
                from: accounts[0]
            });
        try{
            await wizards.methods.registerUser('MyUser2')
                .send({
                    from: accounts[0]
                });
            assert(false);
        }
        catch(err){
            assert(err);
        }
    });

    it('the contract should be able to save scores for registered users', async () => {
        await wizards.methods.sendScore(2500)
            .send({
                from: accounts[1],
                gas: '3000000'
            });
        const score = await wizards.methods.score(accounts[1]).call();
        console.log(score);
        assert(score == 2500);
    });

    it('the contract should be able to avoid saving scores for non-registered users', async () => {
        try{
            await wizards.methods.sendScore(2500)
                .send({
                    from: accounts[0],
                    gas: '3000000'
                });
            assert(false);
        }
        catch(err){
            assert(err);
        }
    });

    it('the contract should be able to order top 10 wizards correctly', async () => {
        await wizards.methods.registerUser('MyUser')
            .send({
                from: accounts[0]
            });
        await wizards.methods.registerUser('MyUser2')
            .send({
                from: accounts[2]
            });
        await wizards.methods.registerUser('MyUser3')
            .send({
                from: accounts[3]
            });
        await wizards.methods.sendScore(2500)
            .send({
                from: accounts[0],
                gas: '3000000'
            });
        await wizards.methods.sendScore(3000)
            .send({
                from: accounts[1],
                gas: '3000000'
            });
        await wizards.methods.sendScore(100)
            .send({
                from: accounts[2],
                gas: '3000000'
            });
        await wizards.methods.sendScore(220)
            .send({
                from: accounts[3],
                gas: '3000000'
            });
        const top = await wizards.methods.getTop().call();
        assert(top[0] === accounts[1]);
        assert(top[1] === accounts[0]);
        assert(top[2] === accounts[3]);
        assert(top[3] === accounts[2]);
    });
    
});