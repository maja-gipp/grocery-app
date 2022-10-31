import { GroceryList } from "./GroceryList";

import { groceriesApi } from "services/groceriesApi";

import { Counter } from "components/Counter";

import { selectActiveTab, selectTabs, useAppSelector } from "state/selectors";
import { useActivateTab } from "state/hooks";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Shops } from "./Shops";

export const App = () => {
  groceriesApi.useGetGroceryListsQuery();

  const tabs = useAppSelector(selectTabs);
  const activeTab = useAppSelector(selectActiveTab);

  const activateTab = useActivateTab();

  const [create] = groceriesApi.useCreateGroceryListMutation()

  const handleCreateList = () => {
    const name = prompt("What's the name of list you want to create?");

    if (name === null) {
      alert("We cannot do a list with empty title!");
      return;
    }
    create({ title: name })
  }

  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/grocery">Grocery</NavLink></li>
          <li><NavLink to="/shops">Shops</NavLink></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Counter />} />
        <Route
          path="/grocery"
          element={
            <>
              {tabs?.map((tab) => {
                return (
                  <button
                    key={tab.id}
                    onClick={() => activateTab(tab.id)}
                    disabled={activeTab?.id === tab.id}
                  >
                    {tab.title}
                  </button>
                );
              })}
              {activeTab === undefined ? null : (
                <GroceryList key={activeTab.id} />
              )}
              <button onClick={handleCreateList}>Create list</button>
            </>
          }
        />
        <Route path="/shops" element={<Shops />} />
      </Routes>
    </BrowserRouter>
  );
};
