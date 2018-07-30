pragma solidity ^0.4.23;

contract Wizards {
    mapping(address => uint256) public score;
    mapping(address => string) public nickName;
    mapping(address => bool) public userExist;
    address[10] public topPlayers;
    address public creator;
    
    constructor() public {
        creator = msg.sender;
    }

    modifier userExists(){
        require(userExist[msg.sender]);
        _;
    }

    modifier userDoesNotExist(){
        require(!userExist[msg.sender]);
        _;
    }

    function sendScore(uint256 _score) public userExists returns (bool){        
        score[msg.sender] += _score;
        insertIntoTop(score[msg.sender]);
        return true;
    }

    function registerUser(string _nickName) public userDoesNotExist returns (bool){
        userExist[msg.sender] = true;
        nickName[msg.sender] = _nickName;
        return true;
    }

    function insertIntoTop(uint256 _score) private {
        uint i = 0;
        if(_score > score[topPlayers[9]]){
            for(i; i < topPlayers.length; i++){
                if(_score >= score[topPlayers[i]]){
                    break;
                }
            }
            for(uint j = topPlayers.length - 1; j > i; j--){
                topPlayers[j] = topPlayers[j - 1];
            }
            topPlayers[i] = msg.sender;
        }
    }
    
    function getTop() public view returns(address[10]) {
        return topPlayers;
    }
}