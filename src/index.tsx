import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ChakraProvider} from "@chakra-ui/react"
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
            <ChakraProvider>
                <App/>
            </ChakraProvider>
            </DndProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

