import { ConnectWallet } from '@proton/web-sdk';
import { LinkSession, Link } from '@proton/link';
import proton from './proton-rpc';
import logoUrl from '../public/logo.png';

export interface User {
  actor: string;
  avatar: string;
  name: string;
  isLightKYCVerified: boolean;
  permission: string;
}

interface TransferOptions {
  sender: string;
  recipient: string;
  asset_id: string;
  memo?: string;
}

interface BurnOptions {
  owner: string;
  asset_id: string;
}

interface UpdateCollectionOptions {
  author: string;
  collection_name: string;
  description: string;
  display_name: string;
  image: string;
  market_fee: string;
}

interface SetMarketFeeOptions {
  author: string;
  collection_name: string;
  market_fee: string;
}

interface PurchaseSaleOptions {
  buyer: string;
  amount: string;
  sale_id: string;
}

interface DepositWithdrawOptions {
  actor: string;
  amount: string;
}

interface Response {
  success: boolean;
  transactionId?: string;
  error?: string;
}

interface WalletResponse {
  user: User;
  error: string;
}

interface Action {
  account: string;
  name: string;
  authorization: Array<{
    actor: string;
    permission: string;
  }>;
  data: unknown;
}

class ProtonSDK {
  appName: string;
  requestAccount: string;
  session: LinkSession | null;
  link: Link | null;

  constructor() {
    this.appName = 'Market';
    this.requestAccount = 'nftmarket';
    this.session = null;
    this.link = null;
  }

  connect = async ({ restoreSession }): Promise<void> => {
    const { link, session } = await ConnectWallet({
      linkOptions: {
        rpc: proton.rpc,
        restoreSession,
      },
      transportOptions: {
        requestAccount: this.requestAccount,
        backButton: true,
      },
      selectorOptions: {
        appName: this.appName,
        appLogo: logoUrl as string,
      },
    });
    this.link = link;
    this.session = session;
  };

  login = async (): Promise<WalletResponse> => {
    try {
      await this.connect({ restoreSession: false });
      if (!this.session || !this.session.auth || !this.session.accountData) {
        throw new Error('An error has occurred while logging in');
      }
      const { auth, accountData } = this.session;
      const { avatar, isLightKYCVerified, name } = accountData[0];
      const chainAccountAvatar = avatar
        ? `data:image/jpeg;base64,${avatar}`
        : '/default-avatar.png';

      return {
        user: {
          actor: auth.actor,
          avatar: chainAccountAvatar,
          isLightKYCVerified,
          name,
          permission: auth.permission,
        },
        error: '',
      };
    } catch (e) {
      return {
        user: null,
        error: e.message || 'An error has occurred while logging in',
      };
    }
  };

  logout = async () => {
    await this.link.removeSession(this.requestAccount, this.session.auth);
  };

  restoreSession = async () => {
    try {
      await this.connect({ restoreSession: true });
      if (!this.session || !this.session.auth || !this.session.accountData) {
        throw new Error('An error has occurred while restoring a session');
      }

      const { auth, accountData } = this.session;
      const { avatar, isLightKYCVerified, name } = accountData[0];
      const chainAccountAvatar = avatar
        ? `data:image/jpeg;base64,${avatar}`
        : '/default-avatar.png';

      return {
        user: {
          actor: auth.actor,
          avatar: chainAccountAvatar,
          isLightKYCVerified,
          name,
          permission: auth.permission,
        },
        error: '',
      };
    } catch (e) {
      return {
        user: null,
        error: e.message || 'An error has occurred while restoring a session',
      };
    }
  };

  /**
   * Transfer an asset to another user
   *
   * @param {string}   sender       Chain account of the asset's current owner.
   * @param {string}   recipient    Chain account of recipient of asset to transfer
   * @param {string}   asset_id     ID of the asset being transferred
   * @param {string}   memo         Message to send with transfer
   * @return {Response}             Returns an object indicating the success of the transaction and transaction ID.
   */

  transfer = async ({
    sender,
    recipient,
    asset_id,
    memo,
  }: TransferOptions): Promise<Response> => {
    const action = [
      {
        account: 'atomicassets',
        name: 'transfer',
        authorization: [
          {
            actor: sender,
            permission: 'active',
          },
        ],
        data: {
          from: sender,
          to: recipient,
          asset_ids: [asset_id],
          memo: memo || '',
        },
      },
    ];
    try {
      if (!this.session) {
        throw new Error('Must be logged in to transfer an asset');
      }

      const result = await this.session.transact(
        { actions: action },
        { broadcast: true }
      );

      return {
        success: true,
        transactionId: result.processed.id,
      };
    } catch (e) {
      return {
        success: false,
        error:
          e.message ||
          'An error has occured while attempting to transfer the asset',
      };
    }
  };

  /**
   * Burn an asset (deletes the asset permanently). If there previously were core tokens backed for this asset, these core tokens are transferred to owner.
   *
   * @param {string}   owner         Chain account of the asset's current owner.
   * @param {string}   asset_id     ID of the asset being transferred
   * @return {Response}             Returns an object indicating the success of the transaction and transaction ID.
   */

  burn = async ({ owner, asset_id }: BurnOptions): Promise<Response> => {
    const action = [
      {
        account: 'atomicassets',
        name: 'burnasset',
        authorization: [
          {
            actor: owner,
            permission: 'active',
          },
        ],
        data: {
          asset_owner: owner,
          asset_id,
        },
      },
    ];
    try {
      if (!this.session) {
        throw new Error('Must be logged in to burn an asset');
      }

      const result = await this.session.transact(
        { actions: action },
        { broadcast: true }
      );

      return {
        success: true,
        transactionId: result.processed.id,
      };
    } catch (e) {
      return {
        success: false,
        error:
          e.message ||
          'An error has occurred while attempting to burn the asset',
      };
    }
  };

  /**
   * Withdraw tokens from the marketplace back into user's account
   *
   * @param {string}   actor                chainAccount of user
   * @param {string}   amount               amount of tokens to withdraw (i.e 1.000000 XUSDC)
   * @return {Response}      Returns an object indicating the success of the transaction and transaction ID.
   */

  withdraw = async ({
    actor,
    amount,
  }: DepositWithdrawOptions): Promise<Response> => {
    const action = [
      {
        account: 'atomicmarket',
        name: 'withdraw',
        authorization: [
          {
            actor: actor,
            permission: 'active',
          },
        ],
        data: {
          owner: actor,
          token_to_withdraw: amount,
        },
      },
    ];
    try {
      if (!this.session) {
        throw new Error('Must be logged in to withdraw from the market');
      }

      const result = await this.session.transact(
        { actions: action },
        { broadcast: true }
      );

      return {
        success: true,
        transactionId: result.processed.id,
      };
    } catch (e) {
      return {
        success: false,
        error:
          e.message ||
          'An error has occured while attempting to withdraw from the market',
      };
    }
  };

  /**
   * Generate transaction actions for purchasing ram in order to list assets for sale
   *
   * @param {number}     seller       Chain account of the asset's owner.
   * @param {number}     listing_fee  Cost of ram to list a number of assets for sale.
   * @return {Action}                 Returns an array of conditional ram actions.
   */

  generateSaleRamActions = ({
    listing_fee,
    seller,
  }: {
    listing_fee: number;
    seller: string;
  }): Action[] => {
    return listing_fee === 0
      ? []
      : [
          {
            account: 'xtokens',
            name: 'transfer',
            authorization: [
              {
                actor: seller,
                permission: 'active',
              },
            ],
            data: {
              from: seller,
              to: 'specialmint',
              quantity: `${listing_fee.toFixed(6)} XUSDC`,
              memo: 'account',
            },
          },
        ];
  };

  /**
   * Create a collection, a schema, a template, and mint initial assets on Atomic Assets.
   *
   * @param {string}     author                   Chain account of the collection's author.
   * @param {string}     collection_name          Name of the collection on the blockchain.
   * @param {string}     collection_description   Short description of the collection.
   * @param {string}     collection_display_name  Display name of the collection.
   * @param {string}     collection_image         IPFS CID (image hash generated on IPFS).
   * @param {string}     collection_market_fee    Royalty amount owner receives for each asset transaction within the collection.
   * @param {string}     template_name            Name of the template to create.
   * @param {string}     template_image           IPFS CID (image hash generated on IPFS).
   * @param {string}     template_description     Description of the template.
   * @param {string}     max_supply               Maximum amount of child assets that this template can mint (0 if there should not be a maximum).
   * @param {string}     initial_mint_amount      Initial amount of assets to mint.
   * @return {Response}                           Returns an object indicating the success of the transaction and transaction ID.
   */

  /**
   * Update a collection's data (mutable properties: description, display name, image, and royalty amount).
   *
   * @param {string}   author             Chain account of the collection's author.
   * @param {string}   collection_name    Name of the collection to update.
   * @param {string}   description        Collection's new description.
   * @param {string}   display_name       Collection's new display name.
   * @param {string}   image              Collection's new image.
   * @param {string}   market_fee         Royalty amount owner receives for each asset transaction within the collection.
   * @return {Response}                   Returns an object indicating the success of the transaction and transaction ID.
   */

  updateCollection = async ({
    author,
    collection_name,
    description,
    display_name,
    image,
    market_fee,
  }: UpdateCollectionOptions): Promise<Response> => {
    const actions: Action[] = [
      {
        account: 'atomicassets',
        name: 'setcoldata',
        authorization: [
          {
            actor: author,
            permission: 'active',
          },
        ],
        data: {
          author,
          collection_name,
          data: [
            {
              key: 'description',
              value: ['string', description],
            },
            {
              key: 'name',
              value: ['string', display_name],
            },
            {
              key: 'img',
              value: ['string', image || ''],
            },
          ],
        },
      },
    ];

    if (market_fee) {
      actions.push({
        account: 'atomicassets',
        name: 'setmarketfee',
        authorization: [
          {
            actor: author,
            permission: 'active',
          },
        ],
        data: {
          author,
          collection_name,
          market_fee,
        },
      });
    }

    try {
      if (!this.session) {
        throw new Error('Unable to update a collection without logging in.');
      }
      const result = await this.session.transact(
        { actions: actions },
        { broadcast: true }
      );
      return {
        success: true,
        transactionId: result.processed.id,
      };
    } catch (e) {
      return {
        success: false,
        error:
          e.message || 'An error has occurred while updating the collection.',
      };
    }
  };

  /**
   * Set a collection's market fee on Atomic Assets.
   *
   * @param {string}   author             Chain account of the collection's author.
   * @param {string}   collection_name    Name of the collection to update.
   * @param {string}   market_fee         Royalty amount owner receives for each asset transaction within the collection.
   * @return {Response}                   Returns an object indicating the success of the transaction and transaction ID.
   */
  setMarketFee = async ({
    author,
    collection_name,
    market_fee,
  }: SetMarketFeeOptions): Promise<Response> => {
    const actions = [
      {
        account: 'atomicassets',
        name: 'setmarketfee',
        authorization: [
          {
            actor: author,
            permission: 'active',
          },
        ],
        data: {
          author,
          collection_name,
          market_fee,
        },
      },
    ];
    try {
      if (!this.session) {
        throw new Error('Unable to set a market fee without logging in.');
      }
      const result = await this.session.transact(
        { actions: actions },
        { broadcast: true }
      );
      return {
        success: true,
        transactionId: result.processed.id,
      };
    } catch (e) {
      return {
        success: false,
        error:
          e.message || 'An error has occurred while setting the market fee.',
      };
    }
  };

  /**
   * Purchase a specific asset for sale.
   *
   * @param {string}   buyer          Buyer of the asset for sale.
   * @param {string[]} amount         Amount to buy the asset for sale.
   * @param {string[]} sale_id        ID of the specific asset sale.
   * @return {Response}               Returns an object indicating the success of the transaction and transaction ID.
   */

  purchaseSale = async ({
    buyer,
    amount,
    sale_id,
  }: PurchaseSaleOptions): Promise<Response> => {
    const actions = [
      {
        account: 'xtokens',
        name: 'transfer',
        authorization: [
          {
            actor: buyer,
            permission: 'active',
          },
        ],
        data: {
          from: buyer,
          to: 'atomicmarket',
          quantity: amount,
          memo: 'deposit',
        },
      },
      {
        account: 'atomicmarket',
        name: 'purchasesale',
        authorization: [
          {
            actor: buyer,
            permission: 'active',
          },
        ],
        data: {
          sale_id,
          buyer,
          intended_delphi_median: 0,
          taker_marketplace: 'fees.market',
        },
      },
    ];
    try {
      if (!this.session) {
        throw new Error('Unable to purchase a sale without logging in.');
      }

      const result = await this.session.transact(
        { actions: actions },
        { broadcast: true }
      );

      return {
        success: true,
        transactionId: result.processed.id,
      };
    } catch (e) {
      const message = e.message[0].toUpperCase() + e.message.slice(1);
      return {
        success: false,
        error:
          message || 'An error has occurred while trying to purchase an item.',
      };
    }
  };
}

export default new ProtonSDK();
