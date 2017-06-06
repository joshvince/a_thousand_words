# AThousandWords

This app has two parts: a Phoenix app and a React app.

The React app lives in `priv/a_thousand_words`, it uses `create-react-app`.

You can start its own development server by running `cd priv/a_thousand_words/ && npm start` and look at `localhost:3000`.

The phoenix server looks in `priv/a_thousand_words/build` for the static assets, which are only updated
when you run `cd priv/a_thousand_words/ && npm run build`. Use the React development server when developing UI.

To run the Phoenix server, run `mix phx.server`. It will be on `localhost:4000`. *Remember: the Phoenix app only looks in `priv/a_thousand_words/build` so will not update when you save changes to JS files.*

For all intents and purposes, these are two completely separate apps. 
