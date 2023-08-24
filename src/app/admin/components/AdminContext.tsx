'use client';

import { apiFetch } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';
import { Budget, Expense, User } from '@/lib/types';
import { useSession } from 'next-auth/react';
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

type AdminContext = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  showUserModal: boolean;
  setShowUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  userExpenses: Expense[] | undefined;
  setUserExpenses: React.Dispatch<React.SetStateAction<Expense[] | undefined>>;
  selectedExpense: Expense | undefined;
  setSelectedExpense: React.Dispatch<React.SetStateAction<Expense | undefined>>;
  userBudget: Budget | undefined;
  setUserBudget: React.Dispatch<React.SetStateAction<Budget | undefined>>;
};

const AdminContext = createContext<AdminContext>({
  user: undefined,
  setUser: (value) => null,
  userExpenses: undefined,
  setUserExpenses: (value) => null,
  selectedExpense: undefined,
  setSelectedExpense: (value) => null,
  showUserModal: false,
  setShowUserModal: (value) => null,
  userBudget: undefined,
  setUserBudget: (value) => null,
});

interface Props {
  children: React.ReactNode;
}
export const AdminContextProvider: React.FC<Props> = ({ children }) => {
  const session = useSession();
  const token = (session as any).data.id_token;
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userExpenses, setUserExpenses] = useState<Expense[] | undefined>();
  const [selectedExpense, setSelectedExpense] = useState<Expense | undefined>();
  const [userBudget, setUserBudget] = useState<Budget | undefined>();
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    if (user) {
      apiFetch(token, `${apiUrl}/adm/expenses?userId=${user.userId}`)
        .then((res) => res.json())
        .then(setUserExpenses)
        .catch(console.error);
      apiFetch(token, `${apiUrl}/budgets?userId=${user.userId}`)
        .then((res) => res.json())
        .then(setUserBudget)
        .catch(console.error);
    }
  }, [user, token]);

  return (
    <AdminContext.Provider
      value={{
        user,
        setUser,
        userExpenses,
        setUserExpenses,
        selectedExpense,
        setSelectedExpense,
        showUserModal,
        setShowUserModal,
        userBudget,
        setUserBudget,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
