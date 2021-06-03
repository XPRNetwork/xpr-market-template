import {
  FC,
  useEffect,
  useState,
  MouseEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  useAuthContext,
  useModalContext,
  CreateSaleModalProps,
} from '../Provider';
import { InputField } from '../InputField/InputField';
import {
  Background,
  ModalBox,
  Section,
  CloseIconContainer,
  Title,
  Description,
  HalfButton,
  FeeLabel,
} from './Modal.styled';
import { ReactComponent as CloseIcon } from '../../public/close.svg';
import {
  TOKEN_SYMBOL,
  TOKEN_PRECISION,
  RAM_AMOUNTS,
} from '../../utils/constants';
import ProtonSDK from '../../services/proton';
import { useWindowSize } from '../../hooks';
import fees, { ListingFee } from '../../services/fees';

type Props = {
  title: string;
  description: string;
  buttonText: string;
  amount: string;
  numSales: number;
  listingFee: ListingFee;
  onButtonClick: () => Promise<void>;
  setAmount: Dispatch<SetStateAction<string>>;
  setListingFee: Dispatch<SetStateAction<ListingFee>>;
};

const SaleModal: FC<Props> = ({
  title,
  description,
  buttonText,
  amount,
  numSales,
  listingFee = {
    display: '0.00',
    raw: null,
  },
  setAmount,
  onButtonClick,
  setListingFee,
}) => {
  const { closeModal } = useModalContext();
  const { currentUser } = useAuthContext();
  const { isMobile } = useWindowSize();
  const isInvalid =
    !amount ||
    isNaN(parseFloat(amount)) ||
    parseFloat(amount) === 0 ||
    parseFloat(amount) > 1000000000;

  useEffect(() => {
    const fee = fees.calculateFee({
      numAssets: numSales,
      actor: currentUser ? currentUser.actor : '',
      ramCost: RAM_AMOUNTS.LIST_SALE,
    });
    setListingFee(fee);
  }, [numSales, currentUser]);

  const handleBackgroundClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const getFee = () => (
    <FeeLabel>
      <span>Listing Fee</span>
      <span>≈ {listingFee.display} XUSDC</span>
    </FeeLabel>
  );

  return (
    <Background onClick={handleBackgroundClick}>
      <ModalBox>
        <Section>
          <Title>{title}</Title>
          <CloseIconContainer role="button" onClick={closeModal}>
            <CloseIcon />
          </CloseIconContainer>
        </Section>
        <Description>{description}</Description>
        <InputField
          inputType="number"
          min={0}
          max={1000000000}
          step={1 / 10 ** TOKEN_PRECISION}
          value={amount}
          setValue={setAmount}
          submit={isInvalid ? null : onButtonClick}
          placeholder={`Enter amount in ${TOKEN_SYMBOL}`}
          onBlur={() => {
            const numberAmount = parseFloat(amount).toFixed(TOKEN_PRECISION);
            setAmount(numberAmount);
          }}
          checkIfIsValid={(input) => {
            const floatAmount = parseFloat(input as string);
            const isValid = floatAmount > 0 && floatAmount <= 1000000000;
            const errorMessage = `Sales price must be between 0 ${TOKEN_SYMBOL} and 1,000,000,000 ${TOKEN_SYMBOL}.`;
            return {
              isValid,
              errorMessage,
            };
          }}
        />
        {getFee()}
        <HalfButton
          disabled={isInvalid}
          fullWidth={isMobile}
          margin="24px 0 0"
          onClick={onButtonClick}>
          {buttonText}
        </HalfButton>
      </ModalBox>
    </Background>
  );
};

export const CreateSaleModal: FC = () => {
  const { currentUser } = useAuthContext();
  const { closeModal, modalProps } = useModalContext();
  const { assetId, reloadPage } = modalProps as CreateSaleModalProps;
  const [amount, setAmount] = useState<string>('');
  const [listingFee, setListingFee] = useState<ListingFee>({
    display: '0.00',
    raw: null,
  });

  const createOneSale = async () => {
    try {
      const formattedAmount = parseFloat(amount).toFixed(TOKEN_PRECISION);
      await fees.refreshRamInfoForUser(currentUser.actor);
      const finalFee = fees.calculateFee({
        numAssets: 1,
        actor: currentUser ? currentUser.actor : '',
        ramCost: RAM_AMOUNTS.LIST_SALE,
      });
      const res = await ProtonSDK.createSale({
        seller: currentUser ? currentUser.actor : '',
        asset_id: assetId,
        price: `${formattedAmount} ${TOKEN_SYMBOL}`,
        currency: `${TOKEN_PRECISION},${TOKEN_SYMBOL}`,
        listing_fee: finalFee.raw,
      });

      if (res.success) {
        closeModal();
        reloadPage();
      }
    } catch (err) {
      console.warn(err.message);
    }
  };

  return (
    <SaleModal
      numSales={1}
      title="Listing Price"
      description="Enter the amount you want to sell your NFT for."
      buttonText="Mark for sale"
      amount={amount}
      listingFee={listingFee}
      setAmount={setAmount}
      setListingFee={setListingFee}
      onButtonClick={createOneSale}
    />
  );
};
