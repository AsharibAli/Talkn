/* -----------------------------------------------------------------------------------------

    THSI FILE CONTAINS SOME HELPER FUNCTIONS USED IN DIFFERENT PLACED IN THE APP

----------------------------------------------------------------------------------------- */
import Axios from "axios";

// FORMATE DATE WITH HOURS AND MINUTES - [DD/MM/YYYY HH:MM]
export function formatDate(date) {
  return `${new Date(date).getDate()}/${
    new Date(date).getMonth() + 1
  }/${new Date(date).getFullYear()} ${new Date(date).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  )}`;
}

// FORMATE DATE IN A SIMPLE FORMATE [DD/MM/YYYY]
export function formatSimpleDate(date) {
  return `${new Date(date).getDate()}/${
    new Date(date).getMonth() + 1
  }/${new Date(date).getFullYear()}`;
}

// TRUNCATE LONG STRINGS ONLY FROM ONE SIDE
export function truncateStart(fullStr, strLen, separator) {
  if (fullStr.length <= strLen) return fullStr;
  separator = separator || "...";
  let charsToShow = strLen,
    frontChars = Math.ceil(charsToShow);

  return fullStr.substr(0, frontChars) + separator;
}

// TRUNCATE THE LONG STRINGS FROM THE MIDDLE
export function truncate(fullStr, strLen, separator) {
  if (fullStr.length <= strLen) return fullStr;

  separator = separator || "...";

  var sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  return (
    fullStr.substr(0, frontChars) +
    separator +
    fullStr.substr(fullStr.length - backChars)
  );
}

// NAVBAR FIXED TOP BEHAVIOR
export function fixNavbarToTop() {
  window.addEventListener("scroll", () => {
    const wScrollTop = window.pageYOffset;
    if (wScrollTop > 0) {
      document.querySelector(".navbar").classList.add("active");
    } else if (wScrollTop <= 0) {
      document.querySelector(".navbar").classList.remove("active");
    }
  });
}

// CALCULATE THE VIDEO DURATION IN HOURS/MINUTES/SECONDES
export function secondsToHms(durationInSeconds) {
  const hours = Math.floor(Number(durationInSeconds) / 3600);
  const minutes = Math.floor((Number(durationInSeconds) % 3600) / 60);
  const seconds = Math.ceil(Number(durationInSeconds) % 60);

  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");

  return `${hoursStr}:${minutesStr}:${secondsStr}`;
}

// REDIRECT USER TO BLOCK SCAN EXPLORER ACCORDING TO THE NETWORK HE/SHE CONNECTED TO
export function configEtherScanUrl(network, account) {
  let blockExplorerUrl;
  if (network === 3) {
    blockExplorerUrl = "https://ropsten.etherscan.io";
  } else if (network === 4) {
    blockExplorerUrl = "https://rinkeby.etherscan.io";
  } else if (network === 42) {
    blockExplorerUrl = "https://kovan.etherscan.io";
  } else if (network === 5) {
    blockExplorerUrl = "https://goerli.etherscan.io";
  } else if (network === 56) {
    blockExplorerUrl = "https://bscscan.com";
  } else if (network === 137) {
    blockExplorerUrl = "https://polygonscan.com";
  } else if (network === 97) {
    blockExplorerUrl = "https://testnet.bscscan.com";
  } else if (network === 44787) {
    blockExplorerUrl = "https://alfajores.celoscan.xyz/";
  } else if (network === 80001) {
    blockExplorerUrl = "https://mumbai.polygonscan.com";
  } else if (network === 365) {
    blockExplorerUrl = "https://testnet-explorer.thetatoken.org";
  } else {
    blockExplorerUrl = "https://etherscan.io";
  }

  return `${blockExplorerUrl}/address/${account}`;
}

export async function sendFormData(
  frm,
  endpoint,
  success,
  failing,
  startloading,
  stopLoading
) {
  startloading();
  try {
    await Axios.post(`https://formspree.io/f/${endpoint}`, new FormData(frm), {
      headers: {
        Accept: "application/json",
      },
    });
    success();
    stopLoading();
  } catch (error) {
    console.log(error);
    failing();
    stopLoading();
  }
}
