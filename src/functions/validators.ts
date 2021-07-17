import React from 'react'

const validators = {
  checkUserLength: (usernameInput: string, callback?: React.Dispatch<React.SetStateAction<boolean>>) : void | boolean => {
    if (usernameInput.length >= 10 && usernameInput.length <= 50) {
      if (!callback) {
        return true;
      } else {
        callback(true);
      }
    } else {
      if (!callback) {
        return false;
      } else {
        callback(false);
      }
    }
  },
  checkPassLength: (passInput: string, callback?: React.Dispatch<React.SetStateAction<boolean>>): void | boolean => {
    if (passInput.length >= 20 && passInput.length <= 50) {
      if (!callback) {
        return true;
      } else {
        callback(true);
      }
    } else {
      if (!callback) {
        return false;
      } else {
        callback(false);
      }
    }
  },
  checkForSymbol: (char: string, callback?: React.Dispatch<React.SetStateAction<boolean>>): void | boolean => {
    if (["!", "@", "#", "$", "%"].includes(char)) {
      if (!callback) {
        return true;
      } else {
        callback(true);
      }
    }
  },
  checkForLetter: (char: string, callback?: React.Dispatch<React.SetStateAction<boolean>>): void | boolean => {
    if (char.toLowerCase() != char.toUpperCase()) {
      if (!callback) {
        return true;
      } else {
        callback(true);
      }
    }
  },
  checkForNumber: (char: string, callback?: React.Dispatch<React.SetStateAction<boolean>>): void | boolean => {
    if (!isNaN(parseFloat(char)) && isFinite(Number(char))) {
      if (!callback) {
        return true;
      } else {
        callback(true);
      }
    }
  },
}

export default validators;