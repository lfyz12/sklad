import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";
import AgentStore from "./store/AgentStore";
import DocumentStore from "./store/DocumentStore";


const root = ReactDOM.createRoot(document.getElementById('root'));

export const Context = createContext()


root.render(
  <Context.Provider value={{
    userStore: new UserStore(),
    productStore: new ProductStore(),
    agentStore: new AgentStore(),
    documentStore: new DocumentStore()
  }}>
    <App />
  </Context.Provider>
);


