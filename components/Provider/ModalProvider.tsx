import {
  useMemo,
  useState,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { useScrollLock } from '../../hooks';

export const MODAL_TYPES = {
  HIDDEN: 'HIDDEN',
  CREATE_SALE: 'CREATE_SALE',
};

type Props = {
  children: ReactNode;
};

export interface CreateSaleModalProps {
  reloadPage: () => void;
  assetId: string;
}

type ModalProps = CreateSaleModalProps;

type ModalContextValue = {
  modalType: string;
  modalProps: ModalProps;
  openModal: (type: string) => void;
  closeModal: () => void;
  setModalProps: Dispatch<SetStateAction<ModalProps>>;
};

const ModalContext = createContext<ModalContextValue>({
  modalType: MODAL_TYPES.HIDDEN,
  modalProps: undefined,
  openModal: undefined,
  closeModal: undefined,
  setModalProps: () => {},
});

export const useModalContext = (): ModalContextValue => {
  const context = useContext(ModalContext);
  return context;
};

export const ModalProvider = ({ children }: Props): JSX.Element => {
  const [modalType, setModalType] = useState<string>(MODAL_TYPES.HIDDEN);
  const [modalProps, setModalProps] = useState<ModalProps>(undefined);
  const openModal = (type: string) => setModalType(type);
  const closeModal = () => setModalType(MODAL_TYPES.HIDDEN);
  useScrollLock(modalType !== MODAL_TYPES.HIDDEN);

  const value = useMemo<ModalContextValue>(
    () => ({
      modalType,
      modalProps,
      openModal,
      closeModal,
      setModalProps,
    }),
    [modalType, modalProps]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
