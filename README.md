# AThousandWords

This app has two parts: a Phoenix app and a React app.

The React app lives in `priv/a_thousand_words`, it uses `create-react-app`.

You can start its own development server by running `cd priv/a_thousand_words/ && npm start` and look at `localhost:3000`.

The phoenix server looks in `priv/a_thousand_words/build` for the static assets, which are only updated
when you run `cd priv/a_thousand_words/ && npm run build`. Use the React development server when developing UI.

To run the Phoenix server, run `mix phx.server`. It will be on `localhost:4000`. *Remember: the Phoenix app only looks in `priv/a_thousand_words/build` so will not update when you save changes to JS files.*

For all intents and purposes, these are two completely separate apps. 

Some of the resources I used when setting this up:  

_Making react and phoenix talk via websockets_  
https://www.viget.com/articles/phoenix-and-react-a-killer-combo  
http://www.east5th.co/blog/2017/04/03/using-create-react-app-with-phoenix/
