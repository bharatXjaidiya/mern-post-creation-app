import { Children, createContext, useState } from "react";

const [username, setUsername] = useState("");
const [email , setEmail] = useState("");
const [password, setPassword] = useState("");

const authContext = createContext();


