# A Thousand Words

A Thousand Words lets you geotag old photos and view them on a map through space as well as time.

## Pre-Installation

This app has two parts: a Phoenix app for backend and a React app for frontend.  

### To get the Phoenix app installed:  

You'll need to install [Elixir 1.4](https://elixir-lang.org/install.html) and Erlang if you don't already have it.  
  
Next, you should install [Hex](https://hex.pm/) the package manager for Elixir by running `mix local.hex`  

Now you can install [Phoenix 1.3](http://www.phoenixframework.org/) by running `mix archive.install https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez`  

You also need to install [Postgres](https://wiki.postgresql.org/wiki/Detailed_installation_guides) which is the DB being used by Phoenix.  

### To get the React app installed:  

You'll need to install [node v6.11.* and npm v3.10.*](https://nodejs.org/en/download/)  

## Fetching dependencies  
### Repo
- Clone the repo
- `cd` into it  

### Phoenix App
- Fetch Phoenix dependencies with `mix deps.get`  
- Start postgres in your chosen manner  
- Start the Ecto Repository with `mix ecto.create`
- Run all migrations with `mix ecto.migrate`
- Insert seed data to your dev db with `mix run priv/repo/seeds.exs`
- Run tests with `mix test`  

### React App  
- Change to the React App root directory `cd priv/a_thousand_words`
- Fetch the React Dependencies with `npm install`

If that all worked, congratulations! You have a working Phoenix backend and React frontend.  

## Spinning up the servers  

The backend and frontend apps are separate beasts, and they communicate primarily using Websockets. 
The phoenix app eventually serves the react app as a bundle in production, but for development **you need to start two separate dev servers.**   

### Phoenix server

 It is not expected that you use the phoenix dev server to interact with the UI, only to dev against the JSON api. Because of the configuration, Phoenix will live reload code in Elixir files _but will not live reload the javascript code in the react app._ I am providing a react frontend but theoretically you could use any other method to interact with this Phoenix API.

 To start the Phoenix server, run `mix phx.server`.  
 It will be on port `4000`.


### React server

The React app lives in `priv/a_thousand_words`, it uses [create-react-app](https://github.com/facebookincubator/create-react-app) which, among other things, provides a dev server.

You can start this development server by running  
`cd priv/a_thousand_words/ && npm start`.  
By default it runs on port `3000`.

The phoenix server looks in `priv/a_thousand_words/build` for the static assets, which are only updated
when you run a special script in the React app.

### To create a build of the react app that Phoenix can deploy
run `cd priv/a_thousand_words/ && npm run build`.  
This creates a bundle that is written to `priv/a_thousand_words/build`.  
Phoenix is configured to look in this directory and deploy the JS from there only, which makes it difficult to actually develop using the phoenix dev server (as you would be continually building the production bundle each time you made a change.)  

Use the React development server when developing UI.  

 Only run `npm build` if you're deploying.

 **Remember: the Phoenix app only looks in `priv/a_thousand_words/build` so while it is possible to use the phoenix dev server on port 4000 to view the UI, it will not update when you save changes to JS files. The react app is live reloaded on port 3000.**  

 # Resources used  
### Making react and phoenix talk via websockets  
I'd never got a react/phoenix app talking to each other. These articles were useful:  
https://www.viget.com/articles/phoenix-and-react-a-killer-combo  
http://www.east5th.co/blog/2017/04/03/using-create-react-app-with-phoenix/
