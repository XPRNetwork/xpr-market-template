import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import ProtonSDK, { User } from '../../services/proton';
import proton from '../../services/proton-rpc';
import { usePrevious } from '../../hooks';

interface AuthContext {
  currentUser: User;
  currentUserBalance: string;
  atomicMarketBalance: string;
  authError: string;
  isLoadingUser: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updateCurrentUserBalance: (chainAccount: string) => Promise<void>;
  updateAtomicBalance: (chainAccount: string) => Promise<void>;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const AuthContext = createContext<AuthContext>({
  currentUser: undefined,
  currentUserBalance: '',
  atomicMarketBalance: '',
  authError: '',
  isLoadingUser: true,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  updateCurrentUserBalance: () => Promise.resolve(),
  updateAtomicBalance: () => Promise.resolve(),
});

export const useAuthContext = (): AuthContext => {
  const context = useContext(AuthContext);
  return context;
};

export const AuthProvider = ({ children }: Props): JSX.Element => {
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User>(undefined);
  const [currentUserBalance, setCurrentUserBalance] = useState<string>('');
  const [atomicMarketBalance, setAtomicMarketBalance] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const prevError = usePrevious(authError);

  useEffect(() => {
    if (prevError) {
      setAuthError('');
    }
  }, [prevError]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !currentUser) {
      const cachedUser = localStorage.getItem('proton-storage-user-auth');

      if (cachedUser) {
        const { actor, permission } = JSON.parse(cachedUser);
        setCurrentUser({
          actor,
          permission,
          name: '',
          avatar: '/default-avatar.png',
          isLightKYCVerified: false,
        });
      }

      const restore = async () => {
        const { user, error } = await ProtonSDK.restoreSession();
        setIsLoadingUser(false);

        if (error || !user) {
          const errorMessage = error
            ? `Error: ${error}`
            : 'Error: No user was found';
          setAuthError(errorMessage);
          return;
        }

        await updateCurrentUserBalance(user.actor);
        await updateAtomicBalance(user.actor);
        setCurrentUser(user);
      };

      restore();
    }
  }, []);

  const updateCurrentUserBalance = async (chainAccount: string) => {
    const balance = await proton.getAccountBalance(chainAccount);
    setCurrentUserBalance(balance);
  };

  const updateAtomicBalance = async (chainAccount: string) => {
    const balance = await proton.getAtomicMarketBalance(chainAccount);
    setAtomicMarketBalance(balance);
  };

  const login = async (): Promise<void> => {
    const { user, error } = await ProtonSDK.login();
    if (error || !user) {
      const errorMessage = error
        ? `Error: ${error}`
        : 'Error: No user was found';
      setAuthError(errorMessage);
      return;
    }

    await updateCurrentUserBalance(user.actor);
    await updateAtomicBalance(user.actor);
    setCurrentUser(user);
  };

  const logout = async () => {
    await ProtonSDK.logout();
    setCurrentUser(undefined);
  };

  const value = useMemo<AuthContext>(
    () => ({
      currentUser,
      currentUserBalance,
      atomicMarketBalance,
      authError,
      isLoadingUser,
      login,
      logout,
      updateCurrentUserBalance,
      updateAtomicBalance,
    }),
    [
      currentUser,
      authError,
      currentUserBalance,
      atomicMarketBalance,
      isLoadingUser,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
