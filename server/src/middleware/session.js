import Session from "express-session";

export const session = Session({
	secret: "a very secret secret",
	resave: false,
	saveUninitialized: true,
})