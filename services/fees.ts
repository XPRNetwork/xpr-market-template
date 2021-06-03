import proton from '../services/proton-rpc';
import {
  PRICE_OF_RAM_IN_XPR,
  SHORTENED_TOKEN_PRECISION,
} from '../utils/constants';

export type ListingFee = {
  display: string;
  raw: number;
};

export type MintFee = {
  specialMintFee: ListingFee;
  accountRamFee: ListingFee;
  userSpecialMintContractRam: number;
  userAccountRam: number;
  totalFee: string;
};

class Fees {
  conversionRate: number;
  currentAccountRam: number;
  specialMintContractRam: number;

  constructor() {}

  refreshRamInfoForUser = async (actor) => {
    const { max, used } = await proton.getAccountRam(actor);
    this.conversionRate = await proton.getXPRtoXUSDCConversionRate();
    this.currentAccountRam = max - used;
    this.specialMintContractRam = await proton.getSpecialMintContractRam(actor);
  };

  parseDisplayRawFee = (
    requiredRam: number,
    conversionRate: number
  ): ListingFee => {
    const calculatedFee = PRICE_OF_RAM_IN_XPR * requiredRam * conversionRate;
    const fee = isNaN(calculatedFee) ? 0 : Math.ceil(calculatedFee * 100) / 100;
    return {
      display: fee.toFixed(SHORTENED_TOKEN_PRECISION).toString(),
      raw: fee,
    };
  };

  calculateFee = ({
    numAssets,
    actor,
    ramCost,
  }: {
    numAssets: number;
    actor: string;
    ramCost: number;
  }): ListingFee => {
    if (actor && Number(numAssets) > 0) {
      const requiredRam = numAssets * ramCost - this.currentAccountRam;
      if (requiredRam > 0) {
        return this.parseDisplayRawFee(requiredRam, this.conversionRate);
      }
    }
    return {
      display: Number('0').toFixed(SHORTENED_TOKEN_PRECISION).toString(),
      raw: 0,
    };
  };
}

const fees = new Fees();
export default fees;
