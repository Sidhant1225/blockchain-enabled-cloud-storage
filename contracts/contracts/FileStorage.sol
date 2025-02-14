// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract FileStorage is Ownable {
    struct File {
        string fileHash;
        string fileName;
        address owner;
    }

    mapping(uint256 => File) public files;
    uint256 public fileCount;

    event FileUploaded(uint256 fileId, string fileHash, string fileName, address owner);

    function uploadFile(string memory _fileHash, string memory _fileName) public {
        fileCount++;
        files[fileCount] = File(_fileHash, _fileName, msg.sender);
        emit FileUploaded(fileCount, _fileHash, _fileName, msg.sender);
    }

    function getFile(uint256 _fileId) public view returns (string memory, string memory, address) {
        File memory file = files[_fileId];
        return (file.fileHash, file.fileName, file.owner);
    }
}