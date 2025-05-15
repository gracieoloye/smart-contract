// SPDX-License-Identifier: MIT
// This specifies the license type for the contract. The MIT license is permissive and commonly used in open-source projects.

pragma solidity ^0.8.24;
// Specifies the version of Solidity the contract is written in.
// This ensures compatibility with the Solidity compiler version 0.8.24 or above.

// Define the contract named "SimpleStorage"
contract SimpleStorage {
    // Declare a state variable to store a number.
    // `public` makes it readable by anyone outside the contract.
    uint256 public storedNumber;

    // Function to store a number in the `storedNumber` state variable.
    // `_number` is the input parameter provided by the user.
    function storeNumber(uint256 _number) public {
        // Assign the provided number to the state variable `storedNumber`.
        storedNumber = _number;
    }

    // Function to retrieve the value of the `storedNumber` variable.
    // The `view` keyword indicates this function does not modify the contract's state.
    // It returns a `uint256` value, which is the type of the stored number.
    function getStoredNumber() public view returns (uint256) {
        // Return the value of `storedNumber`.
        return storedNumber;
    }
}
