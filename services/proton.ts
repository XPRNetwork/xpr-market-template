import { ConnectWallet } from '@proton/web-sdk';
import { LinkSession, Link } from '@proton/link';
import logoUrl from '../public/logo.svg';
import proton from './proton-rpc';
import { DEFAULT_SCHEMA, TOKEN_PRECISION } from '../utils/constants';
import fees, { MintFee } from '../services/fees';

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

interface CreateNftOptions {
  mintFee: MintFee;
  author: string;
  collection_name?: string;
  collection_description: string;
  collection_display_name: string;
  collection_image?: string;
  collection_market_fee?: string;
  template_name: string;
  template_image?: string;
  template_video?: string;
  template_description: string;
  max_supply: number;
  initial_mint_amount: number;
}

interface CreateTemplateAssetsOptions {
  mintFee: MintFee;
  author: string;
  collection_name: string;
  template_name: string;
  template_image?: string;
  template_video?: string;
  template_description: string;
  max_supply: number;
  initial_mint_amount: number;
}

interface MintAssetsOptions {
  author: string;
  collection_name: string;
  template_id: string;
  mint_amount: number;
  mint_fee: number;
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

interface CreateSaleOptions {
  seller: string;
  asset_id: string;
  price: string;
  currency: string;
  listing_fee: number;
}

interface CreateMultipleSalesOptions
  extends Omit<CreateSaleOptions, 'asset_id'> {
  assetIds: string[];
}

interface PurchaseSaleOptions {
  buyer: string;
  amount: string;
  sale_id: string;
}

interface SaleOptions {
  actor: string;
  sale_id: string;
}

interface CancelMultipleSalesOptions {
  actor: string;
  saleIds: string[];
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

interface GenerateRamActions {
  author: string;
  mintFee: MintFee;
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
    this.appName = 'Proton Market';
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

      await fees.refreshRamInfoForUser(owner);

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
   * Generate transaction actions for initializing a user's storage in the
   * specialmint contract, purchasing account ram, and purchasing specialmint
   * contract ram for special minting assets.
   *
   * @param {string}     author                           Chain account of the collection's author.
   * @param {number}     requiredAccountRam               Amount of ram in order to create a collection, a schema, and a template.
   * @param {number}     requiredSpecialMintContractRam   Amount of ram required to special mint a certain number of assets.
   * @return {Action}                                     Returns an array of conditional ram actions.
   */

  generateRamActions = async ({
    author,
    mintFee,
  }: GenerateRamActions): Promise<Action[]> => {
    const hasInitializedStorage = mintFee.userSpecialMintContractRam !== -1;
    const hasEnoughAccountRam = mintFee.accountRamFee.raw === 0;
    const hasEnoughContractRam = mintFee.specialMintFee.raw === 0;

    return [
      hasInitializedStorage
        ? undefined
        : {
            account: 'specialmint',
            name: 'initstorage',
            authorization: [
              {
                actor: author,
                permission: 'active',
              },
            ],
            data: {
              account: author,
            },
          },
      hasEnoughAccountRam
        ? undefined
        : {
            account: 'xtokens',
            name: 'transfer',
            authorization: [
              {
                actor: author,
                permission: 'active',
              },
            ],
            data: {
              from: author,
              to: 'specialmint',
              quantity: `${mintFee.accountRamFee.raw.toFixed(6)} XUSDC`,
              memo: 'account',
            },
          },
      hasEnoughContractRam
        ? undefined
        : {
            account: 'xtokens',
            name: 'transfer',
            authorization: [
              {
                actor: author,
                permission: 'active',
              },
            ],
            data: {
              from: author,
              to: 'specialmint',
              quantity: `${mintFee.specialMintFee.raw.toFixed(6)} XUSDC`,
              memo: 'contract',
            },
          },
    ].filter((action) => action !== undefined);
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

  createNft = async ({
    mintFee,
    author,
    collection_name,
    collection_description,
    collection_display_name,
    collection_image,
    collection_market_fee,
    template_name,
    template_image,
    template_video,
    template_description,
    max_supply,
    initial_mint_amount,
  }: CreateNftOptions): Promise<Response> => {
    const collection_name_or_author = collection_name || author;

    const ramActions = await this.generateRamActions({
      author,
      mintFee,
    });

    const default_template = {
      series: '1',
      name: template_name,
      desc: template_description,
      video: template_video || '',
      image: template_image || '',
    };

    const schema_format = Object.entries(DEFAULT_SCHEMA).map(([key, type]) => ({
      name: key,
      type,
    }));

    const immutable_data = Object.entries(DEFAULT_SCHEMA).map(
      ([key, type]) => ({
        key,
        value: [type, default_template[key] || ''],
      })
    );

    const actions = [
      {
        account: 'atomicassets',
        name: 'createcol',
        authorization: [
          {
            actor: author,
            permission: 'active',
          },
        ],
        data: {
          author,
          collection_name: collection_name_or_author,
          allow_notify: true,
          authorized_accounts: [author, 'specialmint'],
          notify_accounts: [],
          market_fee: collection_market_fee || '0.000000',
          data: [
            {
              key: 'description',
              value: ['string', collection_description],
            },
            {
              key: 'name',
              value: ['string', collection_display_name],
            },
            {
              key: 'img',
              value: ['string', collection_image || ''],
            },
          ],
        },
      },
      {
        account: 'atomicassets',
        name: 'createschema',
        authorization: [
          {
            actor: author,
            permission: 'active',
          },
        ],
        data: {
          authorized_creator: author,
          collection_name: collection_name,
          schema_name: collection_name,
          schema_format,
        },
      },
      {
        account: 'atomicassets',
        name: 'createtempl',
        authorization: [
          {
            actor: author,
            permission: 'active',
          },
        ],
        data: {
          authorized_creator: author,
          collection_name: collection_name,
          schema_name: collection_name,
          transferable: true,
          burnable: true,
          max_supply,
          immutable_data,
        },
      },
      {
        account: 'specialmint',
        name: 'mintlasttemp',
        authorization: [
          {
            actor: author,
            permission: 'active',
          },
        ],
        data: {
          count: initial_mint_amount,
          creator: author,
          collection_name: collection_name_or_author,
          schema_name: collection_name_or_author,
          new_asset_owner: author,
          immutable_data: [],
          mutable_data: [],
        },
      },
      {
        account: 'atomicassets',
        name: 'remcolauth',
        authorization: [
          {
            actor: author,
            permission: 'active',
          },
        ],
        data: {
          collection_name: collection_name_or_author,
          account_to_remove: 'specialmint',
        },
      },
    ];

    try {
      if (!this.session) {
        throw new Error(
          'Unable to create and mint a collection, schema, template, and assets without logging in.'
        );
      }

      const result = await this.session.transact(
        {
          actions: [...ramActions, ...actions],
        },
        { broadcast: true }
      );

      await fees.refreshRamInfoForUser(author);

      return {
        success: true,
        transactionId: result.processed.id,
      };
    } catch (e) {
      return {
        success: false,
        error:
          e.message ||
          'An error has occurred while creating and minting the collection, schema, template, and assets.',
      };
    }
  };

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
   * Create a schema, create a template, and mint assets on Atomic Assets.
   *
   * @param {string}   author               Chain account of the collection's author.
   * @param {string}   collection_name      Name of the collection on the blockchain.
   * @param {string}   template_name        Name of the template to create.
   * @param {string}   template_image       IPFS CID (image hash generated on IPFS).
   * @param {string}   template_description Description of the template.
   * @param {string}   max_supply           Maximum amount of child assets that this template can mint (0 if there should not be a maximum.
   * @param {string}   initial_mint_amount  Initial amount of assets to mint.
   * @return {Response}                     Returns an object indicating the success of the transaction and transaction ID.
   */

  createTemplateAssets = async ({
    mintFee,
    author,
    collection_name,
    template_name,
    template_image,
    template_video,
    template_description,
    max_supply,
    initial_mint_amount,
  }: CreateTemplateAssetsOptions): Promise<Response> => {
    const ramActions = await this.generateRamActions({
      author,
      mintFee,
    });

    const default_template = {
      series: '1',
      name: template_name,
      desc: template_description,
      video: template_video || '',
      image: template_image || '',
    };

    const immutable_data = Object.entries(DEFAULT_SCHEMA).map(
      ([key, type]) => ({
        key,
        value: [type, default_template[key] || ''],
      })
    );

    const actions = [
      {
        account: 'atomicassets',
        name: 'addcolauth',
        authorization: [
          {
            actor: author,
            permission: 'active',
          },
        ],
        data: {
          collection_name,
          account_to_add: 'specialmint',
        },
      },
      {
        account: 'atomicassets',
        name: 'createtempl',
        authorization: [
          {
            actor: author,
            permission: 'active',
          },
        ],
        data: {
          authorized_creator: author,
          collection_name: collection_name,
          schema_name: collection_name,
          transferable: true,
          burnable: true,
          max_supply,
          immutable_data,
        },
      },
      {
        account: 'specialmint',
        name: 'mintlasttemp',
        authorization: [
          {
            actor: author,
            permission: 'active',
          },
        ],
        data: {
          count: initial_mint_amount,
          creator: author,
          collection_name: collection_name,
          schema_name: collection_name,
          new_asset_owner: author,
          immutable_data: [],
          mutable_data: [],
        },
      },
      {
        account: 'atomicassets',
        name: 'remcolauth',
        authorization: [
          {
            actor: author,
            permission: 'active',
          },
        ],
        data: {
          collection_name: collection_name,
          account_to_remove: 'specialmint',
        },
      },
    ];

    try {
      if (!this.session) {
        throw new Error(
          'Unable to create a template and mint assets without logging in.'
        );
      }
      const result = await this.session.transact(
        { actions: [...ramActions, ...actions] },
        { broadcast: true }
      );

      await fees.refreshRamInfoForUser(author);

      return {
        success: true,
        transactionId: result.processed.id,
      };
    } catch (e) {
      return {
        success: false,
        error:
          e.message ||
          'An error has occurred while creating the template and minting assets.',
      };
    }
  };

  /**
   * Mint template assets on Atomic Assets.
   *
   * @param {string}   author               Chain account of the collection's author.
   * @param {string}   collection_name      Name of the collection on the blockchain.
   * @param {string}   template_id          ID of the asset's template type.
   * @param {number}   mint_amount          Number of assets to mint.
   * @return {Response}                     Returns an object indicating the success of the transaction and transaction ID.
   */

  mintAssets = async ({
    author,
    collection_name,
    template_id,
    mint_amount,
    mint_fee,
  }: MintAssetsOptions): Promise<Response> => {
    const generateMintAssetAction = (): Action => ({
      account: 'atomicassets',
      name: 'mintasset',
      authorization: [
        {
          actor: author,
          permission: 'active',
        },
      ],
      data: {
        authorized_minter: author,
        collection_name: collection_name,
        schema_name: collection_name,
        template_id,
        new_asset_owner: author,
        immutable_data: [],
        mutable_data: [],
        tokens_to_back: [],
      },
    });

    const actions = Array.from({ length: mint_amount }, () =>
      generateMintAssetAction()
    );

    if (mint_fee > 0) {
      actions.unshift({
        account: 'xtokens',
        name: 'transfer',
        authorization: [
          {
            actor: author,
            permission: 'active',
          },
        ],
        data: {
          from: author,
          to: 'specialmint',
          quantity: `${mint_fee.toFixed(6)} XUSDC`,
          memo: 'account',
        },
      });
    }

    try {
      if (!this.session) {
        throw new Error('Unable to mint assets without logging in.');
      }
      const result = await this.session.transact(
        { actions },
        { broadcast: true }
      );

      await fees.refreshRamInfoForUser(author);

      return {
        success: true,
        transactionId: result.processed.id,
      };
    } catch (e) {
      return {
        success: false,
        error: e.message || 'An error has occurred while minting the assets.',
      };
    }
  };

  /**
   * Announce an asset sale and create an initial offer for the asset on atomic market.
   *
   * @param {string}   seller       Chain account of the asset's current owner.
   * @param {string}   asset_id     ID of the asset to sell.
   * @param {string}   price        Listing price of the sale (i.e. '1.000000').
   * @param {string}   currency     Token precision (number of decimal points) and token symbol that the sale will be paid in (i.e. '6,XUSDC').
   * @param {string}   listing_fee  Ram payment when a user does not have enough ram to transact.
   * @return {Response}             Returns an object indicating the success of the transaction and transaction ID.
   */

  createSale = async ({
    seller,
    asset_id,
    price,
    currency,
    listing_fee,
  }: CreateSaleOptions): Promise<Response> => {
    const ramActions = this.generateSaleRamActions({
      listing_fee,
      seller,
    });

    const actions = [
      ...ramActions,
      {
        account: 'atomicmarket',
        name: 'announcesale',
        authorization: [
          {
            actor: seller,
            permission: 'active',
          },
        ],
        data: {
          seller,
          asset_ids: [asset_id],
          maker_marketplace: 'fees.market',
          listing_price: price,
          settlement_symbol: currency,
        },
      },
      {
        account: 'atomicassets',
        name: 'createoffer',
        authorization: [
          {
            actor: seller,
            permission: 'active',
          },
        ],
        data: {
          sender: seller,
          recipient: 'atomicmarket',
          sender_asset_ids: [asset_id],
          recipient_asset_ids: [],
          memo: 'sale',
        },
      },
    ];

    try {
      if (!this.session) {
        throw new Error('Unable to create a sale offer without logging in.');
      }

      const result = await this.session.transact(
        { actions: actions },
        { broadcast: true }
      );

      await fees.refreshRamInfoForUser(seller);

      return {
        success: true,
        transactionId: result.processed.id,
      };
    } catch (e) {
      return {
        success: false,
        error:
          e.message || 'An error has occurred while creating the sale offer.',
      };
    }
  };

  /**
   * Announce multiple asset sales and create initial offers for the assets on atomic market.
   *
   * @param {string}   seller       Chain account of the asset's current owner.
   * @param {string[]} assetIds     Array of IDs for the assets to sell.
   * @param {string}   price        Listing price of the sale (i.e. '1.000000').
   * @param {string}   currency     Token precision (number of decimal points) and token symbol that the sale will be paid in (i.e. '6,XUSDC').
   * @param {string}   listing_fee  Ram payment when a user does not have enough ram to transact.
   * @param {string}   collection   Collection name of the asset to sell.
   * @return {Response}             Returns an object indicating the success of the transaction and transaction ID.
   */

  createMultipleSales = async ({
    seller,
    assetIds,
    price,
    currency,
    listing_fee,
  }: CreateMultipleSalesOptions): Promise<Response> => {
    const ramActions = this.generateSaleRamActions({
      listing_fee,
      seller,
    });

    const announceSaleActions = assetIds.map((asset_id) => ({
      account: 'atomicmarket',
      name: 'announcesale',
      authorization: [
        {
          actor: seller,
          permission: 'active',
        },
      ],
      data: {
        seller,
        asset_ids: [asset_id],
        maker_marketplace: 'fees.market',
        listing_price: price,
        settlement_symbol: currency,
      },
    }));

    const createOfferActions = assetIds.map((asset_id) => ({
      account: 'atomicassets',
      name: 'createoffer',
      authorization: [
        {
          actor: seller,
          permission: 'active',
        },
      ],
      data: {
        sender: seller,
        recipient: 'atomicmarket',
        sender_asset_ids: [asset_id],
        recipient_asset_ids: [],
        memo: 'sale',
      },
    }));

    const actions = [
      ...ramActions,
      ...announceSaleActions,
      ...createOfferActions,
    ];

    try {
      if (!this.session) {
        throw new Error('Unable to create a sale offer without logging in.');
      }

      const result = await this.session.transact(
        { actions: actions },
        { broadcast: true }
      );

      await fees.refreshRamInfoForUser(seller);

      return {
        success: true,
        transactionId: result.processed.id,
      };
    } catch (e) {
      return {
        success: false,
        error:
          e.message || 'An error has occurred while creating the sale offer.',
      };
    }
  };

  /**
   * Cancel the announcement of an asset sale and its initial offer on atomic market.
   *
   * @param {string}   actor     Chain account of the asset's current owner.
   * @param {string}   sale_id   ID of the sale to cancel.
   * @return {Response}      Returns an object indicating the success of the transaction and transaction ID.
   */

  cancelSale = async ({ actor, sale_id }: SaleOptions): Promise<Response> => {
    const actions = [
      {
        account: 'atomicmarket',
        name: 'cancelsale',
        authorization: [
          {
            actor,
            permission: 'active',
          },
        ],
        data: {
          sale_id,
        },
      },
    ];

    try {
      if (!this.session) {
        throw new Error('Unable to cancel a sale without logging in.');
      }

      const result = await this.session.transact(
        { actions: actions },
        { broadcast: true }
      );

      await fees.refreshRamInfoForUser(actor);

      return {
        success: true,
        transactionId: result.processed.id,
      };
    } catch (e) {
      return {
        success: false,
        error: e.message || 'An error has occurred while cancelling the sale.',
      };
    }
  };

  /**
   * Cancel the announcements of several asset sales and their initial offers on atomic market.
   *
   * @param {string}   actor      Chain account of the asset's current owner.
   * @param {string[]} saleIds    Array of IDs for the sales to cancel.
   * @return {Response}       Returns an object indicating the success of the transaction and transaction ID.
   */

  cancelMultipleSales = async ({
    actor,
    saleIds,
  }: CancelMultipleSalesOptions): Promise<Response> => {
    const actions = saleIds.map((sale_id) => ({
      account: 'atomicmarket',
      name: 'cancelsale',
      authorization: [
        {
          actor,
          permission: 'active',
        },
      ],
      data: {
        sale_id,
      },
    }));

    try {
      if (!this.session) {
        throw new Error('Unable to cancel a sale without logging in.');
      }

      const result = await this.session.transact(
        { actions: actions },
        { broadcast: true }
      );

      await fees.refreshRamInfoForUser(actor);

      return {
        success: true,
        transactionId: result.processed.id,
      };
    } catch (e) {
      return {
        success: false,
        error: e.message || 'An error has occurred while cancelling the sale.',
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

      await fees.refreshRamInfoForUser(buyer);

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

  /**
   * Create an auction for a specific asset.
   *
   * @param {string}   asset_id       ID of the asset to put up for auction.
   * @param {string[]} starting_bid   Minimum starting bid for the auction.
   * @param {string[]} duration       Duration in seconds the asset will be up for auction.
   * @return {Response}               Returns an object indicating the success of the transaction and transaction ID.
   */

  createAuction = async ({
    asset_id,
    starting_bid,
    duration,
  }: {
    asset_id: string;
    starting_bid: string;
    duration: string;
  }): Promise<Response> => {
    try {
      if (!this.session) {
        throw new Error('Unable to create an auction without logging in.');
      }

      const seller = this.session.auth.actor;
      const actions = [
        {
          account: 'atomicmarket',
          name: 'announceauct',
          authorization: [
            {
              actor: seller,
              permission: 'active',
            },
          ],
          data: {
            seller,
            asset_ids: [asset_id],
            starting_bid,
            duration,
            maker_marketplace: 'fees.market',
          },
        },
        {
          account: 'atomicassets',
          name: 'transfer',
          authorization: [
            {
              actor: seller,
              permission: 'active',
            },
          ],
          data: {
            from: seller,
            to: 'atomicmarket',
            asset_ids: [asset_id],
            memo: 'auction',
          },
        },
      ];

      const result = await this.session.transact(
        { actions },
        { broadcast: true }
      );

      await fees.refreshRamInfoForUser(seller);

      return {
        success: true,
        transactionId: result.processed.id,
      };
    } catch (e) {
      const message = e.message[0].toUpperCase() + e.message.slice(1);
      return {
        success: false,
        error:
          message || 'An error has occurred while trying to create an auction.',
      };
    }
  };

  /**
   * Make a bid on an auction for a specific asset.
   *
   * @param {string}   auction_id     ID of the auction to make a bid on.
   * @param {string[]} bid            Bid amount on the auction.
   * @return {Response}               Returns an object indicating the success of the transaction and transaction ID.
   */

  bidOnAuction = async ({
    auction_id,
    bid,
  }: {
    auction_id: string;
    bid: string;
  }): Promise<Response> => {
    try {
      if (!this.session) {
        throw new Error('Unable to bid on an auction without logging in.');
      }

      const bidder = this.session.auth.actor;
      const currentBalance = await proton.getAtomicMarketBalance(bidder);
      const [bidAmount, bidToken] = bid.split(' ');
      const [balanceAmount, balanceToken] = currentBalance.split(' ');
      const balanceMinusBid = parseFloat(bidAmount) - parseFloat(balanceAmount);

      const actions = [
        balanceMinusBid > 0
          ? {
              account: 'xtokens',
              name: 'transfer',
              authorization: [
                {
                  actor: bidder,
                  permission: 'active',
                },
              ],
              data: {
                from: bidder,
                to: 'atomicmarket',
                quantity:
                  bidToken === balanceToken
                    ? `${balanceMinusBid.toFixed(TOKEN_PRECISION)} ${bidToken}`
                    : bid,
                memo: 'deposit',
              },
            }
          : undefined,
        {
          account: 'atomicmarket',
          name: 'auctionbid',
          authorization: [
            {
              actor: bidder,
              permission: 'active',
            },
          ],
          data: {
            bidder,
            auction_id,
            bid,
            taker_marketplace: 'fees.market',
          },
        },
      ].filter((action) => action !== undefined);

      const result = await this.session.transact(
        { actions },
        { broadcast: true }
      );

      await fees.refreshRamInfoForUser(bidder);

      return {
        success: true,
        transactionId: result.processed.id,
      };
    } catch (e) {
      const message = e.message[0].toUpperCase() + e.message.slice(1);
      return {
        success: false,
        error:
          message || 'An error has occurred while trying to bid on an auction.',
      };
    }
  };

  /**
   * Claim the tokens received in an auction as the seller (can only be done
   * after the auction duration times out).
   *
   * @param {string}   auction_id     ID of the auction to confirm.
   * @return {Response}               Returns an object indicating the success of the transaction and transaction ID.
   */

  claimAuctionSell = async ({
    auction_id,
  }: {
    auction_id: string;
  }): Promise<Response> => {
    try {
      if (!this.session) {
        throw new Error('Unable to claim an auction without logging in.');
      }

      const seller = this.session.auth.actor;
      const actions = [
        {
          account: 'atomicmarket',
          name: 'auctclaimsel',
          authorization: [
            {
              actor: seller,
              permission: 'active',
            },
          ],
          data: {
            auction_id,
          },
        },
      ];

      const result = await this.session.transact(
        { actions },
        { broadcast: true }
      );

      await fees.refreshRamInfoForUser(seller);

      return {
        success: true,
        transactionId: result.processed.id,
      };
    } catch (e) {
      const message = e.message[0].toUpperCase() + e.message.slice(1);
      return {
        success: false,
        error:
          message || 'An error has occurred while trying to claim an auction.',
      };
    }
  };

  /**
   * Claim the asset won in an auction as the buyer (can only be done after the
   * auction duration times out).
   *
   * @param {string}   auction_id     ID of the auction to confirm.
   * @return {Response}               Returns an object indicating the success
   * of the transaction and transaction ID.
   */

  claimAuctionBuy = async ({
    auction_id,
  }: {
    auction_id: string;
  }): Promise<Response> => {
    try {
      if (!this.session) {
        throw new Error('Unable to claim an auction without logging in.');
      }

      const buyer = this.session.auth.actor;
      const actions = [
        {
          account: 'atomicmarket',
          name: 'auctclaimbuy',
          authorization: [
            {
              actor: buyer,
              permission: 'active',
            },
          ],
          data: {
            auction_id,
          },
        },
      ];

      const result = await this.session.transact(
        { actions },
        { broadcast: true }
      );

      await fees.refreshRamInfoForUser(buyer);

      return {
        success: true,
        transactionId: result.processed.id,
      };
    } catch (e) {
      const message = e.message[0].toUpperCase() + e.message.slice(1);
      return {
        success: false,
        error:
          message || 'An error has occurred while trying to claim an auction.',
      };
    }
  };

  /**
   * Cancel a specific auction.
   *
   * @param {string}   auction_id     ID of the auction to cancel.
   * @return {Response}               Returns an object indicating the success of the transaction and transaction ID.
   */

  cancelAuction = async ({
    auction_id,
  }: {
    auction_id: string;
  }): Promise<Response> => {
    try {
      if (!this.session) {
        throw new Error('Unable to cancel an auction without logging in.');
      }

      const seller = this.session.auth.actor;
      const actions = [
        {
          account: 'atomicmarket',
          name: 'cancelauct',
          authorization: [
            {
              actor: seller,
              permission: 'active',
            },
          ],
          data: {
            auction_id,
          },
        },
      ];

      const result = await this.session.transact(
        { actions },
        { broadcast: true }
      );

      await fees.refreshRamInfoForUser(seller);

      return {
        success: true,
        transactionId: result.processed.id,
      };
    } catch (e) {
      const message = e.message[0].toUpperCase() + e.message.slice(1);
      return {
        success: false,
        error:
          message || 'An error has occurred while trying to cancel an auction.',
      };
    }
  };
}

export default new ProtonSDK();
