# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :a_thousand_words,
  ecto_repos: [AThousandWords.Repo]

# Configure the repo
config :a_thousand_words, AThousandWords.Repo,
  types: AThousandWords.PostgrexTypes

# Configures the endpoint
config :a_thousand_words, AThousandWords.Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "xdrlw9ax7QdUzrRyNtSzmQwilTQ7rHeEhaL37QnuiuejKuGRGnzukVhkpzfKkXBJ",
  render_errors: [view: AThousandWords.Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: AThousandWords.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Configure ExAws to look in system variables for your AWS credentials
config :ex_aws,
  access_key_id: [{:system, "AWS_ACCESS_KEY_ID"}, {:awscli, "default", 30}, :instance_role],
  secret_access_key: [{:system, "AWS_SECRET_ACCESS_KEY"}, {:awscli, "default", 30}, :instance_role],
  s3: [ 
    scheme: "https://", 
    host: "a-thousand-words.s3.amazonaws.com", 
    region: "eu-west-1" 
  ]

config :arc,
  storage: Arc.Storage.S3, # or Arc.Storage.Local
  bucket: "a-thousand-words" # if using Amazon S3

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
