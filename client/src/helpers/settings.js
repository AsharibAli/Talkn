/* -----------------------------------------------------------------------------------------

    THIS FILE CONTAINS THE IMPORTANT WEB3/UI CONFIGURATIONS FOR THE APP

----------------------------------------------------------------------------------------- */
import React from "react";
import { FaFighterJet, FaSadTear } from "react-icons/fa";
import { RiHeart2Fill } from "react-icons/ri";
import { BiMoviePlay } from "react-icons/bi";
import { GiMadScientist } from "react-icons/gi";

export const appSettings = {
  /* APP MAIN LOGO */
  logo: "logo1.png",

  /* APP MAIN LOGO WIDTH */
  logoWidth: "135",

  /* APP BRAND NAME */
  brandName: "Talkn",

  /* APP BRAND DESCRIPTION */
  brandDescription: "Decentralized Videos Streaming App",

  /* APP AUTHOR */
  marketplaceAuthor: "Asharib Ali",

  /* COPYRIGHTS NAME */
  copyrightsBrand: "Asharib Ali",

  /* TEXT IDENTIFIER FOR THE NETWORK WHERE THE APP IS UP AND RUNNING */
  activeNetworkName: "BSC Test Network",

  /* COPYRIGHTS LINK */
  copyrightsLink: "https://www.asharib.xyz/",

  /* THE NETWORK RPC URL WHERE OUR CONTRACTS ARE DEPOLYED ON */
  rpcUrl: "https://data-seed-prebsc-2-s1.binance.org:8545",

  /* THE CHAIN ID of NETWORK WHERE OUR CONTRACTS ARE DEPOLYED ON */
  networkId: 97,

  /* THE BLOCK SCAN EXPLORER WHERE WE CAN TRACK THE TRANSACTIONS */
  blockExplorerUrls: "https://testnet.bscscan.com",

  /* THE CURRENT APP CURRENCY THAT OUR APP WILL APPEAR BESIDES EVERY PRICE */
  currency: "BNB",

  /* THE NATIVE CURRENCY THAT OUR APP WILL USE FOR GAS FEES */
  nativeCurrency: "tBNB",

  /* IPFS PROJECT ID */
  ipfsProjectId: process.env.IPFS_PROJECT_ID,

  /* IPFS PRJECT SECRET KEY */
  ipfsSecret: process.env.IPFS_SECRET,

  /* IPFS DEDICATED GATEWAY NAME */
  IPFSGatewaySubdomain: "talkn",

  /* ENDPOINT FOR ASK FOR A FEATURE FORM */
  requestFeatureFormId: "mrgvzdyy",

  /* GENERS LIST */
  genresOptions: [
    {
      label: "General",
      value: "General",
      icon: <BiMoviePlay size="3.5rem" className="text-primary" />,
    },
    {
      label: "Adventure",
      value: "Adventure",
      icon: <BiMoviePlay size="3.5rem" className="text-primary" />,
    },
    {
      label: "Animation",
      value: "Animation",
      icon: <BiMoviePlay size="3.5rem" className="text-primary" />,
    },
    {
      label: "Comedy",
      value: "Comedy",
      icon: <BiMoviePlay size="3.5rem" className="text-primary" />,
    },
    {
      label: "Horror",
      value: "Horror",
      icon: <BiMoviePlay size="3.5rem" className="text-primary" />,
    },
    {
      label: "Western",
      value: "Western",
      icon: <BiMoviePlay size="3.5rem" className="text-primary" />,
    },
    {
      label: "War",
      value: "War",
      icon: <BiMoviePlay size="3.5rem" className="text-primary" />,
    },
    {
      label: "Game shows",
      value: "Game shows",
      icon: <BiMoviePlay size="3.5rem" className="text-primary" />,
    },
    {
      label: "Thriller",
      value: "Thriller",
      icon: <BiMoviePlay size="3.5rem" className="text-primary" />,
    },
    {
      label: "Documentary",
      value: "Documentary",
      icon: <BiMoviePlay size="3.5rem" className="text-primary" />,
    },
    {
      label: "Action",
      value: "Action",
      icon: <FaFighterJet size="3.5rem" className="text-primary" />,
    },
    {
      label: "Romance",
      value: "Romance",
      icon: <RiHeart2Fill size="3.5rem" className="text-primary" />,
    },
    {
      label: "Sci-Fi",
      value: "Sci-Fi",
      icon: <GiMadScientist size="3.5rem" className="text-primary" />,
    },
    {
      label: "Drama",
      value: "Drama",
      icon: <FaSadTear size="3.5rem" className="text-primary" />,
    },
  ],

  /* CHANNEL CATEGORIES LIST */
  channelCategories: [
    {
      label: "Entertainment",
      value: "Entertainment",
      icon: <BiMoviePlay size="3.5rem" className="text-primary" />,
    },
    {
      label: "Educational",
      value: "Educational",
      icon: <BiMoviePlay size="3.5rem" className="text-primary" />,
    },
    {
      label: "Lifestyle",
      value: "Lifestyle",
      icon: <BiMoviePlay size="3.5rem" className="text-primary" />,
    },
    {
      label: "Gaming",
      value: "Gaming",
      icon: <BiMoviePlay size="3.5rem" className="text-primary" />,
    },
    {
      label: "Sports",
      value: "Sports",
      icon: <BiMoviePlay size="3.5rem" className="text-primary" />,
    },
    {
      label: "Vlogs",
      value: "Vlogs",
      icon: <BiMoviePlay size="3.5rem" className="text-primary" />,
    },
    {
      label: "Business",
      value: "Business",
      icon: <BiMoviePlay size="3.5rem" className="text-primary" />,
    },
    {
      label: "Science",
      value: "Science",
      icon: <BiMoviePlay size="3.5rem" className="text-primary" />,
    },
    {
      label: "Art",
      value: "Art",
      icon: <FaFighterJet size="3.5rem" className="text-primary" />,
    },
    {
      label: "News",
      value: "News",
      icon: <GiMadScientist size="3.5rem" className="text-primary" />,
    },
  ],
};
