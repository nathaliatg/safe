import { createContext, useContext, useState, useCallback } from 'react';

const GroceryContext = createContext(null);

export function GroceryProvider({ children }) {
  const [lists, setLists] = useState({});

  const initList = useCallback((recipeId, ingredients) => {
    setLists(prev => {
      if (prev[recipeId]) return prev;
      const items = {};
      ingredients.forEach(ing => {
        items[ing.id] = { ...ing, checked: false, haveIt: false };
      });
      return { ...prev, [recipeId]: items };
    });
  }, []);

  const toggleChecked = useCallback((recipeId, itemId) => {
    setLists(prev => ({
      ...prev,
      [recipeId]: {
        ...prev[recipeId],
        [itemId]: {
          ...prev[recipeId][itemId],
          checked: !prev[recipeId][itemId].checked,
        },
      },
    }));
  }, []);

  const toggleHaveIt = useCallback((recipeId, itemId) => {
    setLists(prev => ({
      ...prev,
      [recipeId]: {
        ...prev[recipeId],
        [itemId]: {
          ...prev[recipeId][itemId],
          haveIt: !prev[recipeId][itemId].haveIt,
          checked: !prev[recipeId][itemId].haveIt ? false : prev[recipeId][itemId].checked,
        },
      },
    }));
  }, []);

  const resetList = useCallback((recipeId) => {
    setLists(prev => {
      const updated = { ...prev[recipeId] };
      Object.keys(updated).forEach(id => {
        updated[id] = { ...updated[id], checked: false, haveIt: false };
      });
      return { ...prev, [recipeId]: updated };
    });
  }, []);

  return (
    <GroceryContext.Provider value={{ lists, initList, toggleChecked, toggleHaveIt, resetList }}>
      {children}
    </GroceryContext.Provider>
  );
}

export function useGrocery() {
  return useContext(GroceryContext);
}
